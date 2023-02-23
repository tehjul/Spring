import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CltFrsService} from "../../../services/cltfrs/cltfrs.service";
import {FournisseurDto} from "../../../../gs-api/src/models/fournisseur-dto";

@Component({
  selector: 'app-page-fournisseur',
  templateUrl: './page-fournisseur.component.html',
  styleUrls: ['./page-fournisseur.component.scss']
})
export class PageFournisseurComponent implements OnInit {

  listFournisseur: Array<FournisseurDto> = [];

  constructor(
    private router: Router,
    private ctlFrsService: CltFrsService
  ) {
  }

  nouveauFournisseur(): void {
    this.router.navigate(['nouveaufournisseur']);
  }

  ngOnInit(): void {
    this.findAllFournisseurs();
  }

  findAllFournisseurs() {
    this.ctlFrsService.findAllFournisseurs()
      .subscribe(fournisseurs => {
        this.listFournisseur = fournisseurs;
      })
  }
}
