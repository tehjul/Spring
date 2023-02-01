package com.tehjul.gestiondestock.repository;

import com.tehjul.gestiondestock.model.LigneVente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LigneVenteRepository extends JpaRepository<LigneVente, Integer> {
}
