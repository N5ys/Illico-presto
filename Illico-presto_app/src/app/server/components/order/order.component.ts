import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of, Subscription} from "rxjs";
import {Order} from "../../../models/Order.model";
import {Product} from "../../../models/Product.model";
import {OrdersService} from "../../../services/orders.service";
import {OrderPollingService} from "../../services/order-polling.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {
  ConfirmServedProductDialogComponent
} from "../../dialog/confirm-served-product-dialog/confirm-served-product-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {animate, style, transition, trigger} from "@angular/animations";
import {DelayService} from "../../../services/delay.service";



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: [
    trigger('orderItemAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('300ms', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, transform: 'scale(0.5)' })),
      ]),
    ]),
  ],
})
export class OrderComponent implements OnInit, OnDestroy{
  orders$!: Observable<Order[]>;
  products!: Product[];
  breakpoint!: number;
  private delay!: number;
  private mercureSubscription!: Subscription;


  constructor(private http: HttpClient,
              private ordersService : OrdersService,
              private pollingService : OrderPollingService,
              private breakpointObserver: BreakpointObserver,
              private dialog: MatDialog,
              private delayService: DelayService) {}

  trackByOrder(index: number, order: Order) {
    return order.id;
  }


  ngOnInit(): void {

    this.delayService.getInterDishDelay().subscribe((delay)=>{
      this.delay = delay[0].interdishDelay!;
    });
    this.orders$ = this.ordersService.getAllOrders();
    this.subscribeToUpdates();

    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.breakpoint = 1;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.breakpoint = 2;
        }
        if (result.breakpoints[Breakpoints.Large] ) {
          this.breakpoint =5;
        }
        if (result.breakpoints[Breakpoints.Medium]){
          this.breakpoint = 4;
        }
        if (result.breakpoints[Breakpoints.XLarge]){
          this.breakpoint = 6;
        }
      }
    });





  }

  getProductsOrdered(orders$: Observable<Order[]>): void {
    orders$.subscribe((orders: Order[]) => {
      this.products = [];

      orders.forEach((order: Order) => {
        order.products.forEach((product: Product) => {
          this.products.push(product);
        });
      });
    });
  }

  onProductServed(order: Order, id: number | null) {
    if (id != null && order.products.length > 0) {



      order.products.shift();
      console.log(order.products)
      this.ordersService.deleteProductFromOrder(id);

      if (order.products.length === 0) {

        order.isServed = true;
        order.currentProduct = null;
      } else {

        order.currentProduct = order.products[0];
      }
      const productsUri= [];
      for ( let i=0; i<order.products.length; i++){
        productsUri.push(`/api/products/${order.products[i].id}`);
      }
      const newServiceTime = new Date();
      newServiceTime.setMinutes(newServiceTime.getMinutes() + this.delay);
      order.serviceTime = newServiceTime;

      const orderData = {
        currentProduct: order.currentProduct ? `/api/products/${order.currentProduct.id}` : null,
        products : productsUri,
        isServed : order.isServed,
        serviceTime : order.serviceTime
      };
      console.log(orderData)

      this.ordersService.updateOrder(id, orderData).subscribe( () =>{
        this.getProductsOrdered(this.orders$);
      }, (error)=>{
        console.log("la commande n'a pas pu être mise a jour : " + error)
      });

    }
  }
  refreshOrders() {
    this.orders$ = this.ordersService.getAllOrders();
  }

  openConfirmationService(order: Order, id: number | null){
    const dialogRef = this.dialog.open(ConfirmServedProductDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 'confirm') {

        this.onProductServed(order,id);
      }
    });
  }

  subscribeToUpdates(): void {
    const eventSource = new EventSource('https://localhost/.well-known/mercure?topic=order');
    eventSource.addEventListener('message', (event) => {
      console.log('EventMessage' + event.data);
      this.pollingService.setShouldPoll(true);
      // Mettez à jour les commandes en utilisant le service de polling
      this.pollingService.getOrdersSubject().subscribe((updatedOrders) => {

        this.orders$ = of(updatedOrders);
        this.pollingService.setShouldPoll(false)
      });
    });
  }

  ngOnDestroy(): void {
    if (this.mercureSubscription) {
      this.mercureSubscription.unsubscribe();
    }
  }
}
