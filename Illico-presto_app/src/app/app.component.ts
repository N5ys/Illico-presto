import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {forkJoin, map, Observable} from 'rxjs';
import { Order } from './models/Order.model';
import { Category } from './models/Category.model';
import { Product } from './models/Product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  orders$!: Observable<Order[]>;
  categories$!: Observable<Category[]>;
  products$!: Observable<Product[]>;
  uniqueProducts: Product[] = [];
  title= 'Illico-presto_app';


  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    const headers = new HttpHeaders().set('Accept', 'application/ld+json');

    return this.http.get<any>('http://127.0.0.1:8000/api/orders', { headers }).pipe(
      map((response: any) => {
        return response['hydra:member'] || [];
      })
    );
  }

  getAllCategories(): Observable<Category[]> {
    const headers = new HttpHeaders().set('Accept', 'application/ld+json');

    return this.http.get<any>('http://127.0.0.1:8000/api/categories', { headers }).pipe(
      map((response: any) => {
        return response['hydra:member'] || [];
      })
    );
  }

  getAllProducts(): Observable<Product[]> {
    const headers = new HttpHeaders().set('Accept', 'application/ld+json');

    return this.http.get<any>('http://127.0.0.1:8000/api/products', { headers }).pipe(
      map((response: any) => {
        return response['hydra:member'] || [];
      })
    );
  }
  // Méthode pour créer une nouvelle catégorie
  createNewCategory(categoryData: any): Observable<Category> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Category>('http://127.0.0.1:8000/api/categories', categoryData, { headers });
  }/*
// Exemple d'utilisation pour créer une nouvelle catégorie
  createCategory(): void {
    const newCategoryData = {
      categoryName: 'Vins'
    };

    this.createNewCategory(newCategoryData).subscribe(
      (newCategory) => {
        console.log('Nouvelle catégorie créée :', newCategory);
        // Gérez la réponse ici
      },
      (error) => {
        console.error('Erreur lors de la création de la catégorie :', error);
        // Gérez les erreurs ici
      }
    );
  }


  // Méthode pour créer un nouveau produit
  createNewProduct(productData: any): Observable<Product> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Product>('http://127.0.0.1:8000/api/products', productData, { headers });
  }

// Exemple d'utilisation pour créer un nouveau produit avec une catégorie
  createProductWithCategory(): void {
    const newProductData = {
      productName: 'villageoise',
      productDescription: 'Description du nouveau produit',
      price: 30, // Prix du nouveau produit
      category: '/api/categories/43' // Remplacez '1' par l'ID de la catégorie souhaitée
    };

    this.createNewProduct(newProductData).subscribe(
      (newProduct) => {
        console.log('Nouveau produit créé :', newProduct);
        // Gérez la réponse ici
      },
      (error) => {
        console.error('Erreur lors de la création du produit :', error);
        // Gérez les erreurs ici
      }
    );
  }


  // Méthode pour mettre à jour une catégorie existante
  updateCategory(categoryId: number, updatedCategoryData: any): Observable<Category> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<Category>(`http://127.0.0.1:8000/api/categories/${categoryId}`, updatedCategoryData, { headers });
  }

// Exemple d'utilisation pour mettre à jour une catégorie existante
  updateExistingCategory(): void {
    const categoryIdToUpdate = 43; // Remplacez par l'ID de la catégorie que vous souhaitez mettre à jour

    const updatedCategoryData = {
      categoryName: 'Boissons'
    };

    this.updateCategory(categoryIdToUpdate, updatedCategoryData).subscribe(
      (updatedCategory) => {
        console.log('Catégorie mise à jour :', updatedCategory);
        // Gérez la réponse ici
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la catégorie :', error);
        // Gérez les erreurs ici
      }
    );
  }

  addProductsToOrders(): void {
    console.log('addProductsToOrders method is called');
    const headers = new HttpHeaders().set('Content-Type', 'application/ld+json');

    const productIdsForOrder7 = [9, 8,7]; // Remplacez par les ID de produits souhaités pour la commande 7
    const productIdsForOrder8 = [8, 7]; // Remplacez par les ID de produits souhaités pour la commande 8

    const order7Url = 'http://127.0.0.1:8000/api/orders/7';
    const order8Url = 'http://127.0.0.1:8000/api/orders/8';

    // Ajoutez les produits à la commande 7
    productIdsForOrder7.forEach((productId) => {
      const productUrl = `http://127.0.0.1:8000/api/products/${productId}`;
      const productToAdd = {
        '@id': productUrl,
        '@type': 'Product',
      };
      this.http.post(order7Url + '/products', JSON.stringify(productToAdd), { headers }).subscribe(
        (response) => {
          console.log('Produit ajouté à la commande 7 avec succès', response);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du produit à la commande 7', error);
        }
      );
    });

    // Ajoutez les produits à la commande 8
    productIdsForOrder8.forEach((productId) => {
      console.log(`Adding product ${productId} to order 8`);
      const productUrl = `http://127.0.0.1:8000/api/products/${productId}`;
      const productToAdd = {
        '@id': productUrl,
        '@type': 'Product',
      };
      this.http.post(order8Url + '/products', JSON.stringify(productToAdd), { headers }).subscribe(
        (response) => {
          console.log('Produit ajouté à la commande 8 avec succès', response);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du produit à la commande 8', error);
        }
      );
    });
  }
*/
  addProductToOrder(orderId: number, productId: number): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/ld+json'
    });

    const orderUrl = `http://127.0.0.1:8000/api/orders/${orderId}`;
    const productUrl = `http://127.0.0.1:8000/api/products/${productId}`;

    // Récupérez la commande existante
    this.http.get<Order>(orderUrl, { headers }).subscribe(
      (order) => {
        // Assurez-vous que la propriété products existe dans la commande
        if (!order.products) {
          order.products = [];
        }

        // Récupérez le produit correspondant à partir de l'URL
        this.http.get<Product>(productUrl, { headers }).subscribe(
          (product) => {
            // Ajoutez le produit à la liste des produits de la commande
            order.products.push(product);

            // Mettez à jour la commande avec le nouveau produit
            this.http.put(orderUrl, order, { headers }).subscribe(
              (response) => {
                console.log(`Produit ${productId} ajouté à la commande ${orderId} avec succès`, response);
              },
              (error) => {
                console.error(`Erreur lors de l'ajout du produit ${productId} à la commande ${orderId}`, error);
              }
            );
          },
          (error) => {
            console.error(`Erreur lors de la récupération du produit ${productId}`, error);
          }
        );
      },
      (error) => {
        console.error(`Erreur lors de la récupération de la commande ${orderId}`, error);
      }
    );
  }



  ngOnInit(): void {
    this.orders$ = this.getAllOrders();
    this.categories$ = this.getAllCategories();
    this.products$ = this.getAllProducts();
   // this.addProductToOrder(8,9);

  /*  this.createCategory();

    this.createProductWithCategory();
    this.updateExistingCategory();*/

  }


}
