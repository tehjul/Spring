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

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {
  }

  nouvelleCategorie(): void {
    this.router.navigate(['nouvellecategorie']);
  }

  ngOnInit(): void {
    this.categoryService.findAllCategories()
      .subscribe(res => {
        this.listCategories = res;
      });
  }
}
