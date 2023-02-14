import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-categorie',
  templateUrl: './page-categorie.component.html',
  styleUrls: ['./page-categorie.component.scss']
})
export class PageCategorieComponent {

  constructor(private router: Router) {
  }

  nouvelleCategorie(): void {
    this.router.navigate(['nouvellecategorie']);
  }
}
