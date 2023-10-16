import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User.model";
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {map, switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  currentUser$!: Observable<User>;
  isLoggedIn$! : Observable<boolean>;



  constructor(private authService: AuthService, private router : Router) {
  }
  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.currentUser$ = this.authService.getCurrentUser();
    console.log(`isLogged = ${this.isLoggedIn$} current user `)
  }

  onLogOut() {
    this.authService.logout();
    this.router.navigateByUrl('/login');

  }

}
