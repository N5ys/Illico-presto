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
import {ProductsService} from "../../../services/products.service";
import {CategoriesService} from "../../../services/categories.service";

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


  constructor(private http: HttpClient,
              private router: Router,
              private fb : FormBuilder,
              private dialog : MatDialog,
              private productService : ProductsService,
              private categoriesService : CategoriesService) {}


  ngOnInit(): void {

    this.categories$ = this.categoriesService.getAllCategories();
    this.products$ = this.productService.getAllProducts();
  }

  onAddProduct(): void {
    this.router.navigateByUrl('admin/new-product');
  }

  onAddCategory(): void {
    this.router.navigateByUrl('admin/new-category');
  }


  startEdit(productId: number | null): void {
    this.editingProductId = productId;
    console.log(this.editingProductId);
  }


  saveProduct(productId: number | null): void {
    if (productId !== null) {
      const updatedProductData = this.productForm.value;

      this.productService.updateProduct(productId, updatedProductData).subscribe(
          () => {

            this.editingProductId = null;
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du produit :', error);
          }
        );
    }
  }



  deleteProduct(productId: number | null): void {
    if (productId !== null) {
      this.productService.deleteProductById(productId).subscribe(
        () => {
          this.products$ = this.products$.pipe(
            switchMap(() => this.productService.getAllProducts())
          );
        },
        (error) => {
          console.error('Erreur lors de la suppression du produit :', error);
        }
      );
    }
  }




  startEditCategory(categoryId: number | null) {
    this.editingCategoryId = categoryId;
  }

  saveCategory(categoryId: number | null):void {
    if (categoryId != null){
        const updatedCategory = this.categoryForm.value;
      this.categoriesService.updateCategory(categoryId,updatedCategory).subscribe(
        () => {
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
      this.categoriesService.deleteCategoryById(categoryId).subscribe(
        () => {
          this.categories$ = this.categories$.pipe(
            switchMap(() => this.categoriesService.getAllCategories())
          );
        },
        (error) => {
          console.error('Erreur lors de la suppression de la catégorie :', error);
        }
      );
    }
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

  cancelDelete() {
    this.editingProductId = null;
  }
}
