package com.tehjul.gestiondestock.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table
public class Utilisateur extends AbstractEntity {

    @Column
    private String nom;

    @Column
    private String prenom;

    @Column
    private String email;

    @Column
    private Instant dateDeNaissance;

    @Column
    private String motDePasse;

    @Embedded
    private Adresse adresse;

    @Column
    private String photo;

    @ManyToOne
    @JoinColumn(name = "identreprise")
    private Entreprise entreprise;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "utilisateur")
    @JsonIgnore
    private List<Roles> roles;

}
