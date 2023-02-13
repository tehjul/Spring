package com.tehjul.gestiondestock.model;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "lignevente")
public class LigneVente extends AbstractEntity {

    @ManyToOne
    @JoinColumn(name = "idvente")
    private Ventes ventes;

    @ManyToOne
    @JoinColumn(name = "idarticle")
    private Article article;

    @Column
    private BigDecimal quantite;

    @Column
    private BigDecimal prixUnitaire;

    @Column
    private Integer idEntreprise;
}
