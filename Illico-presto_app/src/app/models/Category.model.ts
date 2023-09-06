import {Product} from "./Product.model";


export class Category {
  id: number | null = null;
  categoryName: string | null = null;
  products: Product[] = [];

  constructor() {
    this.products = [];
  }
}
