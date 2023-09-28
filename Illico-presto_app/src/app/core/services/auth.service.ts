import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {map} from "rxjs/operators";
import {User} from "../../models/User.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://127.0.0.1:8000';
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<any>(null);

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
    sessionStorage.removeItem('current_user');
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
  getUserById(userId: number): Observable<User> {
    // Définissez les en-têtes de la requête avec le token JWT
    const headers = this.getHeaders();

    // Effectuez la requête GET pour récupérer l'utilisateur par son ID
    return this.http.get<User>(`${this.baseUrl}/api/users/${userId}`, { headers });
  }
  setCurrentUser(userId: number) {
    const headers : HttpHeaders = new HttpHeaders({
      'accept' : 'application/ld+json'
    })
    return this.http.get<User>(`${this.baseUrl}/api/users/${userId}`, {headers}).pipe(
      map((userData:any) => {
        const user = new User();
        user.id = userData.id;
        user.email = userData.email;
        user.roles = userData.roles;
        user.lastName = userData.lastName;
        user.firstName = userData.firstName;
        user.phoneNumber = userData.phoneNumber;

        // Assurez-vous d'ajouter d'autres propriétés si nécessaire
        sessionStorage.setItem('current_user', JSON.stringify(user));
        this.currentUserSubject.next(user);

        return user;
      })
    ).subscribe();
  }

  getCurrentUser(): User | null {
    const userString = sessionStorage.getItem('current_user');
    console.log("dans la methode : " + userString)
    if (userString) {
      const user = JSON.parse(userString);
      console.log("apres le json.pars" + user)
      this.currentUserSubject.next(user);
      console.log("la valeur" + this.currentUserSubject.value)
    }
    return this.currentUserSubject.value
  }



}
