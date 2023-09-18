import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { TableEditComponent } from './components/table-edit/table-edit.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { BillComponent } from './components/bill/bill.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule, MatFabButton} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatGridListModule} from "@angular/material/grid-list";
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



@NgModule({
  declarations: [
    UserListComponent,
    UserEditComponent,
    CategoryListComponent,
    CategoryEditComponent,
    ProductListComponent,
    ProductEditComponent,
    SettingsComponent,
    TableListComponent,
    TableEditComponent,
    OrderListComponent,
    OrderDetailsComponent,
    BillComponent,
    AdminMenuComponent,
    ProductAddComponent,
    CategoryAddComponent,
    DeleteConfirmationDialogComponent
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
        MatDialogModule
    ]
})
export class AdminModule { }
