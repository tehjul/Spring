import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryDto} from "../../../../gs-api/src/models/category-dto";
import {CategoryService} from "../../../services/category/category.service";

@Component({
  selector: 'app-nouvelle-categorie',
  templateUrl: './nouvelle-categorie.component.html',
  styleUrls: ['./nouvelle-categorie.component.scss']
})
export class NouvelleCategorieComponent implements OnInit {

  categoryDto: CategoryDto = {};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) {
  }

  cancel(): void {
    this.navigateToCategories();
  }

  enregistrerCategory(): void {
    this.categoryService.enregistrerCategory(this.categoryDto)
      .subscribe(res => {
        this.navigateToCategories();
      }, error => {
        this.errorMsg = error.error.errors;
      });
  }

  navigateToCategories(): void {
    this.router.navigate(['categories']);
  }

  ngOnInit(): void {
    const idCategory = this.activatedRoute.snapshot.params['idCategory'];
    if (idCategory) {
      this.categoryService.findById(idCategory)
        .subscribe(cat => {
          this.categoryDto = cat;
        });
    }
  }
}
