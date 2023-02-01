package com.tehjul.gestiondestock.repository;

import com.tehjul.gestiondestock.model.MvtStk;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MvtStkRepository extends JpaRepository<MvtStk, Integer> {
}
