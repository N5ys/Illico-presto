import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "../core/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ServerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getCurrentUser();
    if (user && user.roles.includes("ROLE_SERVER")) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
