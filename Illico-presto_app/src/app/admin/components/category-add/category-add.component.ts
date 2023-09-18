import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Category} from "../../../models/Category.model";
import {Observable} from "rxjs";
import {Location} from '@angular/common';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit{
  categoryForm!: FormGroup;
  category!:Category;
  constructor(private fb: FormBuilder, private http : HttpClient, private router : Router, private location : Location) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.categoryForm.valid){
      const categoryData = this.categoryForm.value;
      this.createNewCategory(categoryData).subscribe(
        (product) => {
          // Le produit a été créé avec succès.
          console.log('catégorie créé avec succès :', product);
         // this.router.navigateByUrl('admin-menu');
          this.location.back();
        },
        (error) => {
          console.error('Erreur lors de la création de la catégorie :', error);
        }

      );
    }
  }

  createNewCategory(categoryData: any): Observable<Category> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Category>('http://127.0.0.1:8000/api/categories', categoryData, { headers });
  }
}
