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
    BillComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
