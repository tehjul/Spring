/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CommandeFournisseurDto } from '../models/commande-fournisseur-dto';
import { LigneCommandeFournisseurDto } from '../models/ligne-commande-fournisseur-dto';
@Injectable({
  providedIn: 'root',
})
class CommandesfournisseursService extends __BaseService {
  static readonly findAllPath = '/gestiondestock/v1/commandesfournisseurs/all';
  static readonly savePath = '/gestiondestock/v1/commandesfournisseurs/create';
  static readonly deleteArticlePath = '/gestiondestock/v1/commandesfournisseurs/delete/article/{idCommande}/{idLigneCommande}';
  static readonly deletePath = '/gestiondestock/v1/commandesfournisseurs/delete/{id}';
  static readonly findByCodePath = '/gestiondestock/v1/commandesfournisseurs/filter/{code}';
  static readonly findAllLignesCommandesFournisseurByCommandeFournisseurIdPath = '/gestiondestock/v1/commandesfournisseurs/lignesCommande/{idCommande}';
  static readonly updateArticlePath = '/gestiondestock/v1/commandesfournisseurs/update/article/{idCommande}/{idLigneCommande}/{idArticle}';
  static readonly updateEtatCommandePath = '/gestiondestock/v1/commandesfournisseurs/update/etat/{idCommande}/{etatCommande}';
  static readonly updateFournisseurPath = '/gestiondestock/v1/commandesfournisseurs/update/fournisseur/{idCommande}/{idFournisseur}';
  static readonly updateQuantiteCommandePath = '/gestiondestock/v1/commandesfournisseurs/update/quantite/{idCommande}/{idLigneCommande}/{quantite}';
  static readonly findByIdPath = '/gestiondestock/v1/commandesfournisseurs/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return successful operation
   */
  findAllResponse(): __Observable<__StrictHttpResponse<Array<CommandeFournisseurDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/gestiondestock/v1/commandesfournisseurs/all`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<CommandeFournisseurDto>>;
      })
    );
  }
  /**
   * @return successful operation
   */
  findAll(): __Observable<Array<CommandeFournisseurDto>> {
    return this.findAllResponse().pipe(
      __map(_r => _r.body as Array<CommandeFournisseurDto>)
    );
  }

  /**
   * @param body undefined
   * @return successful operation
   */
  saveResponse(body?: CommandeFournisseurDto): __Observable<__StrictHttpResponse<CommandeFournisseurDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/gestiondestock/v1/commandesfournisseurs/create`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CommandeFournisseurDto>;
      })
    );
  }
  /**
   * @param body undefined
   * @return successful operation
   */
  save(body?: CommandeFournisseurDto): __Observable<CommandeFournisseurDto> {
    return this.saveResponse(body).pipe(
      __map(_r => _r.body as CommandeFournisseurDto)
    );
  }

  /**
   * @param params The `CommandesfournisseursService.DeleteArticleParams` containing the following parameters:
   *
   * - `idLigneCommande`:
   *
   * - `idCommande`:
   *
   * @return successful operation
   */
  deleteArticleResponse(params: CommandesfournisseursService.DeleteArticleParams): __Observable<__StrictHttpResponse<CommandeFournisseurDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/gestiondestock/v1/commandesfournisseurs/delete/article/${encodeURIComponent(String(params.idCommande))}/${encodeURIComponent(String(params.idLigneCommande))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CommandeFournisseurDto>;
      })
    );
  }
  /**
   * @param params The `CommandesfournisseursService.DeleteArticleParams` containing the following parameters:
   *
   * - `idLigneCommande`:
   *
   * - `idCommande`:
   *
   * @return successful operation
   */
  deleteArticle(params: CommandesfournisseursService.DeleteArticleParams): __Observable<CommandeFournisseurDto> {
    return this.deleteArticleResponse(params).pipe(
      __map(_r => _r.body as CommandeFournisseurDto)
    );
  }

  /**
   * @param id undefined
   */
  deleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/gestiondestock/v1/commandesfournisseurs/delete/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id undefined
   */
  delete(id: number): __Observable<null> {
    return this.deleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param code undefined
   * @return successful operation
   */
  findByCodeResponse(code: string): __Observable<__StrictHttpResponse<CommandeFournisseurDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/gestiondestock/v1/commandesfournisseurs/filter/${encodeURIComponent(String(code))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CommandeFournisseurDto>;
      })
    );
  }
  /**
   * @param code undefined
   * @return successful operation
   */
  findByCode(code: string): __Observable<CommandeFournisseurDto> {
    return this.findByCodeResponse(code).pipe(
      __map(_r => _r.body as CommandeFournisseurDto)
    );
  }

  /**
   * @param idCommande undefined
   * @return successful operation
   */
  findAllLignesCommandesFournisseurByCommandeFournisseurIdResponse(idCommande: number): __Observable<__StrictHttpResponse<Array<LigneCommandeFournisseurDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/gestiondestock/v1/commandesfournisseurs/lignesCommande/${encodeURIComponent(String(idCommande))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<LigneCommandeFournisseurDto>>;
      })
    );
  }
  /**
   * @param idCommande undefined
   * @return successful operation
   */
  findAllLignesCommandesFournisseurByCommandeFournisseurId(idCommande: number): __Observable<Array<LigneCommandeFournisseurDto>> {
    return this.findAllLignesCommandesFournisseurByCommandeFournisseurIdResponse(idCommande).pipe(
      __map(_r => _r.body as Array<LigneCommandeFournisseurDto>)
    );
  }

  /**
   * @param params The `CommandesfournisseursService.UpdateArticleParams` containing the following parameters:
   *
   * - `idLigneCommande`:
   *
   * - `idCommande`:
   *
   * - `idArticle`:
   *
   * @return successful operation
   */
  updateArticleResponse(params: CommandesfournisseursService.UpdateArticleParams): __Observable<__StrictHttpResponse<CommandeFournisseurDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/gestiondestock/v1/commandesfournisseurs/update/article/${encodeURIComponent(String(params.idCommande))}/${encodeURIComponent(String(params.idLigneCommande))}/${encodeURIComponent(String(params.idArticle))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CommandeFournisseurDto>;
      })
    );
  }
  /**
   * @param params The `CommandesfournisseursService.UpdateArticleParams` containing the following parameters:
   *
   * - `idLigneCommande`:
   *
   * - `idCommande`:
   *
   * - `idArticle`:
   *
   * @return successful operation
   */
  updateArticle(params: CommandesfournisseursService.UpdateArticleParams): __Observable<CommandeFournisseurDto> {
    return this.updateArticleResponse(params).pipe(
      __map(_r => _r.body as CommandeFournisseurDto)
    );
  }

  /**
   * @param params The `CommandesfournisseursService.UpdateEtatCommandeParams` containing the following parameters:
   *
   * - `idCommande`:
   *
   * - `etatCommande`:
   *
   * @return successful operation
   */
  updateEtatCommandeResponse(params: CommandesfournisseursService.UpdateEtatCommandeParams): __Observable<__StrictHttpResponse<CommandeFournisseurDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/gestiondestock/v1/commandesfournisseurs/update/etat/${encodeURIComponent(String(params.idCommande))}/${encodeURIComponent(String(params.etatCommande))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CommandeFournisseurDto>;
      })
    );
  }
  /**
   * @param params The `CommandesfournisseursService.UpdateEtatCommandeParams` containing the following parameters:
   *
   * - `idCommande`:
   *
   * - `etatCommande`:
   *
   * @return successful operation
   */
  updateEtatCommande(params: CommandesfournisseursService.UpdateEtatCommandeParams): __Observable<CommandeFournisseurDto> {
    return this.updateEtatCommandeResponse(params).pipe(
      __map(_r => _r.body as CommandeFournisseurDto)
    );
  }

  /**
   * @param params The `CommandesfournisseursService.UpdateFournisseurParams` containing the following parameters:
   *
   * - `idFournisseur`:
   *
   * - `idCommande`:
   *
   * @return successful operation
   */
  updateFournisseurResponse(params: CommandesfournisseursService.UpdateFournisseurParams): __Observable<__StrictHttpResponse<CommandeFournisseurDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/gestiondestock/v1/commandesfournisseurs/update/fournisseur/${encodeURIComponent(String(params.idCommande))}/${encodeURIComponent(String(params.idFournisseur))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CommandeFournisseurDto>;
      })
    );
  }
  /**
   * @param params The `CommandesfournisseursService.UpdateFournisseurParams` containing the following parameters:
   *
   * - `idFournisseur`:
   *
   * - `idCommande`:
   *
   * @return successful operation
   */
  updateFournisseur(params: CommandesfournisseursService.UpdateFournisseurParams): __Observable<CommandeFournisseurDto> {
    return this.updateFournisseurResponse(params).pipe(
      __map(_r => _r.body as CommandeFournisseurDto)
    );
  }

  /**
   * @param params The `CommandesfournisseursService.UpdateQuantiteCommandeParams` containing the following parameters:
   *
   * - `quantite`:
   *
   * - `idLigneCommande`:
   *
   * - `idCommande`:
   *
   * @return successful operation
   */
  updateQuantiteCommandeResponse(params: CommandesfournisseursService.UpdateQuantiteCommandeParams): __Observable<__StrictHttpResponse<CommandeFournisseurDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/gestiondestock/v1/commandesfournisseurs/update/quantite/${encodeURIComponent(String(params.idCommande))}/${encodeURIComponent(String(params.idLigneCommande))}/${encodeURIComponent(String(params.quantite))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CommandeFournisseurDto>;
      })
    );
  }
  /**
   * @param params The `CommandesfournisseursService.UpdateQuantiteCommandeParams` containing the following parameters:
   *
   * - `quantite`:
   *
   * - `idLigneCommande`:
   *
   * - `idCommande`:
   *
   * @return successful operation
   */
  updateQuantiteCommande(params: CommandesfournisseursService.UpdateQuantiteCommandeParams): __Observable<CommandeFournisseurDto> {
    return this.updateQuantiteCommandeResponse(params).pipe(
      __map(_r => _r.body as CommandeFournisseurDto)
    );
  }

  /**
   * @param id undefined
   * @return successful operation
   */
  findByIdResponse(id: number): __Observable<__StrictHttpResponse<CommandeFournisseurDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/gestiondestock/v1/commandesfournisseurs/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CommandeFournisseurDto>;
      })
    );
  }
  /**
   * @param id undefined
   * @return successful operation
   */
  findById(id: number): __Observable<CommandeFournisseurDto> {
    return this.findByIdResponse(id).pipe(
      __map(_r => _r.body as CommandeFournisseurDto)
    );
  }
}

module CommandesfournisseursService {

  /**
   * Parameters for deleteArticle
   */
  export interface DeleteArticleParams {
    idLigneCommande: number;
    idCommande: number;
  }

  /**
   * Parameters for updateArticle
   */
  export interface UpdateArticleParams {
    idLigneCommande: number;
    idCommande: number;
    idArticle: number;
  }

  /**
   * Parameters for updateEtatCommande
   */
  export interface UpdateEtatCommandeParams {
    idCommande: number;
    etatCommande: 'EN_PREPARATION' | 'VALIDEE' | 'LIVREE';
  }

  /**
   * Parameters for updateFournisseur
   */
  export interface UpdateFournisseurParams {
    idFournisseur: number;
    idCommande: number;
  }

  /**
   * Parameters for updateQuantiteCommande
   */
  export interface UpdateQuantiteCommandeParams {
    quantite: number;
    idLigneCommande: number;
    idCommande: number;
  }
}

export { CommandesfournisseursService }
