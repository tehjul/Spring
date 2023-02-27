package com.tehjul.gestiondestock.services.impl;

import com.tehjul.gestiondestock.dto.*;
import com.tehjul.gestiondestock.exception.EntityNotFoundException;
import com.tehjul.gestiondestock.exception.ErrorCodes;
import com.tehjul.gestiondestock.exception.InvalidEntityException;
import com.tehjul.gestiondestock.exception.InvalidOperationException;
import com.tehjul.gestiondestock.model.*;
import com.tehjul.gestiondestock.repository.ArticleRepository;
import com.tehjul.gestiondestock.repository.ClientRepository;
import com.tehjul.gestiondestock.repository.CommandeClientRepository;
import com.tehjul.gestiondestock.repository.LigneCommandeClientRepository;
import com.tehjul.gestiondestock.services.CommandeClientService;
import com.tehjul.gestiondestock.services.MvtStkService;
import com.tehjul.gestiondestock.validator.ArticleValidator;
import com.tehjul.gestiondestock.validator.CommandeClientValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CommandeClientServiceImpl implements CommandeClientService {

    private final CommandeClientRepository commandeClientRepository;
    private final LigneCommandeClientRepository ligneCommandeClientRepository;
    private final ClientRepository clientRepository;
    private final ArticleRepository articleRepository;
    private final MvtStkService mvtStkService;

    @Autowired
    public CommandeClientServiceImpl(CommandeClientRepository commandeClientRepository, LigneCommandeClientRepository ligneCommandeClientRepository, ClientRepository clientRepository, ArticleRepository articleRepository, MvtStkService mvtStkService) {
        this.commandeClientRepository = commandeClientRepository;
        this.ligneCommandeClientRepository = ligneCommandeClientRepository;
        this.clientRepository = clientRepository;
        this.articleRepository = articleRepository;
        this.mvtStkService = mvtStkService;
    }

    @Override
    public CommandeClientDto save(CommandeClientDto dto) {
        List<String> errors = CommandeClientValidator.validate(dto);
        if (!errors.isEmpty()) {
            log.error("Commande client n'est pas valide");
            throw new InvalidEntityException("La commande client n'est pas valide", ErrorCodes.COMMANDE_CLIENT_NOT_VALID, errors);
        }

        if (dto.getId() != null && dto.isCommandeLivree()) {
            throw new InvalidOperationException("Impossible de modifier la commande lorsqu'elle est livrée", ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
        }

        Optional<Client> client = clientRepository.findById(dto.getClient().getId());
        if (client.isEmpty()) {
            log.warn("Client with ID {} was not found in the database", dto.getClient().getId());
            throw new EntityNotFoundException("Aucun client avec l'ID " + dto.getClient().getId() + " n'a été trouvé dans la BDD", ErrorCodes.CLIENT_NOT_FOUND);
        }

        List<String> articleErrors = new ArrayList<>();

        if (dto.getLigneCommandeClients() != null) {
            dto.getLigneCommandeClients().forEach(ligne -> {
                if (ligne.getArticle() != null) {
                    Optional<Article> article = articleRepository.findById(ligne.getArticle().getId());
                    if (article.isEmpty()) {
                        articleErrors.add("L'article avec l'id " + ligne.getArticle().getId() + " n'existe pas");
                    }
                } else {
                    articleErrors.add("Impossible d'enregistrer une commande avec un article NULL");
                }
            });
        }

        if (!articleErrors.isEmpty()) {
            log.warn("");
            throw new InvalidEntityException("Article n'existe pas dans la BDD", ErrorCodes.ARTICLE_NOT_FOUND, articleErrors);
        }
        dto.setDateCommande(Instant.now());
        CommandeClient savedCommandeClient = commandeClientRepository.save(CommandeClientDto.toEntity(dto));

        if (dto.getLigneCommandeClients() != null) {
            dto.getLigneCommandeClients().forEach(ligne -> {
                LigneCommandeClient ligneCommandeClient = LigneCommandeClientDto.toEntity(ligne);
                ligneCommandeClient.setCommandeClient(savedCommandeClient);
                ligneCommandeClient.setIdEntreprise(dto.getIdEntreprise());
                LigneCommandeClient savedLigneCmd = ligneCommandeClientRepository.save(ligneCommandeClient);

                effectuerSortie(savedLigneCmd);
            });
        }

        return CommandeClientDto.fromEntity(savedCommandeClient);
    }

    @Override
    public CommandeClientDto updateEtatCommande(Integer idCommande, EtatCommande etatCommande) {
        checkIdCommande(idCommande);
        if (!StringUtils.hasLength(String.valueOf(etatCommande))) {
            log.error("L'état de la commande client is NULL");
            throw new InvalidOperationException("Impossible de modifier l'état de la commande avec un etat null", ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
        }

        CommandeClientDto commandeClient = checkEtatCommande(idCommande);

        commandeClient.setEtatCommande(etatCommande);

        CommandeClient savedCmdClient = commandeClientRepository.save(CommandeClientDto.toEntity(commandeClient));
        if (commandeClient.isCommandeLivree()) {
            updateMvtStk(idCommande);
        }
        return CommandeClientDto.fromEntity(savedCmdClient);
    }

    @Override
    public CommandeClientDto updateQuantiteCommande(Integer idCommande, Integer idLigneCommande, BigDecimal quantite) {
        checkIdCommande(idCommande);
        checkIdLigneCommande(idLigneCommande);
        if (quantite == null || quantite.compareTo(BigDecimal.ZERO) == 0) {
            log.error("quantité null ou zéro");
            throw new InvalidOperationException("Impossible de modifier l'état de la commande avec un quantité null ou zéro", ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
        }
        CommandeClientDto commandeClient = checkEtatCommande(idCommande);

        Optional<LigneCommandeClient> ligneCommandeClientOptional = findLigneCommandeClient(idLigneCommande);

        LigneCommandeClient ligneCommandeClient = ligneCommandeClientOptional.get();
        ligneCommandeClient.setQuantite(quantite);
        ligneCommandeClientRepository.save(ligneCommandeClient);

        return commandeClient;
    }

    @Override
    public CommandeClientDto updateClient(Integer idCommande, Integer idClient) {
        checkIdCommande(idCommande);
        if (idClient == null) {
            log.error("Client ID is NULL");
            throw new InvalidOperationException("Impossible de modifier l'état de la commande avec un ID client null", ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
        }

        CommandeClientDto commandeClient = checkEtatCommande(idCommande);

        Optional<Client> clientOptional = clientRepository.findById(idClient);
        if (clientOptional.isEmpty()) {
            throw new EntityNotFoundException("Aucun client n'a été trouvée avec l'ID " + idClient, ErrorCodes.CLIENT_NOT_FOUND);
        }

        commandeClient.setClient(ClientDto.fromEntity(clientOptional.get()));

        return CommandeClientDto.fromEntity(
                commandeClientRepository.save(
                        CommandeClientDto.toEntity(commandeClient)
                )
        );
    }

    @Override
    public CommandeClientDto updateArticle(Integer idCommande, Integer idLigneCommande, Integer idArticle) {
        checkIdCommande(idCommande);
        checkIdLigneCommande(idLigneCommande);
        checkIdArticle(idArticle, "nouvel");

        CommandeClientDto commandeClientDto = checkEtatCommande(idCommande);

        Optional<LigneCommandeClient> ligneCommandeClient = findLigneCommandeClient(idLigneCommande);

        Optional<Article> articleOptional = articleRepository.findById(idArticle);
        if (articleOptional.isEmpty()) {
            throw new EntityNotFoundException("Aucune article n'a été trouvée avec l'ID " + idArticle, ErrorCodes.ARTICLE_NOT_FOUND);
        }

        List<String> errors = ArticleValidator.validate(ArticleDto.fromEntity(articleOptional.get()));
        if (!errors.isEmpty()) {
            throw new InvalidEntityException("Article invalide", ErrorCodes.ARTICLE_NOT_VALID, errors);
        }

        LigneCommandeClient ligneCommandeClientToSaved = ligneCommandeClient.get();
        ligneCommandeClientToSaved.setArticle(articleOptional.get());
        ligneCommandeClientRepository.save(ligneCommandeClientToSaved);

        return commandeClientDto;
    }

    @Override
    public CommandeClientDto deleteArticle(Integer idCommande, Integer idLigneCommande) {
        checkIdCommande(idCommande);
        checkIdLigneCommande(idLigneCommande);

        CommandeClientDto commandeClientDto = checkEtatCommande(idCommande);

        // Just to check LigneCommandeClient and inform the client in case it is absent
        findLigneCommandeClient(idLigneCommande);
        ligneCommandeClientRepository.deleteById(idLigneCommande);

        return commandeClientDto;
    }

    @Override
    public CommandeClientDto findById(Integer id) {
        if (id == null) {
            log.error("Commande client ID is NULL");
            return null;
        }
        return commandeClientRepository.findById(id)
                .map(CommandeClientDto::fromEntity)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Aucune commande client n'a été trouvée avec l'id " + id + " dans la BDD", ErrorCodes.COMMANDE_CLIENT_NOT_FOUND
                ));
    }

    @Override
    public CommandeClientDto findByCode(String code) {
        if (!StringUtils.hasLength(code)) {
            log.error("Commande client CODE is NULL");
            return null;
        }
        return commandeClientRepository.findCommandeClientByCode(code)
                .map(CommandeClientDto::fromEntity)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Aucune commande client n'a été trouvée avec le code " + code + " dans la BDD", ErrorCodes.COMMANDE_CLIENT_NOT_FOUND
                ));
    }

    @Override
    public List<CommandeClientDto> findAll() {
        return commandeClientRepository.findAll().stream()
                .map(CommandeClientDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<LigneCommandeClientDto> findAllLignesCommandesClientByCommandeClientId(Integer idCommande) {
        return ligneCommandeClientRepository.findAllByCommandeClientId(idCommande).stream()
                .map(LigneCommandeClientDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Integer id) {
        if (id == null) {
            log.error("Commande client ID is NULL");
            return;
        }
        List<LigneCommandeClient> ligneCommandeClients = ligneCommandeClientRepository.findAllByCommandeClientId(id);
        if (!ligneCommandeClients.isEmpty()) {
            throw new InvalidOperationException("Impossible de supprimer une commande client déjà utilisée", ErrorCodes.COMMANDE_CLIENT_ALREADY_IN_USE);
        }
        commandeClientRepository.deleteById(id);
    }

    private void checkIdCommande(Integer idCommande) {
        if (idCommande == null) {
            log.error("Commande client ID is NULL");
            throw new InvalidOperationException("Impossible de modifier l'état de la commande avec un ID null", ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
        }
    }

    private void checkIdLigneCommande(Integer idLigneCommande) {
        if (idLigneCommande == null) {
            log.error("Ligne commande ID is NULL");
            throw new InvalidOperationException("Impossible de modifier l'état de la commande avec un ID ligne commande null", ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
        }
    }

    private void checkIdArticle(Integer idArticle, String message) {
        if (idArticle == null) {
            log.error("Article ID is NULL");
            throw new InvalidOperationException("Impossible de modifier l'état de la commande avec un " + message + " ID article null", ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
        }
    }

    private CommandeClientDto checkEtatCommande(Integer idCommande) {
        CommandeClientDto commandeClient = findById(idCommande);
        if (commandeClient.isCommandeLivree()) {
            throw new InvalidOperationException("Impossible de modifier la commande lorsqu'elle est livrée", ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
        }
        return commandeClient;
    }

    private Optional<LigneCommandeClient> findLigneCommandeClient(Integer idLigneCommande) {
        Optional<LigneCommandeClient> ligneCommandeClientOptional = ligneCommandeClientRepository.findById(idLigneCommande);
        if (ligneCommandeClientOptional.isEmpty()) {
            throw new EntityNotFoundException("Aucune ligne commande client n'a été trouvée avec l'ID " + idLigneCommande, ErrorCodes.LIGNE_COMMANDE_CLIENT_NOT_FOUND);
        }
        return ligneCommandeClientOptional;
    }

    private void updateMvtStk(Integer idCommande) {
        List<LigneCommandeClient> ligneCommandeClients = ligneCommandeClientRepository.findAllByCommandeClientId(idCommande);
        ligneCommandeClients.forEach(lig -> {
            MvtStkDto mvtStkDto = MvtStkDto.builder()
                    .article(ArticleDto.fromEntity(lig.getArticle()))
                    .dateMvt(Instant.now())
                    .typeMvt(TypeMvtStk.SORTIE)
                    .sourceMvt(SourceMvtStk.COMMANDE_CLIENT)
                    .quantite(lig.getQuantite())
                    .idEntreprise(lig.getIdEntreprise())
                    .build();
            mvtStkService.sortieStock(mvtStkDto);
        });
    }


    private void effectuerSortie(LigneCommandeClient ligne) {
        MvtStkDto mvtStkDto = MvtStkDto.builder()
                .article(ArticleDto.fromEntity(ligne.getArticle()))
                .dateMvt(Instant.now())
                .typeMvt(TypeMvtStk.SORTIE)
                .sourceMvt(SourceMvtStk.COMMANDE_CLIENT)
                .quantite(ligne.getQuantite())
                .idEntreprise(ligne.getIdEntreprise())
                .build();
        mvtStkService.sortieStock(mvtStkDto);
    }
}
