import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientDto} from "../../../gs-api/src/models/client-dto";
import {AdresseDto} from "../../../gs-api/src/models/adresse-dto";
import {CltFrsService} from "../../services/cltfrs/cltfrs.service";
import {FournisseurDto} from "../../../gs-api/src/models/fournisseur-dto";

@Component({
  selector: 'app-nouveau-clt-frs',
  templateUrl: './nouveau-clt-frs.component.html',
  styleUrls: ['./nouveau-clt-frs.component.scss']
})
export class NouveauCltFrsComponent implements OnInit {

  origin = '';

  clientFournisseur: any = {};
  adresseDto: AdresseDto = {};
  errorMsg: Array<string> = [];

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.origin = data['origin'];
    });
    this.findObject();
  }

  findObject(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      if (this.origin === 'client') {
        this.cltFrsService.findClientById(id)
          .subscribe(client => {
            this.clientFournisseur = client;
            this.adresseDto = this.clientFournisseur.adresse;
          })
      } else if (this.origin === 'fournisseur') {
        this.cltFrsService.findFournisseurById(id)
          .subscribe(frs => {
            this.clientFournisseur = frs;
            this.adresseDto = this.clientFournisseur.adresse;
          })
      }
    }
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cltFrsService: CltFrsService
  ) {
  }

  saveClick(): void {

  }

  cancelClick(): void {
    if (this.origin === 'client') {
      this.navigateToClient();
    } else if (this.origin === 'fournisseur') {
      this.navigateToFournisseur();
    }
  }

  enregistrer() {
    if (this.origin === 'client') {
      this.cltFrsService.enregistrerClient(this.mapToClient())
        .subscribe(client => {
          this.navigateToClient();
        }, error => {
          this.errorMsg = error.error.errors;
        });
    } else if (this.origin === 'fournisseur') {
      this.cltFrsService.enregistrerFournisseur(this.mapToFournisseur())
        .subscribe(client => {
          this.navigateToFournisseur();
        }, error => {
          this.errorMsg = error.error.errors;
        });
    }
  }

  mapToClient(): ClientDto {
    const clientDto: ClientDto = this.clientFournisseur;
    clientDto.adresse = this.adresseDto;
    return clientDto;
  }

  mapToFournisseur(): FournisseurDto {
    const fournisseurDto: FournisseurDto = this.clientFournisseur;
    fournisseurDto.adresse = this.adresseDto;
    return fournisseurDto;
  }

  navigateToClient(): void {
    this.router.navigate(['clients']);
  }

  navigateToFournisseur(): void {
    this.router.navigate(['fournisseurs']);
  }

}
