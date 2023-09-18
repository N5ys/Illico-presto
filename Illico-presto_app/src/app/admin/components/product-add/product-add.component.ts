import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../models/Category.model";
import {map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../../../models/Product.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  productForm!: FormGroup;
  categories: Category[]=[];


  constructor(private fb: FormBuilder, private http : HttpClient, private router : Router) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: [null, Validators.required],
      productDescription: [null],
      price: [null, Validators.required],
      categoryID: [null, Validators.required]
    });


    this.getAllCategories().subscribe(categories => {
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
      this.createNewProduct(productData).subscribe(
        (product) => {
          // Le produit a été créé avec succès.
          console.log('Produit créé avec succès :', product);
          this.router.navigateByUrl('admin-menu')
        },
        (error) => {
          console.error('Erreur lors de la création du produit :', error);
        }
      );
    }
  }

  createNewProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Product>('http://127.0.0.1:8000/api/products', product, { headers });
  }

  getAllCategories(): Observable<Category[]> {
    const headers = new HttpHeaders().set('Accept', 'application/ld+json');
    return this.http.get<any>(`http://127.0.0.1:8000/api/categories`, { headers }).pipe(
      map((response: any) => {
        return response['hydra:member'] || [];
      })
    );
  }

  onAddCategory() {
    this.router.navigateByUrl('new-category');
  }
}
