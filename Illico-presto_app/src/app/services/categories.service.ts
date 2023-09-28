import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Category} from "../models/Category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    const headers = new HttpHeaders().set('Accept', 'application/ld+json');

    return this.http.get<any>('http://127.0.0.1:8000/api/categories', {headers}).pipe(
      map((response: any) => {
        return response['hydra:member'] || [];
      })
    );

  }

  updateCategory(categoryId: number, updatedCategory:any ): Observable<Category>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<any>(`http://127.0.0.1:8000/api/categories/${categoryId}`, updatedCategory, { headers })
  }


  deleteCategoryById(categoryId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete<any>(`http://127.0.0.1:8000/api/categories/${categoryId}`, { headers });
  }

  createNewCategory(categoryData: any): Observable<Category> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Category>('http://127.0.0.1:8000/api/categories', categoryData, { headers });
  }




}
