import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "../../Interceptor/tokenInterceptor.service";
import {MatSelectModule} from "@angular/material/select";
import {AdminModule} from "../admin/admin.module";



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    AdminModule

  ],

})
export class AuthModule { }
