import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CltFrsService} from "../../../services/cltfrs/cltfrs.service";
import {ClientDto} from "../../../../gs-api/src/models/client-dto";

@Component({
  selector: 'app-page-client',
  templateUrl: './page-client.component.html',
  styleUrls: ['./page-client.component.scss']
})
export class PageClientComponent implements OnInit {

  listClient: Array<ClientDto> = [];

  constructor(
    private router: Router,
    private ctlFrsService: CltFrsService
  ) {
  }

  nouveauClient(): void {
    this.router.navigate(['nouveauclient']);
  }

  ngOnInit(): void {
    this.findAllClients();
  }

  findAllClients() {
    this.ctlFrsService.findAllClients()
      .subscribe(clients => {
        this.listClient = clients;
      })
  }
}
