import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitchenDashboardComponent } from './components/kitchen-dashboard/kitchen-dashboard.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderServeComponent } from './components/order-serve/order-serve.component';
import { NextServiceTimeComponent } from './components/next-service-time/next-service-time.component';



@NgModule({
  declarations: [
    KitchenDashboardComponent,
    OrderListComponent,
    OrderDetailsComponent,
    OrderServeComponent,
    NextServiceTimeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class KitchenModule { }
