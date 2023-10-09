import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm! : FormGroup;
  roles: string[] = ['ROLE_ADMIN', 'ROLE_SERVER', 'ROLE_KITCHEN'];
  roleMappings: { label: string, value: string }[] = [
    { label: 'Admin', value: 'ROLE_ADMIN' },
    { label: 'Server', value: 'ROLE_SERVER' },
    { label: 'Kitchen', value: 'ROLE_KITCHEN' },

  ];


  constructor(private authService : AuthService, private fb : FormBuilder, private router: Router) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required]
    });
  }



  registerUser() {
    console.log("la methode register est appelé");
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      console.log("le form est valide");
      const userData = {
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        roles: [this.registerForm.get('role')?.value],
        lastName: this.registerForm.get('lastName')?.value,
        firstName: this.registerForm.get('firstName')?.value,

      };
       console.log(this.registerForm.value);

      // Vérification de la correspondance des mots de passe
      if (this.registerForm.get('password')?.value === this.registerForm.get('confirmPassword')?.value) {
        this.authService.registerUser(userData).subscribe(
          (response) => {
            this.router.navigateByUrl('/admin/users')
            console.log('Inscription réussie', response);

          },
          (error) => {
            console.error('Erreur lors de l\'inscription', error);
          }
        );
      } else {
        console.error('Les mots de passe ne correspondent pas.');
      }
    }
  }

}
