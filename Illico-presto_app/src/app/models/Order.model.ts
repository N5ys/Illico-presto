import {Product} from "./Product.model";
import {Table} from "./Table.model";

export class Order {
  id: number | null = null;
  orderTime: Date | null = null;
  serviceTime: Date | null = null;
  isServed: boolean | null = null;
  products: Product[] = [];
  orderTable: Table | null = null;
  currentProduct : Product | null = null;

  constructor() {
    this.products = [];
  }
}
