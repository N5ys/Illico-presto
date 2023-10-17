import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../core/services/auth.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getCurrentUser().pipe(
      map(user => {
        if (user) {
          console.log("L'utilisateur est " + user.email);

          if (user.roles && user.roles.includes("ROLE_ADMIN")) {
            console.log("L'utilisateur a le rôle ROLE_ADMIN");
            return true;
          } else {
            console.log("L'utilisateur n'a pas le rôle ROLE_ADMIN");
          }
        }

        // Redirigez vers une page d'accueil ou une autre page en cas d'échec.
        this.router.navigate(['/']);
        return false;
      })
    );
  }
}
