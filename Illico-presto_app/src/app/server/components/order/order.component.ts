import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Order} from "../../../models/Order.model";
import {Product} from "../../../models/Product.model";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{
  orders$!: Observable<Order[]>;
  products!: Product[];
  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    const headers = new HttpHeaders().set('Accept', 'application/ld+json');

    return this.http.get<any>('http://127.0.0.1:8000/api/orders', { headers }).pipe(
      map((response: any) => {
        return response['hydra:member'] || [];
      })
    );
  }
  getProductsOrdered(orders$: Observable<Order[]>): void {
    orders$.subscribe((orders: Order[]) => {
      this.products = [];
      orders.forEach((order: Order) => {
        order.products.forEach((product: Product) => {
          this.products.push(product);
        });
      });
    });
  }
  ngOnInit(): void {
    this.orders$ = this.getAllOrders();
    this.getProductsOrdered(this.orders$);
  }

}
