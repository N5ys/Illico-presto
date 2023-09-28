import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../../../models/Order.model";
import {Product} from "../../../models/Product.model";
import {OrdersService} from "../../../services/orders.service";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{
  orders$!: Observable<Order[]>;
  products!: Product[];
  constructor(private http: HttpClient, private ordersService : OrdersService) {}


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
    this.orders$ = this.ordersService.getAllOrders();

    this.getProductsOrdered(this.orders$);
  }

}
