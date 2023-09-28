import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../models/Product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http : HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    const headers = new HttpHeaders().set('Accept', 'application/ld+json');

    return this.http.get<any>('http://127.0.0.1:8000/api/products', {headers}).pipe(
      map((response: any) => {
        return response['hydra:member'] || [];
      })
    );
  }

  updateProduct(productId : number, productData : any) : Observable<Product>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<any>(`http://127.0.0.1:8000/api/products/${productId}`, productData, { headers })
  }

  deleteProductById(productId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete<any>(`http://127.0.0.1:8000/api/products/${productId}`, { headers });
  }

  createNewProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Product>('http://127.0.0.1:8000/api/products', product, { headers });
  }

}


