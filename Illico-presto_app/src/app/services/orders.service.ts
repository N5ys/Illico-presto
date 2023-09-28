import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {Order} from "../models/Order.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http : HttpClient) { }

  getAllOrders(): Observable<Order[]> {
    const headers = new HttpHeaders().set('Accept', 'application/ld+json');

    return this.http.get<any>('http://127.0.0.1:8000/api/orders', { headers }).pipe(
      map((response: any) => {
        return response['hydra:member'] || [];
      })
    );
  }

  createNewOrder(orderData: any): Observable<Order> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>('http://127.0.0.1:8000/api/orders', orderData, { headers });
  }



}
