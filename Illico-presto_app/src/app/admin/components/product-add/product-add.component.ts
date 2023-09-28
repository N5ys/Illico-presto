import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../models/Category.model";

import {HttpClient} from "@angular/common/http";

import {Router} from "@angular/router";
import {ProductsService} from "../../../services/products.service";
import {CategoriesService} from "../../../services/categories.service";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  productForm!: FormGroup;
  categories: Category[]=[];


  constructor(private fb: FormBuilder, private http : HttpClient, private router : Router, private productService : ProductsService, private categoriesService : CategoriesService) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: [null, Validators.required],
      productDescription: [null],
      price: [null, Validators.required],
      categoryID: [null, Validators.required]
    });


    this.categoriesService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      console.log(this.productForm.value);
      const categoryID = productData.categoryID;
      productData.category = `/api/categories/${categoryID}`;
      delete productData.categoryID;
      this.productService.createNewProduct(productData).subscribe(
        (product) => {
          // Le produit a été créé avec succès.
          console.log('Produit créé avec succès :', product);
          this.router.navigateByUrl('admin/menu')
        },
        (error) => {
          console.error('Erreur lors de la création du produit :', error);
        }
      );
    }
  }


  onAddCategory() {
    this.router.navigateByUrl('admin/new-category');
  }
}
