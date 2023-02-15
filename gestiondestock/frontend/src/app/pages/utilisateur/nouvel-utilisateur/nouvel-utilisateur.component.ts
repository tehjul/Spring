import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nouvel-utilisateur',
  templateUrl: './nouvel-utilisateur.component.html',
  styleUrls: ['./nouvel-utilisateur.component.scss']
})
export class NouvelUtilisateurComponent {


  constructor(
    private router: Router
  ) {
  }

  cancel(): void {
    this.router.navigate(['utilisateurs']);
  }
}
