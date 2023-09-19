import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TableListComponent} from "./server/components/table-list/table-list.component";
import {MenuComponent} from "./server/components/menu/menu.component";
import {OrderComponent} from "./server/components/order/order.component";
import {AdminMenuComponent} from "./admin/components/admin-menu/admin-menu.component";
import {ProductAddComponent} from "./admin/components/product-add/product-add.component";
import {CategoryAddComponent} from "./admin/components/category-add/category-add.component";


const routes: Routes = [
  {path : 'server/tables', component: TableListComponent},
  {path : '', redirectTo : 'server/tables', pathMatch : "full"},
  {path : 'server/menu/:tableId', component : MenuComponent},
  {path : 'kitchen/orders', component : OrderComponent},
  {path : 'admin/menu', component : AdminMenuComponent},
  {path : 'admin/new-product', component: ProductAddComponent},
  {path : 'admin/new-category', component: CategoryAddComponent}

];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
