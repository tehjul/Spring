package com.tehjul.gestiondestock.controller;

import com.tehjul.gestiondestock.controller.api.EntrepriseApi;
import com.tehjul.gestiondestock.dto.EntrepriseDto;
import com.tehjul.gestiondestock.services.EntrepriseService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class EntrepriseController implements EntrepriseApi {

    private final EntrepriseService entrepriseService;

    @Autowired
    public EntrepriseController(EntrepriseService entrepriseService) {
        this.entrepriseService = entrepriseService;
    }

    @Override
    public EntrepriseDto save(EntrepriseDto dto) {
        return entrepriseService.save(dto);
    }

    @Override
    public EntrepriseDto findById(Integer id) {
        return entrepriseService.findById(id);
    }

    @Override
    public List<EntrepriseDto> findAll() {
        return entrepriseService.findAll();
    }

    @Override
    public void delete(Integer id) {
        entrepriseService.delete(id);
    }
}
