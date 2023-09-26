import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import {Observable} from "rxjs";
import {AuthService} from "../../core/services/auth.service"; // Assurez-vous d'importer votre service d'authentification ici

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Récupérez le token JWT actuel depuis votre service d'authentification
    const authToken = this.authService.getToken();

    // Ajoutez le token aux en-têtes de la requête si le token existe
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    return next.handle(request);
  }
}
