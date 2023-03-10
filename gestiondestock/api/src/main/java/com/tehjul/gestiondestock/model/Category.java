package com.tehjul.gestiondestock.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "category")
public class Category extends AbstractEntity {

    @Column
    private String code;

    @Column
    private String designation;

    @Column
    private Integer idEntreprise;

    @OneToMany(mappedBy = "category")
    private List<Article> articles;

}
