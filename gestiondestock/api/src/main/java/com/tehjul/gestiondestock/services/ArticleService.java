package com.tehjul.gestiondestock.services;

import com.tehjul.gestiondestock.dto.ArticleDto;
import com.tehjul.gestiondestock.dto.LigneCommandeClientDto;
import com.tehjul.gestiondestock.dto.LigneCommandeFournisseurDto;
import com.tehjul.gestiondestock.dto.LigneVenteDto;

import java.util.List;

public interface ArticleService {

    ArticleDto save(ArticleDto articleDto);

    ArticleDto findById(Integer id);

    ArticleDto findByCodeArticle(String codeArticle);

    List<ArticleDto> findAll();

    List<LigneVenteDto> findHistoriqueVentes(Integer idArticle);

    List<LigneCommandeClientDto> findHistoriqueCommandesClient(Integer idArticle);

    List<LigneCommandeFournisseurDto> findHistoriqueCommandeFournisseur(Integer idArticle);

    List<ArticleDto> findAllArticleByIdCategory(Integer idCategory);

    void delete(Integer id);
}
