import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {Table} from "../models/Table.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../models/Product.model";

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  constructor( private http : HttpClient) {}

  getAllTables(): Observable<Table[]> {
    const headers = new HttpHeaders().set('Accept', 'application/ld+json');

    return this.http.get<any>('http://127.0.0.1:8000/api/tables', { headers }).pipe(
      map((response: any) => {
        return response['hydra:member'] || [];
      })
    );
  }

  getTableById(id : number){
    const headers = new HttpHeaders().set('Accept', 'application/ld+json');
    console.log(id);
    return this.http.get<any>(`http://127.0.0.1:8000/api/tables/${id}`, { headers }).pipe(
      map((response: any) => {
        console.log(response);
        return response['hydra:member'];
      })
    );
  }

  updateTable(tableId : number,updatedTable : any ): Observable<Table>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<any>(`http://127.0.0.1:8000/api/tables/${tableId}`, updatedTable, {
      headers,
    })
  }

  createTable(table : any): Observable<Table> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>('http://127.0.0.1:8000/api/tables', table, { headers })
  }


  deleteTableById(tableId : number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete<any>(`http://127.0.0.1:8000/api/tables/${tableId}`, { headers });
  }

}
