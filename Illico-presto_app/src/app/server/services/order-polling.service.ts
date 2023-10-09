import {Injectable, OnDestroy} from '@angular/core';
import {OrdersService} from "../../services/orders.service";
import {interval, mergeMap, Subject, Subscription} from "rxjs";
import {Order} from "../../models/Order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderPollingService implements OnDestroy{

  private pollingInterval = 2000;
  private pollingSubscription!: Subscription;
  private ordersSubject = new Subject<Order[]>();

  constructor(private ordersService: OrdersService) {
    this.startPolling();
    console.log("polling starts");
  }

  startPolling() {
    this.pollingSubscription = interval(this.pollingInterval)
      .pipe(
        mergeMap(() => this.ordersService.getAllOrders())
      )
      .subscribe(orders => {
        this.ordersSubject.next(orders);
      });
  }
  getOrdersSubject(): Subject<Order[]> {
    return this.ordersSubject;
  }
  ngOnDestroy() {

    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}
