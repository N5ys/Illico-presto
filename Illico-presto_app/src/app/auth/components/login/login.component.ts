import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/User.model";
import {take} from "rxjs";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  currentUser!: User;


  constructor(private authService: AuthService, private router: Router, private fb : FormBuilder) {}



  protected readonly onsubmit = onsubmit;


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.login(email, password).pipe(take(1)).subscribe(
        (response) => {
          this.router.navigate(['']);
          console.log('loggedin');
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
    }
  }
}
