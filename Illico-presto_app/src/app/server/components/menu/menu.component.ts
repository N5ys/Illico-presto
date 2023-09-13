import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {Category} from "../../../models/Category.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../../../models/Product.model";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{

  categories$!: Observable<Category[]>;
  products$!: Observable<Product[]>;
  constructor(private http: HttpClient) {}
  getAllCategories(): Observable<Category[]> {
    const headers = new HttpHeaders().set('Accept', 'application/ld+json');

    return this.http.get<any>('http://127.0.0.1:8000/api/categories', { headers }).pipe(
      map((response: any) => {
        return response['hydra:member'] || [];
      })
    );

  }

  getAllProducts(): Observable<Product[]> {
    const headers = new HttpHeaders().set('Accept', 'application/ld+json');

    return this.http.get<any>('http://127.0.0.1:8000/api/products', { headers }).pipe(
      map((response: any) => {
        return response['hydra:member'] || [];
      })
    );
  }



  ngOnInit(): void {
    this.categories$ = this.getAllCategories();
    this.products$ = this.getAllProducts();

  }


}
