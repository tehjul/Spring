import {Injectable} from '@angular/core';
import {EntreprisesService} from "../../../gs-api/src/services/entreprises.service";
import {EntrepriseDto} from "../../../gs-api/src/models/entreprise-dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  constructor(
    private entrepriseService: EntreprisesService
  ) {
  }

  sinscrire(entreprise: EntrepriseDto): Observable<EntrepriseDto> {
    return this.entrepriseService.save(entreprise);
  }
}
