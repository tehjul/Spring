package com.tehjul.gestiondestock.controller.api;

import com.tehjul.gestiondestock.dto.ClientDto;
import io.swagger.annotations.Api;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.tehjul.gestiondestock.utils.Constants.CLIENT_ENDPOINT;

@Api("clients")
public interface ClientApi {

    @PostMapping(value = CLIENT_ENDPOINT + "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    ClientDto save(@RequestBody ClientDto dto);

    @GetMapping(value = CLIENT_ENDPOINT + "/{idClient}", produces = MediaType.APPLICATION_JSON_VALUE)
    ClientDto findById(@PathVariable("idClient") Integer id);

    @GetMapping(value = CLIENT_ENDPOINT + "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    List<ClientDto> findAll();

    @DeleteMapping(value = CLIENT_ENDPOINT + "/delete/{idClient}")
    void delete(@PathVariable("idClient") Integer id);
}
