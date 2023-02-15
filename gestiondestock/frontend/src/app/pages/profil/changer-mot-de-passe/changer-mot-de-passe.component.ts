import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-changer-mot-de-passe',
  templateUrl: './changer-mot-de-passe.component.html',
  styleUrls: ['./changer-mot-de-passe.component.scss']
})
export class ChangerMotDePasseComponent {


  constructor(
    private router: Router
  ) {
  }

  cancel(): void {
    this.router.navigate(['profil']);
  }
}
