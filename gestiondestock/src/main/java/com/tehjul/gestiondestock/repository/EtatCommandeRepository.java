package com.tehjul.gestiondestock.repository;

import com.tehjul.gestiondestock.model.EtatCommande;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EtatCommandeRepository extends JpaRepository<Integer, EtatCommande> {
}
