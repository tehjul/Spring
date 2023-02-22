import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../../../services/article/article.service";
import {ArticleDto} from "../../../../gs-api/src/models/article-dto";
import {CategoryDto} from "../../../../gs-api/src/models/category-dto";
import {CategoryService} from "../../../services/category/category.service";

@Component({
  selector: 'app-nouvel-article',
  templateUrl: './nouvel-article.component.html',
  styleUrls: ['./nouvel-article.component.scss']
})
export class NouvelArticleComponent implements OnInit {

  articleDto: ArticleDto = {};
  categorieDto: CategoryDto = {};
  listeCategorie: Array<CategoryDto> = [];
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.categoryService.findAllCategories()
      .subscribe(categories => {
        this.listeCategorie = categories;
      })

    const id = this.activatedRoute.snapshot.params['idArticle'];
    if (id) {
      this.articleService.findArticleById(id)
        .subscribe(article => {
          this.articleDto = article;
          this.categorieDto = this.articleDto.category ? this.articleDto.category : {};
        });
    }
  }


  cancel(): void {
    this.navigateToArticle();
  }

  enregistrerArticle() {
    this.articleDto.category = this.categorieDto;
    this.articleService.enregistrerArticle(this.articleDto)
      .subscribe(art => {
        this.navigateToArticle();
      }, error => {
        this.errorMsg = error.error.errors;
      });
  }

  navigateToArticle(): void {
    this.router.navigate(['articles']);
  }

  calculerTTC(): void {
    if (this.articleDto.prixUnitaireHt && this.articleDto.tauxTva) {
      this.articleDto.prixUnitaireTtc = this.articleDto.prixUnitaireHt * (1 + this.articleDto.tauxTva / 100)
    }
  }
}
