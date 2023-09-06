import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableListComponent } from './components/table-list/table-list.component';
import { TableDetailsComponent } from './components/table-details/table-details.component';
import { MenuComponent } from './components/menu/menu.component';
import { OrderComponent } from './components/order/order.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { BillComponent } from './components/bill/bill.component';



@NgModule({
  declarations: [
    TableListComponent,
    TableDetailsComponent,
    MenuComponent,
    OrderComponent,
    OrderConfirmationComponent,
    BillComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ServerModule { }
