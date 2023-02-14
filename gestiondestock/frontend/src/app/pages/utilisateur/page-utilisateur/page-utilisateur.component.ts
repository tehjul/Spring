import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-utilisateur',
  templateUrl: './page-utilisateur.component.html',
  styleUrls: ['./page-utilisateur.component.scss']
})
export class PageUtilisateurComponent {

  constructor(private router: Router) {
  }

  nouvelUtilisateur(): void {
    this.router.navigate(['nouvelutilisateur']);
  }
}
