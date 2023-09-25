// guest.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "../core/services/auth.service";


@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      return true; // L'utilisateur est un invité (non connecté)
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
