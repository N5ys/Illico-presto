import {Component, OnInit} from '@angular/core';
import {filter, map, Observable} from "rxjs";
import {Category} from "../../../models/Category.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../../../models/Product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {formatNumber} from "@angular/common";
import {Order} from "../../../models/Order.model";
import {Table} from "../../../models/Table.model";

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


  constructor(private http: HttpClient, private route: ActivatedRoute, private router : Router) {
  }

  getAllCategories(): Observable<Category[]> {
    const headers = new HttpHeaders().set('Accept', 'application/ld+json');

    return this.http.get<any>('http://127.0.0.1:8000/api/categories', {headers}).pipe(
      map((response: any) => {
        return response['hydra:member'] || [];
      })
    );

  }

  getAllProducts(): Observable<Product[]> {
    const headers = new HttpHeaders().set('Accept', 'application/ld+json');

    return this.http.get<any>('http://127.0.0.1:8000/api/products', {headers}).pipe(
      map((response: any) => {
        return response['hydra:member'] || [];
      })
    );
  }


  ngOnInit(): void {
    this.categories$ = this.getAllCategories();
    this.products$ = this.getAllProducts();

    const params = this.route.snapshot.paramMap;

      const tableId = +params.get('tableId')!;
      console.log(tableId);
      this.getTableById(tableId).subscribe(table => {
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

    const tableId = +params.get('tableId')!;
    const orderData = {
      orderTime : newOrder.orderTime,
      isServed : false,
      products : productsUri,
      orderTable : `/api/tables/${tableId}`
    }
    console.log(orderData);

    this.createNewOrder(orderData).subscribe(response =>{
      console.log('commande réussie');
      this.selectedProducts = [];
      this.router.navigateByUrl('kitchen/orders');
    });

    // La table associée
    /*
    // Envoyez cette commande à votre API pour l'enregistrement en base de données
    this.orderService.createOrder(newOrder).subscribe(response => {
      // Gérez la réponse de l'API, par exemple, affichez un message de succès
      console.log('Commande enregistrée avec succès');
      // Réinitialisez le tableau de produits sélectionnés pour une nouvelle commande
      this.selectedProducts = [];
    });*/
  }

  getTableById(id : number){
    const headers = new HttpHeaders().set('Accept', 'application/ld+json');
    console.log(id);
    return this.http.get<any>(`http://127.0.0.1:8000/api/tables/${id}`, { headers }).pipe(
      map((response: any) => {
        console.log(response);
        return response['hydra:member'];
      })
    );
  }



  createNewOrder(orderData: any): Observable<Order> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>('http://127.0.0.1:8000/api/orders', orderData, { headers });
  }
}
