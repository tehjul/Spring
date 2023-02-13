package com.tehjul.gestiondestock.services.strategy;

import com.tehjul.gestiondestock.exception.ErrorCodes;
import com.tehjul.gestiondestock.exception.InvalidOperationException;
import lombok.Setter;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.InputStream;

@Service
public class StrategyPhotoContext {

    private BeanFactory beanFactory;
    private Strategy strategy;
    @Setter
    private String context;

    @Autowired
    public StrategyPhotoContext(BeanFactory beanFactory) {
        this.beanFactory = beanFactory;
    }

    public Object savePhoto(String context, Integer id, InputStream photo, String title) {
        determinContext(context);
        return strategy.savePhoto(id, photo, title);
    }

    private void determinContext(String context) {
        final String beanName = context + "Strategy";
        switch (context) {
            case "article":
                beanFactory.getBean(beanName, SaveArticlePhoto.class);
                break;
            case "client":
                beanFactory.getBean(beanName, SaveClientPhoto.class);
                break;
            case "entreprise":
                beanFactory.getBean(beanName, SaveEntreprisePhoto.class);
                break;
            case "fournisseur":
                beanFactory.getBean(beanName, SaveFournisseurPhoto.class);
                break;
            case "utilisateur":
                beanFactory.getBean(beanName, SaveUtilisateurPhoto.class);
                break;
            default:
                throw new InvalidOperationException("Contexte inconnu pour l'enregistrement de la photo", ErrorCodes.UNKNOWN_CONTEXT);
        }
    }

}
