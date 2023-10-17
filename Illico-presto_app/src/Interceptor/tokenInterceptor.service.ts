import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest, HttpErrorResponse,
} from '@angular/common/http';

import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "../app/core/services/auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const authToken = this.authService.getToken();


    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error : any): Observable<never> => {
        if (error instanceof HttpErrorResponse && error.status === 401){
            this.authService.showSessionExpiredDialog();
            this.authService.logout();
          return throwError(error);
        }
        return throwError(error);
      })
    );
  }
}
