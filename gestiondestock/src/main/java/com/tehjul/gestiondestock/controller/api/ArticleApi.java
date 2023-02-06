package com.tehjul.gestiondestock.controller.api;

import com.tehjul.gestiondestock.dto.ArticleDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.tehjul.gestiondestock.utils.Constants.APP_ROOT;

@Api(APP_ROOT + "articles")
public interface ArticleApi {

    @PostMapping(value = APP_ROOT + "/articles/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Enregistrer un article", notes = "Cette méthode permet d'enregistrer ou modifier un article)", response = ArticleDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "L'objet article créé ou modifié"),
            @ApiResponse(code = 400, message = "L'objet article n'est pas valide")
    })
    ArticleDto save(@RequestBody ArticleDto articleDto);

    @GetMapping(value = APP_ROOT + "/articles/{idArticle}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Rechercher un article par ID", notes = "Cette méthode permet de rechercher un article par son ID)", response = ArticleDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "L'article a été trouvé dans la BDD"),
            @ApiResponse(code = 404, message = "Aucun article n'existe dans la BDD avec l'ID fourni")
    })
    ArticleDto findById(@PathVariable("idArticle") Integer id);

    @GetMapping(value = APP_ROOT + "/articles/filter/{codeArticle}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Rechercher un article par CODE", notes = "Cette méthode permet de rechercher un article par son CODE)", response = ArticleDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "L'article a été trouvé dans la BDD"),
            @ApiResponse(code = 404, message = "Aucun article n'existe dans la BDD avec le CODE fourni")
    })
    ArticleDto findByCodeArticle(@PathVariable String codeArticle);

    @GetMapping(value = APP_ROOT + "/articles/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Rechercher la liste de tous les articles", notes = "Cette méthode permet de rechercher la liste des articles qui existent dans la BDD)", responseContainer = "List<ArticleDto")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "La liste des articles a été trouvé dans la BDD")
    })
    List<ArticleDto> findAll();

    @DeleteMapping(value = APP_ROOT + "/articles/delete/{idArticle}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Supprimer un article par ID", notes = "Cette méthode permet de supprimer un article par son ID)", response = ArticleDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "L'article a été supprimé de la BDD")
    })
    void delete(@PathVariable("idArticle") Integer id);
}
