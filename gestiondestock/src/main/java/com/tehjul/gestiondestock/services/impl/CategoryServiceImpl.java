package com.tehjul.gestiondestock.services.impl;

import com.tehjul.gestiondestock.dto.CategoryDto;
import com.tehjul.gestiondestock.exception.EntityNotFoundException;
import com.tehjul.gestiondestock.exception.ErrorCodes;
import com.tehjul.gestiondestock.exception.InvalidEntityException;
import com.tehjul.gestiondestock.model.Category;
import com.tehjul.gestiondestock.repository.CategoryRepository;
import com.tehjul.gestiondestock.services.CategoryService;
import com.tehjul.gestiondestock.validator.CategoryValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public CategoryDto save(CategoryDto categoryDto) {
        List<String> errors = CategoryValidator.validate(categoryDto);
        if (!errors.isEmpty()) {
            log.error("Category is not valid {}", categoryDto);
            throw new InvalidEntityException("La categorie n'est pas valide", ErrorCodes.CATEGORY_NOT_VALID, errors);
        }
        return CategoryDto.fromEntity(
                categoryRepository.save(
                        CategoryDto.toEntity(categoryDto)
                )
        );
    }

    @Override
    public CategoryDto findById(Integer id) {
        if (id == null) {
            log.error("Category ID is null");
            return null;
        }
        return categoryRepository.findById(id)
                .map(CategoryDto::fromEntity)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Aucune catégorie avec l'ID " + id + " n'a été trouvée dans la BDD",
                        ErrorCodes.CATEGORY_NOT_FOUND)
                );
    }

    @Override
    public CategoryDto findByCode(String code) {
        if (!StringUtils.hasLength(code)) {
            log.error("Category CODE is null");
            return null;
        }
        Optional<Category> category = categoryRepository.findCategoryByCode(code);
        CategoryDto dto = CategoryDto.fromEntity(category.get());
        return Optional.of(dto).orElseThrow(() ->
                new EntityNotFoundException(
                        "Aucune catégorie avec le code " + code + " n'a été trouvée dans la BDD",
                        ErrorCodes.CATEGORY_NOT_FOUND
                )
        );
    }

    @Override
    public List<CategoryDto> findAll() {
        return categoryRepository.findAll().stream()
                .map(CategoryDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Integer id) {
        if (id == null) {
            log.error("Category ID is null");
            return;
        }
        categoryRepository.deleteById(id);
    }
}
