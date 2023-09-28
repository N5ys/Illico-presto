import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "../core/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getCurrentUser();
    console.log("l'user est " + user);
    console.log(user?.roles)
    if (user && user.roles.includes("ROLE_ADMIN")) {
      console.log(user.roles)
      return true; // L'utilisateur a le rôle "admin"
    } else {
      this.router.navigate(['/']); // Redirige l'utilisateur vers la page d'accueil si le rôle n'est pas valide
      return false;
    }
  }
}
