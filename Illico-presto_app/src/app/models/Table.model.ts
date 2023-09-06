import {Order} from "./Order.model";

export class Table {
  id: number | null = null;
  tableNumber: number | null = null;
  orders: Order[] = [];

  constructor() {
    this.orders = [];
  }
}
