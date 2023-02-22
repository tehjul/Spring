import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CategoryDto} from "../../../../gs-api/src/models/category-dto";
import {CategoryService} from "../../../services/category/category.service";

@Component({
  selector: 'app-page-categorie',
  templateUrl: './page-categorie.component.html',
  styleUrls: ['./page-categorie.component.scss']
})
export class PageCategorieComponent implements OnInit {

  listCategories: Array<CategoryDto> = [];
  selectedCatIdToDelete?: number = -1;
  errorMsg = '';

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {
  }

  nouvelleCategorie(): void {
    this.router.navigate(['nouvellecategorie']);
  }

  ngOnInit(): void {
    this.findAllCategories();
  }

  findAllCategories(): void {
    this.categoryService.findAllCategories()
      .subscribe(res => {
        this.listCategories = res;
      });
  }

  modifierCategory(id?: number): void {
    this.router.navigate(['nouvellecategorie', id]);
  }

  confirmerEtSupprimerCat(): void {
    if (this.selectedCatIdToDelete !== -1) {
      this.categoryService.delete(this.selectedCatIdToDelete)
        .subscribe(res => {
          this.findAllCategories();
        }, error => {
          this.errorMsg = error.error.message;
        });
    }
  }

  annulerSuppressionCat(): void {
    this.selectedCatIdToDelete = -1;
  }

  selectCatPourSupprimer(id?: number): void {
    this.selectedCatIdToDelete = id;
  }
}
