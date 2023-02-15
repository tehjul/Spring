import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-profil',
  templateUrl: './page-profil.component.html',
  styleUrls: ['./page-profil.component.scss']
})
export class PageProfilComponent {

  constructor(private router: Router) {
  }

  modifierMotDePasse(): void {
    this.router.navigate(['changermotdepasse']);
  }
}
