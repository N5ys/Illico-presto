import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {map} from "rxjs/operators";
import {User} from "../../models/User.model";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://127.0.0.1:8000';
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}


  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post(`${this.baseUrl}/auth`, credentials).pipe(
      map((response: any) => {
        if (response && response.token) {
          const token = response.token;
          this.setToken(token);
        }
        return response;
      })
    );
  }


  logout(): void {
    // Supprimez le token JWT du stockage local.
    localStorage.removeItem('jwt_token');
    this.loggedInSubject.next(false);
  }



  isLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem('jwt_token');
    return this.loggedInSubject.asObservable();
  }

  getCurrentUser(): Observable<User | null>{
    return this.currentUserSubject.asObservable()
  }

  setToken(token: string): void {
    localStorage.setItem('jwt_token', token);
    this.setCurrentUser();
    this.loggedInSubject.next(true);

    this.loggedInSubject.subscribe((object)=>{
      console.log(`object in setToken : ${object}`)
    })
  }


  getToken(): string | null {

    return localStorage.getItem('jwt_token');
  }


  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }
  registerUser(userData : any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.baseUrl}/api/users`, userData, {headers})
  }

  decodeToken(token: string | null): any {
    return jwtDecode(<string>token);
  }

  getUsernameFromToken(token: string | null): string {
    const decodedToken = this.decodeToken(token);
    return decodedToken.username;
  }


  setCurrentUser(){
    const headers = this.getHeaders();
    const token = this.getToken();
    const username = this.getUsernameFromToken(token);
    this.http.get<User>(`${this.baseUrl}/api/users?email=${username}`, {headers}).subscribe((user)=>{
      this.currentUserSubject.next(user);
      }

    );
  }
}
