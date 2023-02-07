package com.tehjul.gestiondestock.utils;

public interface Constants {

    final String CREATE = "/create";
    final String FIND_BY_ID = "/{id}";
    final String FIND_BY_CODE = "/filter/{code}";
    final String FIND_ALL = "/all";
    final String DELETE = "/delete";

    String APP_ROOT = "gestiondestock/v1";

    String ARTICLE_ENDPOINT = APP_ROOT + "/articles";

    String CATEGORY_ENDPOINT = APP_ROOT + "/categories";

    String CLIENT_ENDPOINT = APP_ROOT + "/clients";

    String COMMANDE_CLIENT_ENDPOINT = APP_ROOT + "/commandesclients";

    String COMMANDE_FOURNISSEUR_ENDPOINT = APP_ROOT + "/commandesfournisseurs";
    String CREATE_COMMANDE_FOURNISSEUR_ENDPOINT = COMMANDE_FOURNISSEUR_ENDPOINT + CREATE;
    String FIND_COMMANDE_FOURNISSEUR_BY_ID_ENDPOINT = COMMANDE_FOURNISSEUR_ENDPOINT + FIND_BY_ID;
    String FIND_COMMANDE_FOURNISSEUR_BY_CODE_ENDPOINT = COMMANDE_FOURNISSEUR_ENDPOINT + FIND_BY_CODE;
    String FIND_ALL_COMMANDE_FOURNISSEUR_ENDPOINT = COMMANDE_FOURNISSEUR_ENDPOINT + FIND_ALL;
    String DELETE_COMMANDE_FOURNISSEUR_ENDPOINT = COMMANDE_FOURNISSEUR_ENDPOINT + DELETE + FIND_BY_ID;

    String ENTREPRISE_ENDPOINT = APP_ROOT + "/entreprises";

    String FOURNISSEUR_ENDPOINT = APP_ROOT + "/fournisseurs";

    String UTILISATEUR_ENDPOINT = APP_ROOT + "/utilisateurs";

    String VENTES_ENDPOINT = APP_ROOT + "/ventes";

    String AUTHENTICATION_ENDPOINT = APP_ROOT + "/auth";
}
