import {Component, Input, LOCALE_ID, OnInit} from '@angular/core';
import {Order} from "../../../models/Order.model";

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.scss']
})
export class SingleOrderComponent {
  @Input() order!:Order;


  protected readonly LOCALE_ID = LOCALE_ID;
}
