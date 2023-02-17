import {Component} from '@angular/core';
import {EntrepriseDto} from "../../../gs-api/src/models/entreprise-dto";
import {EntrepriseService} from "../../services/entreprise/entreprise.service";
import {AdresseDto} from "../../../gs-api/src/models/adresse-dto";
import {UserService} from "../../services/user/user.service";
import {AuthenticationRequest} from "../../../gs-api/src/models/authentication-request";
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-inscription',
  templateUrl: './page-inscription.component.html',
  styleUrls: ['./page-inscription.component.scss']
})
export class PageInscriptionComponent {

  entrepriseDto: EntrepriseDto = {};
  adresseDto: AdresseDto = {};
  errorMsg: Array<string> = [];

  constructor(
    private entrepriseService: EntrepriseService,
    private userService: UserService,
    private router: Router
  ) {
  }

  inscrire(): void {
    this.entrepriseDto.adresse = this.adresseDto;
    this.entrepriseService.sinscrire(this.entrepriseDto)
      .subscribe(entrepriseDto => {
          this.connectEntreprise();
        },
        error => {
          this.errorMsg = error.error.errors;
        });
  }

  connectEntreprise(): void {
    const authenticationRequest: AuthenticationRequest = {
      login: this.entrepriseDto.email,
      password: 'som3R@nd0mP@$$word'
    }
    this.userService.login(authenticationRequest)
      .subscribe(response => {
        this.userService.setConnectedUser(response);
        this.router.navigate(['changermotdepasse']);
      });
  }
}
