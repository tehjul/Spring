import {Component, Input} from '@angular/core';
import {ClientDto} from "../../../gs-api/src/models/client-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-detail-clt-frs',
  templateUrl: './detail-clt-frs.component.html',
  styleUrls: ['./detail-clt-frs.component.scss']
})
export class DetailCltFrsComponent {

  @Input()
  origin: string = '';

  @Input()
  clientFournisseur: any = {};


  constructor(
    private router: Router
  ) {
  }

  modifierClientFournisseur(): void {
    if (this.origin === 'client') {
      this.router.navigate(['nouveauclient', this.clientFournisseur.id]);
    } else if (this.origin === 'fournisseur') {
      this.router.navigate(['nouveaufournisseur', this.clientFournisseur.id]);
    }
  }
}
