import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClientDto} from "../../../gs-api/src/models/client-dto";
import {CltFrsService} from "../../services/cltfrs/cltfrs.service";
import {ArticleDto} from "../../../gs-api/src/models/article-dto";
import {ArticleService} from "../../services/article/article.service";
import {LigneCommandeClientDto} from "../../../gs-api/src/models/ligne-commande-client-dto";

@Component({
  selector: 'app-nouvelle-cmd-clt-frs',
  templateUrl: './nouvelle-cmd-clt-frs.component.html',
  styleUrls: ['./nouvelle-cmd-clt-frs.component.scss']
})
export class NouvelleCmdCltFrsComponent implements OnInit {

  origin = '';
  selectedClientFournisseur: ClientDto = {};
  listClientsFournisseurs: Array<ClientDto> = [];
  searchedArticle: ArticleDto = {};
  listArticle: Array<ArticleDto> = [];
  articleErrorMsg = '';
  codeArticle = '';
  quantite = '';

  lignesCommande: Array<LigneCommandeClientDto> = [];
  totalCommande = 0;
  articleNotYetSelected = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cltFrsService: CltFrsService,
    private articleService: ArticleService
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.origin = data['origin'];
    });
    this.findAllCltFrs();
    this.findAllArticles();
  }

  findAllCltFrs(): void {
    if (this.origin === 'client') {
      this.cltFrsService.findAllClients()
        .subscribe(clients => {
          this.listClientsFournisseurs = clients;
        });
    } else if (this.origin === 'fournisseur') {

    }
  }

  findAllArticles(): void {
    this.articleService.findAllArticles()
      .subscribe(articles => {
        this.listArticle = articles;
      })
  }

  findArticleByCode(codeArticle: string) {
    this.articleErrorMsg = '';
    if (codeArticle) {
      this.articleService.findArticleByCode(codeArticle)
        .subscribe(art => {
          this.searchedArticle = art;
        }, error => {
          console.log(error);
          this.articleErrorMsg = error.error.message;
        });
    }
  }

  searchArticle(): void {
    if (this.codeArticle.length === 0) {
      this.findAllArticles();
    }
    this.listArticle = this.listArticle.filter(art => art.codeArticle?.startsWith(this.codeArticle) || art.designation?.startsWith(this.codeArticle));
  }

  ajouterLigneCommande(): void {
    const ligneCmd: LigneCommandeClientDto = {
      article: this.searchedArticle,
      prixUnitaire: this.searchedArticle.prixUnitaireTtc,
      quantite: +this.quantite
    };
    this.lignesCommande.push(ligneCmd);
    this.lignesCommande.forEach(ligne => {
      if (ligne.prixUnitaire && ligne.quantite) {
        this.totalCommande += +ligne.prixUnitaire * +ligne.quantite
      }
    });
    this.searchedArticle = {};
    this.quantite = '';
    this.codeArticle = '';
    this.articleNotYetSelected = false;
  }

  selectArticle(art: ArticleDto): void {
    this.searchedArticle = art;
    this.codeArticle = art.codeArticle ? art.codeArticle : '';
    this.articleNotYetSelected = true;
  }
}
