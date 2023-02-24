import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientDto} from "../../../gs-api/src/models/client-dto";
import {CltFrsService} from "../../services/cltfrs/cltfrs.service";
import {ArticleDto} from "../../../gs-api/src/models/article-dto";
import {ArticleService} from "../../services/article/article.service";
import {LigneCommandeClientDto} from "../../../gs-api/src/models/ligne-commande-client-dto";
import {CommandesclientsService} from "../../../gs-api/src/services/commandesclients.service";
import {CommandeClientDto} from "../../../gs-api/src/models/commande-client-dto";

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
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cltFrsService: CltFrsService,
    private articleService: ArticleService,
    private commandeClientService: CommandesclientsService
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
    const ligneAlreadyExists = this.lignesCommande.find(lig => lig.article?.codeArticle === this.searchedArticle.codeArticle);
    if (ligneAlreadyExists) {
      this.lignesCommande.forEach(lig => {
        if (lig.article?.codeArticle === this.searchedArticle.codeArticle) {
          // @ts-ignore
          lig.quantite += +this.quantite;
        }
      })
      this.quantite = ligneAlreadyExists.quantite + this.quantite;
    } else {
      const ligneCmd: LigneCommandeClientDto = {
        article: this.searchedArticle,
        prixUnitaire: this.searchedArticle.prixUnitaireTtc,
        quantite: +this.quantite
      };
      this.lignesCommande.push(ligneCmd);
    }
    this.totalCommande = 0;
    this.lignesCommande.forEach(ligne => {
      if (ligne.prixUnitaire && ligne.quantite) {
        this.totalCommande += +ligne.prixUnitaire * +ligne.quantite
      }
    });
    this.searchedArticle = {};
    this.quantite = '';
    this.codeArticle = '';
    this.articleNotYetSelected = false;
    this.findAllArticles();
  }

  selectArticle(art: ArticleDto): void {
    this.searchedArticle = art;
    this.codeArticle = art.codeArticle ? art.codeArticle : '';
    this.articleNotYetSelected = true;
  }

  enregistrerCommande(): void {
    const commandeClient: CommandeClientDto = {
      client: this.selectedClientFournisseur,
      code: '',
      etatCommande: "EN_PREPARATION",
      dateCommande: new Date().getUTCDate(),
      idEntreprise: 1,
    };
    this.commandeClientService.save(commandeClient)
      .subscribe(cmd => {
        this.router.navigate(['commandesclients']);
      }, error => {
        this.errorMsg = error.error.errors;
      })
  }
}
