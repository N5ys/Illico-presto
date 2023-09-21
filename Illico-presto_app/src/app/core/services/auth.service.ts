import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://127.0.0.1:8000';
  private loggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  // Méthode de connexion
  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post(`${this.baseUrl}/auth`, credentials);
  }

  // Méthode de déconnexion
  logout(): void {
    // Supprimez le token JWT du stockage local ou de session
    sessionStorage.removeItem('jwt_token');
    this.loggedInSubject.next(false);
  }

  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): Observable<boolean> {
    // Vérifie si le token JWT est présent dans le stockage local ou de session
    const token = sessionStorage.getItem('jwt_token');
    return this.loggedInSubject.asObservable();
  }

  // Stocke le token JWT
  setToken(token: string): void {
    // Stockez le token JWT dans le stockage local ou de session
    sessionStorage.setItem('jwt_token', token);
    this.loggedInSubject.next(true);
  }

  // Récupère le token JWT
  getToken(): string | null {
    // Récupérez le token JWT du stockage local ou de session
    return sessionStorage.getItem('jwt_token');
  }

  // Incluez le token JWT dans les en-têtes de demande
  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }
}
