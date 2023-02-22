import {Component, Input} from '@angular/core';
import {ArticleDto} from "../../../gs-api/src/models/article-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss']
})
export class DetailArticleComponent {

  @Input()
  articleDto: ArticleDto = {};


  constructor(
    private router: Router
  ) {
  }

  modifierArticle() {
    this.router.navigate(['nouvelarticle', this.articleDto.id])
  }
}
