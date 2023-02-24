import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientDto} from "../../../gs-api/src/models/client-dto";
import {AdresseDto} from "../../../gs-api/src/models/adresse-dto";
import {CltFrsService} from "../../services/cltfrs/cltfrs.service";
import {FournisseurDto} from "../../../gs-api/src/models/fournisseur-dto";
import {PhotosService} from "../../../gs-api/src/services/photos.service";
import SavePhotoParams = PhotosService.SavePhotoParams;

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
  file: File | null = null;
  imgUrl: string | ArrayBuffer = 'favicon.ico';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cltFrsService: CltFrsService,
    private photoService: PhotosService
  ) {
  }

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

  navigateToClientOrFournisseur(): void {
    if (this.origin === 'client') {
      this.navigateToClient();
    } else if (this.origin === 'fournisseur') {
      this.navigateToFournisseur();
    }
  }

  cancelClick(): void {
    this.navigateToClientOrFournisseur();
  }

  enregistrer() {
    if (this.origin === 'client') {
      this.cltFrsService.enregistrerClient(this.mapToClient())
        .subscribe(client => {
          this.savePhoto(client.id, client.nom);
        }, error => {
          this.errorMsg = error.error.errors;
        });
    } else if (this.origin === 'fournisseur') {
      this.cltFrsService.enregistrerFournisseur(this.mapToFournisseur())
        .subscribe(frs => {
          this.savePhoto(frs.id, frs.nom);
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

  onFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0);
      if (this.file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = (event) => {
          if (fileReader.result) {
            this.imgUrl = fileReader.result;
          }
        }
      }
    }
  }

  savePhoto(idCltFrs?: number, titre?: string): void {
    if (idCltFrs && titre && this.file) {
      const params: SavePhotoParams = {
        id: idCltFrs,
        file: this.file,
        title: titre,
        context: this.origin
      };
      this.photoService.savePhoto(params)
        .subscribe(res => {
          this.navigateToClientOrFournisseur();
        })
    } else {
      this.navigateToClientOrFournisseur();
    }
  }

}
