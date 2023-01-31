package com.tehjul.gestiondestock.model;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "entreprise")
public class Entreprise extends AbstractEntity {

    @Column
    private String nom;

    @Column
    private String description;

    @Embedded
    private Adresse adresse;

    @Column
    private String codeFiscal;

    @Column
    private String photo;

    @Column
    private String email;

    @Column
    private String numTel;

    @Column
    private String siteWeb;

    @OneToMany(mappedBy = "entreprise")
    private List<Utilisateur> utilisateurs;
}
