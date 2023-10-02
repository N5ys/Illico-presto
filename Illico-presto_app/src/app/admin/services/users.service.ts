import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../../models/Product.model";
import {User} from "../../models/User.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl : string = 'http://127.0.0.1:8000';
  constructor(private http : HttpClient) {}

  getAllUsers(){
    const headers = new HttpHeaders({
      'accept': 'application/ld+json'
    });
    return this.http.get<any>(`${this.baseUrl}/api/users`, { headers }).pipe(
      map((response: any) => {
        return response['hydra:member'] || [];
      })
    );
  }


  updateUser(userId: number | null, userData: any) : Observable<Product>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<any>(`http://127.0.0.1:8000/api/users/${userId}`, userData, { headers })
  }

  getUserById(userId : number) : Observable<User>{
    const headers = new HttpHeaders({
      'accept' : 'application/ld+json'
    });

    return this.http.get<any>(`http://127.0.0.1:8000/api/users/${userId}`, { headers });
  }

}
