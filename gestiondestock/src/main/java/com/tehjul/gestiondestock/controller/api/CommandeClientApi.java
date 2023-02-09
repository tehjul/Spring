package com.tehjul.gestiondestock.controller.api;

import com.tehjul.gestiondestock.dto.CommandeClientDto;
import com.tehjul.gestiondestock.model.EtatCommande;
import io.swagger.annotations.Api;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

import static com.tehjul.gestiondestock.utils.Constants.COMMANDE_CLIENT_ENDPOINT;

@Api(COMMANDE_CLIENT_ENDPOINT)
public interface CommandeClientApi {

    @PostMapping(COMMANDE_CLIENT_ENDPOINT + "/create")
    ResponseEntity<CommandeClientDto> save(@RequestBody CommandeClientDto dto);

    @PatchMapping(COMMANDE_CLIENT_ENDPOINT + "/update/{idCommande}/{etatCommande}")
    ResponseEntity<CommandeClientDto> updateEtatCommande(@PathVariable Integer idCommande, @PathVariable EtatCommande etatCommande);

    @PatchMapping(COMMANDE_CLIENT_ENDPOINT + "/update/{idCommande}/{idLigneCommande}/{quantite}")
    ResponseEntity<CommandeClientDto> updateQuantiteCommande(@PathVariable Integer idCommande, @PathVariable Integer idLigneCommande, @PathVariable BigDecimal quantite);

    @GetMapping(COMMANDE_CLIENT_ENDPOINT + "/{idCommandeClient}")
    ResponseEntity<CommandeClientDto> findById(@PathVariable Integer idCommandeClient);

    @GetMapping(COMMANDE_CLIENT_ENDPOINT + "/filter/{codeCommandeClient}")
    ResponseEntity<CommandeClientDto> findByCode(@PathVariable("codeCommandeClient") String code);

    @GetMapping(COMMANDE_CLIENT_ENDPOINT + "/all")
    ResponseEntity<List<CommandeClientDto>> findAll();

    @DeleteMapping(COMMANDE_CLIENT_ENDPOINT + "/delete/{idCommandeClient}")
    ResponseEntity delete(@PathVariable("idCommandeClient") Integer id);
}
