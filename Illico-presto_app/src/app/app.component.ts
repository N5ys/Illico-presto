import { Component, OnInit } from '@angular/core';
import {AuthService} from "./core/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

constructor(authService : AuthService) {
  const token = authService.getToken();
  if (token){
    authService.setToken(token);
    authService.setCurrentUser();
  }
}


  ngOnInit(): void {

  }


}
