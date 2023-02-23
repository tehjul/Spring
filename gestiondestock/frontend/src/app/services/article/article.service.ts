import {Injectable} from '@angular/core';
import {UserService} from "../user/user.service";
import {ArticlesService} from "../../../gs-api/src/services/articles.service";
import {ArticleDto} from "../../../gs-api/src/models/article-dto";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private userService: UserService,
    private articleService: ArticlesService
  ) {
  }

  enregistrerArticle(articleDto: ArticleDto): Observable<ArticleDto> {
    articleDto.idEntreprise = this.userService.getConnectedUser().entreprise?.id;
    return this.articleService.save(articleDto);
  }

  findAllArticles(): Observable<ArticleDto[]> {
    return this.articleService.findAll();
  }

  findArticleById(id?: number): Observable<ArticleDto> {
    if (id) {
      return this.articleService.findById(id);
    }
    return of();
  }

  deleteArticle(idArticle: number): Observable<any> {
    if (idArticle) {
      return this.articleService.delete(idArticle);
    }
    return of();
  }
}
