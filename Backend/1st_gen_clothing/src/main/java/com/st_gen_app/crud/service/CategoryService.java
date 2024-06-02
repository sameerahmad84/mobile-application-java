package com.st_gen_app.crud.service;

import com.st_gen_app.crud.entity.Category;
import com.st_gen_app.crud.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(Integer categoryId) {
        return categoryRepository.findById(categoryId);
    }

    public String deleteCategory(Integer categoryId) {
        categoryRepository.deleteById(categoryId);
        return "Category Removed !! " + categoryId;
    }

    public Category updateCategory(Category category) {
        Category existingCategory = categoryRepository.getById(category.getCategoryId());
        existingCategory.setName(category.getName());

        return categoryRepository.save(existingCategory);
    }
}