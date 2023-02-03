package com.tehjul.gestiondestock.controller;

import com.tehjul.gestiondestock.controller.api.UtilisateurApi;
import com.tehjul.gestiondestock.dto.UtilisateurDto;
import com.tehjul.gestiondestock.services.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class UtilisateurController implements UtilisateurApi {

    private final UtilisateurService utilisateurService;

    @Autowired
    public UtilisateurController(UtilisateurService utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    @Override
    public UtilisateurDto save(UtilisateurDto dto) {
        return utilisateurService.save(dto);
    }

    @Override
    public UtilisateurDto findById(Integer id) {
        return utilisateurService.findById(id);
    }

    @Override
    public UtilisateurDto findByEmail(String email) {
        return utilisateurService.findByEmail(email);
    }

    @Override
    public List<UtilisateurDto> findAll() {
        return utilisateurService.findAll();
    }

    @Override
    public void delete(Integer id) {
        utilisateurService.delete(id);
    }
}
