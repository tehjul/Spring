package com.tehjul.gestiondestock.services.impl;

import com.tehjul.gestiondestock.dto.ArticleDto;
import com.tehjul.gestiondestock.dto.LigneVenteDto;
import com.tehjul.gestiondestock.dto.MvtStkDto;
import com.tehjul.gestiondestock.dto.VentesDto;
import com.tehjul.gestiondestock.exception.EntityNotFoundException;
import com.tehjul.gestiondestock.exception.ErrorCodes;
import com.tehjul.gestiondestock.exception.InvalidEntityException;
import com.tehjul.gestiondestock.exception.InvalidOperationException;
import com.tehjul.gestiondestock.model.*;
import com.tehjul.gestiondestock.repository.ArticleRepository;
import com.tehjul.gestiondestock.repository.LigneVenteRepository;
import com.tehjul.gestiondestock.repository.VentesRepository;
import com.tehjul.gestiondestock.services.MvtStkService;
import com.tehjul.gestiondestock.services.VentesService;
import com.tehjul.gestiondestock.validator.VentesValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class VentesServiceImpl implements VentesService {

    private final ArticleRepository articleRepository;
    private final VentesRepository ventesRepository;
    private final LigneVenteRepository ligneVenteRepository;
    private final MvtStkService mvtStkService;

    @Autowired
    public VentesServiceImpl(ArticleRepository articleRepository, VentesRepository ventesRepository, LigneVenteRepository ligneVenteRepository, MvtStkService mvtStkService) {
        this.articleRepository = articleRepository;
        this.ventesRepository = ventesRepository;
        this.ligneVenteRepository = ligneVenteRepository;
        this.mvtStkService = mvtStkService;
    }

    @Override
    public VentesDto save(VentesDto dto) {
        List<String> errors = VentesValidator.validate(dto);
        if (!errors.isEmpty()) {
            log.error("Ventes n'est pas valide");
            throw new InvalidEntityException("L'objet vente n'est pas valide", ErrorCodes.VENTE_NOT_VALID, errors);
        }

        List<String> articleErrors = new ArrayList<>();
        dto.getLigneVentes().forEach(ligne -> {
            Optional<Article> article = articleRepository.findById(ligne.getArticle().getId());
            if (article.isEmpty()) {
                articleErrors.add("Aucun article avec l'id " + ligne.getArticle().getId() + " n'a été trouvé dans la BDD");
            }
        });

        if (!articleErrors.isEmpty()) {
            log.error("One or more articles were not found int the DB, {}", errors);
            throw new InvalidEntityException("Un ou plusieurs articles n'ont pas été trouvés dans la BDD", ErrorCodes.VENTE_NOT_VALID, errors);
        }

        Ventes savedVentes = ventesRepository.save(VentesDto.toEntity(dto));

        dto.getLigneVentes().forEach(ligne -> {
            LigneVente ligneVente = LigneVenteDto.toEntity(ligne);
            ligneVente.setVentes(savedVentes);
            ligneVenteRepository.save(ligneVente);
            updateMvtStk(ligneVente);
        });

        return VentesDto.fromEntity(savedVentes);
    }

    @Override
    public VentesDto findById(Integer id) {
        if (id == null) {
            log.error("Ventes ID is NULL");
            return null;
        }
        return ventesRepository.findById(id)
                .map(VentesDto::fromEntity)
                .orElseThrow(() -> new EntityNotFoundException("Aucune vente n'a été trouvée dans la BDD", ErrorCodes.VENTE_NOT_FOUND));
    }

    @Override
    public VentesDto findByCode(String code) {
        if (!StringUtils.hasLength(code)) {
            log.error("Ventes CODE is NULL");
            return null;
        }
        return ventesRepository.findVentesByCode(code)
                .map(VentesDto::fromEntity)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Aucune vente n'a été trouvée avec le CODE " + code, ErrorCodes.VENTE_NOT_FOUND
                ));
    }

    @Override
    public List<VentesDto> findAll() {
        return ventesRepository.findAll().stream()
                .map(VentesDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Integer id) {
        if (id == null) {
            log.error("Ventes ID is NULL");
            return;
        }
        List<LigneVente> ligneVentes = ligneVenteRepository.findAllByVentesId(id);
        if (!ligneVentes.isEmpty()) {
            throw new InvalidOperationException("Impossible de supprimer une vente déjà utilisée", ErrorCodes.VENTE_ALREADY_IN_USE);
        }
        ventesRepository.deleteById(id);
    }

    private void updateMvtStk(LigneVente lig) {
        MvtStkDto mvtStkDto = MvtStkDto.builder()
                .article(ArticleDto.fromEntity(lig.getArticle()))
                .dateMvt(Instant.now())
                .typeMvt(TypeMvtStk.SORTIE)
                .sourceMvt(SourceMvtStk.VENTE)
                .quantite(lig.getQuantite())
                .idEntreprise(lig.getIdEntreprise())
                .build();
        mvtStkService.sortieStock(mvtStkDto);
    }
}
