import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KitchenRoutingModule} from "./KitchenRoutingModule";
import {OrderComponent} from "./components/order/order.component";
import {SharedModule} from "../shared/shared.module";
import {ServerModule} from "../server/server.module";




@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    KitchenRoutingModule,
    SharedModule,
    ServerModule
  ]
})
export class KitchenModule { }
