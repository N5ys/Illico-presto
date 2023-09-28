import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {AppParameter} from "../models/AppParameter.model";

@Injectable({
  providedIn: 'root'
})
export class DelayService {

  constructor(private http : HttpClient) { }

  getInterDishDelay(): Observable<AppParameter[]> {
    const headers: HttpHeaders = new HttpHeaders({
      accept: 'application/ld+json',
    });
    return this.http.get<any>('http://127.0.0.1:8000/api/app_parameters', {
      headers,
    }).pipe(
      map((response: any) => {
        return response['hydra:member'] || [];
      })
    );
  }

  updateDelay(id : number, updatedDelay : any): Observable<AppParameter>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/ld+json',
      'accept': 'application/json',
    });
    return this.http.put<any>(`http://127.0.0.1:8000/api/app_parameters/${id}`,updatedDelay,{ headers })
  }


}
