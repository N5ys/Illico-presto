import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TableListComponent} from "./server/components/table-list/table-list.component";
import {MenuComponent} from "./server/components/menu/menu.component";
import {OrderComponent} from "./server/components/order/order.component";
import {AdminMenuComponent} from "./admin/components/admin-menu/admin-menu.component";
import {ProductAddComponent} from "./admin/components/product-add/product-add.component";
import {CategoryAddComponent} from "./admin/components/category-add/category-add.component";


const routes: Routes = [
  {path : 'tables', component: TableListComponent},
  {path : '', redirectTo : 'tables', pathMatch : "full"},
  {path : 'menu', component : MenuComponent},
  {path : 'orders', component : OrderComponent},
  {path : 'admin-menu', component : AdminMenuComponent},
  {path : 'new-product', component: ProductAddComponent},
  {path : 'new-category', component: CategoryAddComponent}

];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
