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
@Table(name = "article")
public class Article extends AbstractEntity {

    @Column
    private String codeArticle;

    @Column
    private String designation;

    @Column
    private BigDecimal prixUnitaireHt;

    @Column
    private BigDecimal tauxTva;

    @Column
    private BigDecimal prixUnitaireTtc;

    @Column
    private String photo;

    @ManyToOne
    @JoinColumn(name="idcategory")
    private Category category;
}
