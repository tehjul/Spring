import {Component, Input} from '@angular/core';
import {ArticleDto} from "../../../gs-api/src/models/article-dto";

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss']
})
export class DetailArticleComponent {

  @Input()
  articleDto: ArticleDto = {};

}
