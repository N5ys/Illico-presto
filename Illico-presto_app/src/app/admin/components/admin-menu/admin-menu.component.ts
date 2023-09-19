import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Category } from '../../../models/Category.model';
import { Product } from '../../../models/Product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DeleteConfirmationDialogComponent} from "../delete-confirmation-dialog/delete-confirmation-dialog.component";

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent {
  categories$!: Observable<Category[]>;
  products$!: Observable<Product[]>;
  editingProductId: number | null = null;
  editingCategoryId: number | null = null;
  productForm: FormGroup = this.fb.group({
    productName: [''],
    productDescription: [''],
    price: [''],
  });
  categoryForm : FormGroup = this.fb.group({
    categoryName : ''
  })


  constructor(private http: HttpClient, private router: Router, private fb : FormBuilder, private dialog : MatDialog) {}

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

  ngOnInit(): void {

    this.categories$ = this.getAllCategories();
    this.products$ = this.getAllProducts();
  }

  onAddProduct(): void {
    this.router.navigateByUrl('admin/new-product');
  }

  onAddCategory(): void {
    this.router.navigateByUrl('admin/new-category');
  }

  // Activer le mode édition d'un produit
  startEdit(productId: number | null): void {
    this.editingProductId = productId;
    console.log(this.editingProductId);
  }

  // Sauvegarder les modifications d'un produit
  saveProduct(productId: number | null): void {
    if (productId !== null) {
      const updatedProductData = this.productForm.value; // Récupérer les données du formulaire réactif

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this.http.put<any>(`http://127.0.0.1:8000/api/products/${productId}`, updatedProductData, { headers })
        .subscribe(
          () => {
            // Mise à jour réussie, réinitialisez l'ID en cours d'édition
            this.editingProductId = null;
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du produit :', error);
          }
        );
    }
  }


  // Supprimer un produit
  deleteProduct(productId: number | null): void {
    if (productId !== null) {
      this.deleteProductById(productId).subscribe(
        () => {
          // Suppression réussie, mettez à jour la liste des produits
          this.products$ = this.products$.pipe(
            switchMap(() => this.getAllProducts())
          );
        },
        (error) => {
          console.error('Erreur lors de la suppression du produit :', error);
        }
      );
    }
  }

  // Méthode pour supprimer un produit par ID
  deleteProductById(productId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete<any>(`http://127.0.0.1:8000/api/products/${productId}`, { headers });
  }

  private getProductById(productId: number): Observable<Product> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<Product>(`http://127.0.0.1:8000/api/products/${productId}`, { headers });
  }

  startEditCategory(categoryId: number | null) {
    this.editingCategoryId = categoryId;
  }

  saveCategory(categoryId: number | null):void {
    if (categoryId != null){
        const updatedCategory = this.categoryForm.value;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this.http.put<any>(`http://127.0.0.1:8000/api/categories/${categoryId}`, updatedCategory, { headers }).subscribe(
        () => {
          // Mise à jour réussie, réinitialisez l'ID en cours d'édition
          this.editingCategoryId = null;
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du produit :', error);
        }
      );
    }
  }

  deleteCategory(categoryId: number | null): void {
    if (categoryId !== null) {
      this.deleteCategoryById(categoryId).subscribe(
        () => {
          // Suppression réussie, mettez à jour la liste des catégories
          this.categories$ = this.categories$.pipe(
            switchMap(() => this.getAllCategories())
          );
        },
        (error) => {
          console.error('Erreur lors de la suppression de la catégorie :', error);
        }
      );
    }
  }

// Méthode pour supprimer une catégorie par ID
  deleteCategoryById(categoryId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete<any>(`http://127.0.0.1:8000/api/categories/${categoryId}`, { headers });
  }

  openDeleteConfirmationDialog(categoryId: number | null): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 'confirm') {

        this.deleteCategory(categoryId);
      }
    });
  }
}
