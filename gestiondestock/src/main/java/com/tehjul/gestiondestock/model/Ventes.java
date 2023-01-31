package com.tehjul.gestiondestock.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table
public class Ventes extends AbstractEntity {

    @Column
    private String code;

    @Column
    private Instant dateVente;

    @Column
    private String commentaire;
}
