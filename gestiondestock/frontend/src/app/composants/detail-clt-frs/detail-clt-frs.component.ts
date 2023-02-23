import {Component, Input} from '@angular/core';
import {ClientDto} from "../../../gs-api/src/models/client-dto";

@Component({
  selector: 'app-detail-clt-frs',
  templateUrl: './detail-clt-frs.component.html',
  styleUrls: ['./detail-clt-frs.component.scss']
})
export class DetailCltFrsComponent {

  @Input()
  clientFournisseur: any = {};


}
