import {Order} from "./Order.model";
import {Category} from "./Category.model";

;

export class Product {
  id: number | null = null;
  productName: string | null = null;
  productDescription: string | null = null;
  price: number | null = null;
  orders: Order[] = [];
  category: Category | null = null;
}
