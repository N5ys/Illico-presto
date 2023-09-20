import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableListComponent } from './components/table-list/table-list.component';
import { TableDetailsComponent } from './components/table-details/table-details.component';
import { MenuComponent } from './components/menu/menu.component';
import { OrderComponent } from './components/order/order.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { BillComponent } from './components/bill/bill.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatRippleModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatDivider, MatDividerModule} from "@angular/material/divider";
import {ServerRoutingModule} from "./ServerRoutingModule";



@NgModule({
    declarations: [
        TableListComponent,
        TableDetailsComponent,
        MenuComponent,
        OrderComponent,
        OrderConfirmationComponent,
        BillComponent
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
    ServerRoutingModule


  ]
})
export class ServerModule { }
