import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CmdcltfrsService} from "../../services/cmdcltfrs/cmdcltfrs.service";
import {CommandeClientDto} from "../../../gs-api/src/models/commande-client-dto";
import {LigneCommandeClientDto} from "../../../gs-api/src/models/ligne-commande-client-dto";
import {LigneCommandeFournisseurDto} from "../../../gs-api/src/models/ligne-commande-fournisseur-dto";

@Component({
  selector: 'app-page-cmd-clt-frs',
  templateUrl: './page-cmd-clt-frs.component.html',
  styleUrls: ['./page-cmd-clt-frs.component.scss']
})
export class PageCmdCltFrsComponent implements OnInit {

  origin = '';
  listeCommandes: Array<any> = [];
  mapLignesCommande = new Map();
  mapPrixTotalCommande = new Map();
  mapNbLignes = new Map();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cmdCltFrsService: CmdcltfrsService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.origin = data['origin'];
    });
    this.findAllCommandes();
  }

  nouvelleCommande(): void {
    if (this.origin === 'client') {
      this.router.navigate(['nouvellecommandeclt']);
    } else if (this.origin === 'fournisseur') {
      this.router.navigate(['nouvellecommandefrs']);
    }
  }

  findAllCommandes(): void {
    if (this.origin === 'client') {
      this.cmdCltFrsService.findAllCommandesClient()
        .subscribe(cmd => {
          this.listeCommandes = cmd;
          this.findAllLigneCommande();
        });
    } else if (this.origin === 'fournisseur') {
      this.cmdCltFrsService.findAllCommandesFournisseur()
        .subscribe(cmd => {
          this.listeCommandes = cmd;
          this.findAllLigneCommande();
        });
    }
  }

  findAllLigneCommande(idCommande?: number): void {
    this.listeCommandes.forEach(cmd => {
      this.findLignesCommande(cmd.id);
    })

  }

  private findLignesCommande(idCommande?: number): void {
    if (this.origin === 'client') {
      this.cmdCltFrsService.findAllLigneCommandesClient(idCommande)
        .subscribe(list => {
          this.fillMappings(idCommande, list);
          // this.mapLignesCommande.set(idCommande, list);
          // this.mapNbLignes.set(idCommande, list.length);
          // this.mapPrixTotalCommande.set(idCommande, this.calculerTotalCmd(list));
        });
    } else if (this.origin === 'fournisseur') {
      this.cmdCltFrsService.findAllLigneCommandesFournisseur(idCommande)
        .subscribe(list => {
          this.fillMappings(idCommande, list);
          // this.mapLignesCommande.set(idCommande, list);
          // this.mapNbLignes.set(idCommande, list.length);
          // this.mapPrixTotalCommande.set(idCommande, this.calculerTotalCmd(list));
        });
    }
  }

  private fillMappings(idCmd: number | undefined, list: Array<LigneCommandeClientDto | LigneCommandeFournisseurDto>): void {
    this.mapLignesCommande.set(idCmd, list);
    this.mapNbLignes.set(idCmd, list.length);
    this.mapPrixTotalCommande.set(idCmd, this.calculerTotalCmd(list));
  }

  calculerTotalCmd(list: Array<LigneCommandeClientDto>): number {
    let total = 0;
    list.forEach(ligne => {
      if (ligne.quantite && ligne.prixUnitaire) {
        total += ligne.quantite * ligne.prixUnitaire;
      }
    })
    return +total.toFixed(2);
  }

  calculerTotalCommande(id?: number): number {
    return this.mapPrixTotalCommande.get(id);
  }

  calculerNbLignes(id?: number): number {
    return this.mapNbLignes.get(id);
  }
}
