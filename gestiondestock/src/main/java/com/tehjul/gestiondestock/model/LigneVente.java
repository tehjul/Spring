package com.tehjul.gestiondestock.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

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

    private BigDecimal quantite;
}
