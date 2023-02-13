package com.tehjul.gestiondestock.controller.api;

import com.tehjul.gestiondestock.dto.VentesDto;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.tehjul.gestiondestock.utils.Constants.VENTES_ENDPOINT;

@Api(VENTES_ENDPOINT)
public interface VentesApi {

    @PostMapping(VENTES_ENDPOINT + "/create")
    VentesDto save(@RequestBody VentesDto dto);

    @GetMapping(VENTES_ENDPOINT + "/{id}")
    VentesDto findById(@PathVariable Integer id);

    @GetMapping(VENTES_ENDPOINT + "/filter/{code}")
    VentesDto findByCode(@PathVariable String code);

    @GetMapping(VENTES_ENDPOINT + "/all")
    List<VentesDto> findAll();

    @DeleteMapping(VENTES_ENDPOINT + "/delete/{id}")
    void delete(@PathVariable Integer id);
}
