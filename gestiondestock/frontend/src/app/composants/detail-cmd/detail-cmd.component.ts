import {Component, Input} from '@angular/core';
import {LigneCommandeClientDto} from "../../../gs-api/src/models/ligne-commande-client-dto";

@Component({
  selector: 'app-detail-cmd',
  templateUrl: './detail-cmd.component.html',
  styleUrls: ['./detail-cmd.component.scss']
})
export class DetailCmdComponent {

  @Input()
  ligneCommande: LigneCommandeClientDto = {};
}
