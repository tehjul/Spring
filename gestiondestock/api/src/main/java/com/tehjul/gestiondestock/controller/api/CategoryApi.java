package com.tehjul.gestiondestock.controller.api;

import com.tehjul.gestiondestock.dto.CategoryDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.tehjul.gestiondestock.utils.Constants.APP_ROOT;
import static com.tehjul.gestiondestock.utils.Constants.CATEGORY_ENDPOINT;

@Api("categories")
public interface CategoryApi {

    @PostMapping(value = CATEGORY_ENDPOINT + "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Enregistrer une catégorie", notes = "Cette méthode permet d'enregistrer ou modifier une catégorie)", response = CategoryDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "L'objet category créé ou modifié"),
            @ApiResponse(code = 400, message = "L'objet category n'est pas valide")
    })
    CategoryDto save(@RequestBody CategoryDto categoryDto);

    @GetMapping(value = CATEGORY_ENDPOINT + "/{idCategory}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Rechercher une catégorie par ID", notes = "Cette méthode permet de rechercher une catégorie par son ID)", response = CategoryDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "La catégorie a été trouvé dans la BDD"),
            @ApiResponse(code = 404, message = "Aucune catégorie n'existe dans la BDD avec l'ID fourni")
    })
    CategoryDto findById(@PathVariable("idCategory") Integer id);

    @GetMapping(value = CATEGORY_ENDPOINT + "/filter/{codeCategory}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Rechercher une catégorie par CODE", notes = "Cette méthode permet de rechercher une catégorie par son CODE)", response = CategoryDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "La catégorie a été trouvé dans la BDD"),
            @ApiResponse(code = 404, message = "Aucune catégorie n'existe dans la BDD avec l'ID fourni")
    })
    CategoryDto findByCode(@PathVariable("codeCategory") String code);

    @GetMapping(value = CATEGORY_ENDPOINT + "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Rechercher la liste de toutes les catégories", notes = "Cette méthode permet de rechercher la liste des catégories qui existent dans la BDD)", responseContainer = "List<CategoryDto>")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "La liste des catégories a été trouvée dans la BDD")
    })
    List<CategoryDto> findAll();

    @DeleteMapping(value = CATEGORY_ENDPOINT + "/delete/{idCategory}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Supprimer une catégorie par ID", notes = "Cette méthode permet de supprimer une catégorie par son ID)")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "La catégorie a été supprimée de la BDD")
    })
    void delete(@PathVariable("idCategory") Integer id);
}
