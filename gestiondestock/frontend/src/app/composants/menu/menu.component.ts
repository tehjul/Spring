import {Component} from '@angular/core';
import {Menu} from "./menu";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  public menuProperties: Array<Menu> = [
    {
      id: '1',
      titre: 'Tableau de bord',
      icon: 'fa-solid fa-chart-line',
      url: '',
      sousMenu: [
        {
          id: '11',
          titre: 'Vue d\'ensemble',
          icon: 'fa-solid fa-chart-pie',
          url: ''
        },
        {
          id: '12',
          titre: 'Statistiques',
          icon: 'fa-solid fa-chart-bar',
          url: 'statistiques'
        },
      ]
    },
    {
      id: '2',
      titre: 'Articles',
      icon: 'fa-solid fa-boxes',
      url: '',
      sousMenu: [
        {
          id: '21',
          titre: 'Articles',
          icon: 'fa-solid fa-box',
          url: ''
        },
        {
          id: '22',
          titre: 'Mouvements de stock',
          icon: 'fa-brands fa-stack-overflow',
          url: ''
        },
      ]
    },
    {
      id: '3',
      titre: 'Clients',
      icon: 'fa-solid fa-users',
      url: '',
      sousMenu: [
        {
          id: '31',
          titre: 'Clients',
          icon: 'fa-solid fa-users',
          url: ''
        },
        {
          id: '32',
          titre: 'Commandes clients',
          icon: 'fa-solid fa-shopping-basket',
          url: ''
        },
      ]
    },
    {
      id: '4',
      titre: 'Fournisseurs',
      icon: 'fa-solid fa-users',
      url: '',
      sousMenu: [
        {
          id: '41',
          titre: 'Fournisseurs',
          icon: 'fa-solid fa-users',
          url: ''
        },
        {
          id: '42',
          titre: 'Commandes fournisseurs',
          icon: 'fa-solid fa-truck',
          url: ''
        },
      ]
    },
    {
      id: '5',
      titre: 'Parametrage',
      icon: 'fa-solid fa-cogs',
      url: '',
      sousMenu: [
        {
          id: '51',
          titre: 'Catégories',
          icon: 'fa-solid fa-tools',
          url: ''
        },
        {
          id: '52',
          titre: 'Utilisateurs',
          icon: 'fa-solid fa-user-cog',
          url: ''
        },
      ]
    }
  ]

  constructor(private router: Router) {
  }

  navigate(url?: string): void {
    this.router.navigate([url]);
  }
}
