import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TableListComponent} from "./server/components/table-list/table-list.component";
import {MenuComponent} from "./server/components/menu/menu.component";
import {OrderComponent} from "./server/components/order/order.component";

const routes: Routes = [
  {path : 'tables', component: TableListComponent},
  {path : '', redirectTo : 'tables', pathMatch : "full"},
  {path : 'menu', component : MenuComponent},
  {path : 'orders', component : OrderComponent}
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
