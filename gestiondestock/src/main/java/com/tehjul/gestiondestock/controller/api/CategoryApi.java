package com.tehjul.gestiondestock.controller.api;

import com.tehjul.gestiondestock.dto.CategoryDto;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.tehjul.gestiondestock.utils.Constants.APP_ROOT;

@RestController
public interface CategoryApi {

    @PostMapping(value = APP_ROOT + "/categories/save", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    CategoryDto save(@RequestBody CategoryDto categoryDto);

    @GetMapping(value = APP_ROOT + "/categories/{idCategory}", produces = MediaType.APPLICATION_JSON_VALUE)
    CategoryDto findById(@PathVariable("idCategory") Integer id);

    @GetMapping(value = APP_ROOT + "/categories/filter/{codeCategory}", produces = MediaType.APPLICATION_JSON_VALUE)
    CategoryDto findByCode(@PathVariable("codeCategory") String code);

    @GetMapping(value = APP_ROOT + "/categories/all", produces = MediaType.APPLICATION_JSON_VALUE)
    List<CategoryDto> findAll();

    @DeleteMapping(value = APP_ROOT + "/categories/delete/{idCategory}", produces = MediaType.APPLICATION_JSON_VALUE)
    void delete(@PathVariable("idCategory") Integer id);
}
