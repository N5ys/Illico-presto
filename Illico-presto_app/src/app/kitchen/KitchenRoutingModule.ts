import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {OrderComponent} from "../server/components/order/order.component";

const routes : Routes = [
  {path : 'orders', component : OrderComponent},
 {path : '**', redirectTo : 'orders', pathMatch : "full"},
]
@NgModule({
  imports : [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class KitchenRoutingModule{}
