package com.tehjul.gestiondestock.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Embeddable
public class Adresse {

    @Column
    private String adresse1;

    @Column
    private String adresse2;

    @Column
    private String ville;

    @Column
    private String codePostal;

    @Column
    private String pays;
}
