import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-article',
  templateUrl: './page-article.component.html',
  styleUrls: ['./page-article.component.scss']
})
export class PageArticleComponent {

  constructor(private router: Router) {
  }

  nouvelArticle(): void {
    this.router.navigate(['nouvelarticle']);
  }
}
