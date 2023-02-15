import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nouvelle-categorie',
  templateUrl: './nouvelle-categorie.component.html',
  styleUrls: ['./nouvelle-categorie.component.scss']
})
export class NouvelleCategorieComponent {


  constructor(
    private router: Router
  ) {
  }

  cancel(): void {
    this.router.navigate(['categories']);
  }
}
