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
  private shouldPoll: boolean = false;
  constructor(private ordersService: OrdersService) {
    this.startPolling();
    console.log("polling starts");
  }

  startPolling() {
    this.pollingSubscription = interval(this.pollingInterval).subscribe(() => {
      if (this.shouldPoll) {
        this.ordersService.getAllOrders().subscribe(orders => {
          this.ordersSubject.next(orders);
        });
      }
    });
  }
  getOrdersSubject(): Subject<Order[]> {
    return this.ordersSubject;
  }
  setShouldPoll(shouldPoll: boolean) {
    this.shouldPoll = shouldPoll;
  }
  ngOnDestroy() {

    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}
