import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../../../models/Category.model";
import {HttpClient} from "@angular/common/http";
import {Product} from "../../../models/Product.model";
import {ActivatedRoute, Router} from "@angular/router";

import {Order} from "../../../models/Order.model";
import {Table} from "../../../models/Table.model";
import {ProductsService} from "../../../services/products.service";
import {TablesService} from "../../../services/tables.service";
import {OrdersService} from "../../../services/orders.service";
import {CategoriesService} from "../../../services/categories.service";
import {OrderPollingService} from "../../services/order-polling.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  categories$!: Observable<Category[]>;
  products$!: Observable<Product[]>;
  selectedProducts: Product[] = [];
  table !: Table;


  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router : Router,
              private productService : ProductsService,
              private tableService: TablesService,
              private ordersService : OrdersService,
              private categoriesService : CategoriesService) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getAllCategories();
    this.products$ = this.productService.getAllProducts();

    const params = this.route.snapshot.paramMap;

      const tableId = +params.get('tableId')!;
      console.log(tableId);
      this.tableService.getTableById(tableId).subscribe(table => {
        if (table){
          this.table = table;
        }


      });
      console.log(this.table);




  }


  addProductToOrder(product: Product) {
    this.selectedProducts.push(product);
    console.log('product ' + product.productName + ' added');
  }

  validateOrder() {

    const newOrder = new Order();


    newOrder.orderTime = new Date();
    newOrder.isServed = false;
    newOrder.products = this.selectedProducts;
    newOrder.orderTable = this.table;
    const productsUri= [];
    for ( let i=0; i<this.selectedProducts.length; i++){
      productsUri.push(`/api/products/${this.selectedProducts[i].id}`);
    }
    const params = this.route.snapshot.paramMap;
    console.log(productsUri[0]);

    const tableId = +params.get('tableId')!;
    const orderData = {
      orderTime : newOrder.orderTime,
      isServed : false,
      products : productsUri,
      currentProduct : productsUri[0],
      orderTable : `/api/tables/${tableId}`
    }
    console.log(orderData);
    this.ordersService.createNewOrder(orderData).subscribe(response =>{
      console.log('commande réussie');
      this.selectedProducts = [];
      this.router.navigateByUrl('kitchen/orders');
    });


  }


}
