package com.tehjul.gestiondestock.model;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table
public class MvtStk extends AbstractEntity {

    @Column
    private Instant dateMvt;

    @Column
    private BigDecimal quantite;

    @ManyToOne
    @JoinColumn(name = "idarticle")
    private Article article;

    @Column
    private TypeMvtStk typeMvt;

    @Column
    @Enumerated(EnumType.STRING)
    private SourceMvtStk sourceMvt;

    @Column
    private Integer idEntreprise;
}
