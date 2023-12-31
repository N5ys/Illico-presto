import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {OrderComponent} from "./components/order/order.component";

const routes : Routes = [
  {path : 'orders', component : OrderComponent},
  {path : '**', redirectTo : 'orders'},


]
@NgModule({
  imports : [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class KitchenRoutingModule{}
