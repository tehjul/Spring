/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CategoryDto } from '../models/category-dto';
@Injectable({
  providedIn: 'root',
})
class CategoriesService extends __BaseService {
  static readonly findAllPath = '/gestiondestock/v1/categories/all';
  static readonly savePath = '/gestiondestock/v1/categories/create';
  static readonly deletePath = '/gestiondestock/v1/categories/delete/{idCategory}';
  static readonly findByCodePath = '/gestiondestock/v1/categories/filter/{codeCategory}';
  static readonly findByIdPath = '/gestiondestock/v1/categories/{idCategory}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Rechercher la liste de toutes les catégories
   *
   * Cette méthode permet de rechercher la liste des catégories qui existent dans la BDD)
   * @return La liste des catégories a été trouvée dans la BDD
   */
  findAllResponse(): __Observable<__StrictHttpResponse<Array<CategoryDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/gestiondestock/v1/categories/all`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<CategoryDto>>;
      })
    );
  }
  /**
   * Rechercher la liste de toutes les catégories
   *
   * Cette méthode permet de rechercher la liste des catégories qui existent dans la BDD)
   * @return La liste des catégories a été trouvée dans la BDD
   */
  findAll(): __Observable<Array<CategoryDto>> {
    return this.findAllResponse().pipe(
      __map(_r => _r.body as Array<CategoryDto>)
    );
  }

  /**
   * Enregistrer une catégorie
   *
   * Cette méthode permet d'enregistrer ou modifier une catégorie)
   * @param body undefined
   * @return L'objet category créé ou modifié
   */
  saveResponse(body?: CategoryDto): __Observable<__StrictHttpResponse<CategoryDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/gestiondestock/v1/categories/create`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CategoryDto>;
      })
    );
  }
  /**
   * Enregistrer une catégorie
   *
   * Cette méthode permet d'enregistrer ou modifier une catégorie)
   * @param body undefined
   * @return L'objet category créé ou modifié
   */
  save(body?: CategoryDto): __Observable<CategoryDto> {
    return this.saveResponse(body).pipe(
      __map(_r => _r.body as CategoryDto)
    );
  }

  /**
   * Supprimer une catégorie par ID
   *
   * Cette méthode permet de supprimer une catégorie par son ID)
   * @param idCategory undefined
   */
  deleteResponse(idCategory: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/gestiondestock/v1/categories/delete/${encodeURIComponent(String(idCategory))}`,
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
   * Supprimer une catégorie par ID
   *
   * Cette méthode permet de supprimer une catégorie par son ID)
   * @param idCategory undefined
   */
  delete(idCategory: number): __Observable<null> {
    return this.deleteResponse(idCategory).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Rechercher une catégorie par CODE
   *
   * Cette méthode permet de rechercher une catégorie par son CODE)
   * @param codeCategory undefined
   * @return La catégorie a été trouvé dans la BDD
   */
  findByCodeResponse(codeCategory: string): __Observable<__StrictHttpResponse<CategoryDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/gestiondestock/v1/categories/filter/${encodeURIComponent(String(codeCategory))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CategoryDto>;
      })
    );
  }
  /**
   * Rechercher une catégorie par CODE
   *
   * Cette méthode permet de rechercher une catégorie par son CODE)
   * @param codeCategory undefined
   * @return La catégorie a été trouvé dans la BDD
   */
  findByCode(codeCategory: string): __Observable<CategoryDto> {
    return this.findByCodeResponse(codeCategory).pipe(
      __map(_r => _r.body as CategoryDto)
    );
  }

  /**
   * Rechercher une catégorie par ID
   *
   * Cette méthode permet de rechercher une catégorie par son ID)
   * @param idCategory undefined
   * @return La catégorie a été trouvé dans la BDD
   */
  findByIdResponse(idCategory: number): __Observable<__StrictHttpResponse<CategoryDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/gestiondestock/v1/categories/${encodeURIComponent(String(idCategory))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CategoryDto>;
      })
    );
  }
  /**
   * Rechercher une catégorie par ID
   *
   * Cette méthode permet de rechercher une catégorie par son ID)
   * @param idCategory undefined
   * @return La catégorie a été trouvé dans la BDD
   */
  findById(idCategory: number): __Observable<CategoryDto> {
    return this.findByIdResponse(idCategory).pipe(
      __map(_r => _r.body as CategoryDto)
    );
  }
}

module CategoriesService {
}

export { CategoriesService }
