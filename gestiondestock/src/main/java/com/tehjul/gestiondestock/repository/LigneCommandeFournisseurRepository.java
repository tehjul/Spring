package com.tehjul.gestiondestock.repository;

import com.tehjul.gestiondestock.model.LigneCommandeFournisseur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LigneCommandeFournisseurRepository extends JpaRepository<LigneCommandeFournisseur, Integer> {

    List<LigneCommandeFournisseur> findAllByCommandeFournisseurId(Integer idCommande);

    List<LigneCommandeFournisseur> findAllByArticleId(Integer idCommande);
}
