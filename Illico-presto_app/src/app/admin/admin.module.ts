import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule, MatFabButton} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatGridListModule, MatGridTile} from "@angular/material/grid-list";
import {MatRippleModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatDividerModule} from "@angular/material/divider";
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {AdminRoutingModule} from "./AdminRoutingModule";
import {ServerRoutingModule} from "../server/ServerRoutingModule";
import {SettingsComponent} from "./components/settings/settings.component";
import {RegisterComponent} from "./components/register/register.component";
import { UserListComponent } from './components/user-list/user-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { UserPageComponent } from './components/user-page/user-page.component';



@NgModule({
  declarations: [
    SettingsComponent,
    AdminMenuComponent,
    ProductAddComponent,
    CategoryAddComponent,
    DeleteConfirmationDialogComponent,
    RegisterComponent,
    UserListComponent,
    UserPageComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatGridListModule,
    MatRippleModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    AdminRoutingModule,
    ServerRoutingModule,
    MatTableModule,
    MatPaginatorModule

  ]
})
export class AdminModule { }
