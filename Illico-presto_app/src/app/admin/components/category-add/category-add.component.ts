import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Category} from "../../../models/Category.model";
import {Observable} from "rxjs";
import {Location} from '@angular/common';
import {CategoriesService} from "../../../services/categories.service";

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit{
  categoryForm!: FormGroup;
  category!:Category;
  constructor(private fb: FormBuilder, private http : HttpClient, private router : Router, private location : Location, private categoriesService : CategoriesService) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.categoryForm.valid){
      const categoryData = this.categoryForm.value;
      this.categoriesService.createNewCategory(categoryData).subscribe(
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


}
