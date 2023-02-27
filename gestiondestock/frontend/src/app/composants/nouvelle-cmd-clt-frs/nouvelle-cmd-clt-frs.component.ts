import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientDto} from "../../../gs-api/src/models/client-dto";
import {CltFrsService} from "../../services/cltfrs/cltfrs.service";
import {ArticleDto} from "../../../gs-api/src/models/article-dto";
import {ArticleService} from "../../services/article/article.service";
import {LigneCommandeClientDto} from "../../../gs-api/src/models/ligne-commande-client-dto";
import {CommandesclientsService} from "../../../gs-api/src/services/commandesclients.service";
import {CommandeClientDto} from "../../../gs-api/src/models/commande-client-dto";
import {CmdcltfrsService} from "../../services/cmdcltfrs/cmdcltfrs.service";
import {CommandeFournisseurDto} from "../../../gs-api/src/models/commande-fournisseur-dto";
import {of} from "rxjs";

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
  codeCommande = '';

  lignesCommande: Array<LigneCommandeClientDto> = [];
  totalCommande = 0;
  articleNotYetSelected = false;
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cltFrsService: CltFrsService,
    private articleService: ArticleService,
    private commandeClientService: CommandesclientsService,
    private cmdCltFrsService: CmdcltfrsService
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
      this.cltFrsService.findAllFournisseurs()
        .subscribe(fournisseurs => {
          this.listClientsFournisseurs = fournisseurs;
        });
    }
  }

  findAllArticles(): void {
    this.articleService.findAllArticles()
      .subscribe(articles => {
        this.listArticle = articles;
      });
  }

  filterArticle(): void {
    if (this.codeArticle.length === 0) {
      this.findAllArticles();
    }
    this.listArticle = this.listArticle.filter(art => art.codeArticle?.includes(this.codeArticle) || art.designation?.includes(this.codeArticle));
  }

  ajouterLigneCommande(): void {
    this.checkLigneCommande();
    this.calculerTotalCommande();
    this.searchedArticle = {};
    this.quantite = '';
    this.codeArticle = '';
    this.articleNotYetSelected = false;
    this.findAllArticles();
  }

  calculerTotalCommande(): void {
    this.totalCommande = 0;
    this.lignesCommande.forEach(ligne => {
      if (ligne.prixUnitaire && ligne.quantite) {
        this.totalCommande += +ligne.prixUnitaire * +ligne.quantite
      }
    });
  }

  private checkLigneCommande() {
    const ligneAlreadyExists = this.lignesCommande.find(lig => lig.article?.codeArticle === this.searchedArticle.codeArticle);
    if (ligneAlreadyExists) {
      this.lignesCommande.forEach(lig => {
        if (lig.article?.codeArticle === this.searchedArticle.codeArticle) {
          // @ts-ignore
          lig.quantite += +this.quantite;
        }
      })
    } else {
      const ligneCmd: LigneCommandeClientDto = {
        article: this.searchedArticle,
        prixUnitaire: this.searchedArticle.prixUnitaireTtc,
        quantite: +this.quantite
      };

      this.lignesCommande.push(ligneCmd);
    }
  }

  selectArticleClick(art: ArticleDto): void {
    this.searchedArticle = art;
    this.codeArticle = art.codeArticle ? art.codeArticle : '';
    this.articleNotYetSelected = true;
  }

  enregistrerCommande(): void {
    const commande = this.preparerCommande();
    if (this.origin === 'client') {
      this.cmdCltFrsService.enregistrerCommandeClient(commande as CommandeClientDto)
        .subscribe(cmd => {
          this.router.navigate(['commandeclient']);
        }, error => {
          this.errorMsg = error.error.errors;
        });
    } else if (this.origin === 'fournisseur') {
      this.cmdCltFrsService.enregistrerCommandeFournisseur(commande as CommandeFournisseurDto)
        .subscribe(cmd => {
          this.router.navigate(['commandefournisseur']);
        }, error => {
          this.errorMsg = error.error.errors;
        });
    }
  }

  private preparerCommande(): CommandeFournisseurDto | CommandeClientDto {
    let commons = {
      code: this.codeCommande,
      dateCommande: new Date().getUTCMilliseconds(),
      etatCommande: "EN_PREPARATION",
    }
    if (this.origin === 'client') {
      let commandeClient: CommandeClientDto = {
        client: this.selectedClientFournisseur,
        ligneCommandeClients: this.lignesCommande
      };
      Object.assign(commandeClient, commons);
      return commandeClient;
    } else if (this.origin === 'fournisseur') {
      let commandeFournisseur: CommandeFournisseurDto = {
        fournisseur: this.selectedClientFournisseur,
        ligneCommandeFournisseurs: this.lignesCommande
      };
      Object.assign(commandeFournisseur, commons);
      return commandeFournisseur;
    }
    return {};
  }
}
