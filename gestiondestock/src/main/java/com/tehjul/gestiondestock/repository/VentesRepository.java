package com.tehjul.gestiondestock.repository;

import com.tehjul.gestiondestock.model.Ventes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VentesRepository extends JpaRepository<Ventes, Integer> {
}
