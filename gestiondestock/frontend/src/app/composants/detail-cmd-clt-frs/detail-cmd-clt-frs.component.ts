import {Component, Input, OnInit} from '@angular/core';
import {CommandeClientDto} from "../../../gs-api/src/models/commande-client-dto";
import {ClientDto} from "../../../gs-api/src/models/client-dto";
import {CmdcltfrsService} from "../../services/cmdcltfrs/cmdcltfrs.service";
import {LigneCommandeClientDto} from "../../../gs-api/src/models/ligne-commande-client-dto";
import {CommandeFournisseurDto} from "../../../gs-api/src/models/commande-fournisseur-dto";

@Component({
  selector: 'app-detail-cmd-clt-frs',
  templateUrl: './detail-cmd-clt-frs.component.html',
  styleUrls: ['./detail-cmd-clt-frs.component.scss']
})
export class DetailCmdCltFrsComponent implements OnInit{

  @Input()
  origin = '';

  @Input()
  commande: any = {};
  cltFrs: ClientDto | undefined = {};

  ngOnInit(): void {
    this.extractClientFournisseur();
  }

  extractClientFournisseur(): void {
    if (this.origin === 'client') {
      this.cltFrs = this.commande?.client;
    } else if (this.origin === 'fournisseur') {
      this.cltFrs = this.commande?.fournisseur;
    }
  }

}
