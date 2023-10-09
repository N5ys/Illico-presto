import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableListComponent } from './components/table-list/table-list.component';

import { MenuComponent } from './components/menu/menu.component';
import { OrderComponent } from './components/order/order.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';

import {MatToolbarModule} from "@angular/material/toolbar";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatRippleModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatDividerModule} from "@angular/material/divider";
import {ServerRoutingModule} from "./ServerRoutingModule";
import { SingleOrderComponent } from './components/single-order/single-order.component';
import { ConfirmServedProductDialogComponent } from './dialog/confirm-served-product-dialog/confirm-served-product-dialog.component';
import {OrderPollingService} from "./services/order-polling.service";
import {MatDialogModule} from "@angular/material/dialog";



@NgModule({
    declarations: [
        TableListComponent,
        MenuComponent,
        OrderComponent,
        OrderConfirmationComponent,
        SingleOrderComponent,
        ConfirmServedProductDialogComponent,

    ],
    exports: [
        TableListComponent,

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
    ServerRoutingModule,
    MatDialogModule


  ],
  providers:[
    OrderPollingService
  ]
})
export class ServerModule { }
