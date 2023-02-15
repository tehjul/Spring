import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nouvel-article',
  templateUrl: './nouvel-article.component.html',
  styleUrls: ['./nouvel-article.component.scss']
})
export class NouvelArticleComponent {


  constructor(
    private router: Router
  ) {
  }

  cancel(): void {
    this.router.navigate(['articles']);
  }
}
