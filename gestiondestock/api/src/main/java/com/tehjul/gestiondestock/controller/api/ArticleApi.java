package com.tehjul.gestiondestock.controller.api;

import com.tehjul.gestiondestock.dto.ArticleDto;
import com.tehjul.gestiondestock.dto.LigneCommandeClientDto;
import com.tehjul.gestiondestock.dto.LigneCommandeFournisseurDto;
import com.tehjul.gestiondestock.dto.LigneVenteDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.tehjul.gestiondestock.utils.Constants.APP_ROOT;
import static com.tehjul.gestiondestock.utils.Constants.ARTICLE_ENDPOINT;

@Api(ARTICLE_ENDPOINT)
public interface ArticleApi {

    @PostMapping(value = ARTICLE_ENDPOINT + "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Enregistrer un article", notes = "Cette méthode permet d'enregistrer ou modifier un article)", response = ArticleDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "L'objet article créé ou modifié"),
            @ApiResponse(code = 400, message = "L'objet article n'est pas valide")
    })
    ArticleDto save(@RequestBody ArticleDto articleDto);

    @GetMapping(value = ARTICLE_ENDPOINT + "/{idArticle}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Rechercher un article par ID", notes = "Cette méthode permet de rechercher un article par son ID)", response = ArticleDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "L'article a été trouvé dans la BDD"),
            @ApiResponse(code = 404, message = "Aucun article n'existe dans la BDD avec l'ID fourni")
    })
    ArticleDto findById(@PathVariable("idArticle") Integer id);

    @GetMapping(value = ARTICLE_ENDPOINT + "/filter/{codeArticle}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Rechercher un article par CODE", notes = "Cette méthode permet de rechercher un article par son CODE)", response = ArticleDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "L'article a été trouvé dans la BDD"),
            @ApiResponse(code = 404, message = "Aucun article n'existe dans la BDD avec le CODE fourni")
    })
    ArticleDto findByCodeArticle(@PathVariable String codeArticle);

    @GetMapping(value = ARTICLE_ENDPOINT + "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Rechercher la liste de tous les articles", notes = "Cette méthode permet de rechercher la liste des articles qui existent dans la BDD)", responseContainer = "List<ArticleDto>")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "La liste des articles a été trouvée dans la BDD")
    })
    List<ArticleDto> findAll();

    @GetMapping(value = ARTICLE_ENDPOINT + "/historique/vente/{idArticle}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<LigneVenteDto> findHistoriqueVentes(@PathVariable Integer idArticle);

    @GetMapping(value = ARTICLE_ENDPOINT + "/historique/commandeclient/{idArticle}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<LigneCommandeClientDto> findHistoriqueCommandesClient(@PathVariable Integer idArticle);

    @GetMapping(value = ARTICLE_ENDPOINT + "/historique/commandefournisseur/{idArticle}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<LigneCommandeFournisseurDto> findHistoriqueCommandeFournisseur(@PathVariable Integer idArticle);

    @GetMapping(value = ARTICLE_ENDPOINT + "/filter/category/{idCategory}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<ArticleDto> findAllArticleByIdCategory(@PathVariable Integer idCategory);

    @DeleteMapping(value = ARTICLE_ENDPOINT + "/delete/{idArticle}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Supprimer un article par ID", notes = "Cette méthode permet de supprimer un article par son ID)")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "L'article a été supprimé de la BDD")
    })
    void delete(@PathVariable("idArticle") Integer id);
}
