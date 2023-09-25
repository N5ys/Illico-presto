import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User.model";
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  currentUser! : User | null;
  isLoggedIn$! : Observable<boolean>;


  constructor(private authService: AuthService, private http : HttpClient) {
  }
  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);
  }

  onLogOut() {
    this.authService.logout();

  }

}
