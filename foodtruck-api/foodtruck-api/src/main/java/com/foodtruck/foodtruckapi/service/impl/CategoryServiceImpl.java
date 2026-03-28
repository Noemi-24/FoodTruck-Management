package com.foodtruck.foodtruckapi.service.impl;

import com.foodtruck.foodtruckapi.dto.request.CreateCategoryRequest;
import com.foodtruck.foodtruckapi.dto.request.UpdateCategoryRequest;
import com.foodtruck.foodtruckapi.dto.response.CategoryResponse;
import com.foodtruck.foodtruckapi.exception.ConflictException;
import com.foodtruck.foodtruckapi.exception.ResourceNotFoundException;
import com.foodtruck.foodtruckapi.entity.Category;
import com.foodtruck.foodtruckapi.mapper.CategoryMapper;
import com.foodtruck.foodtruckapi.repository.CategoryRepository;
import com.foodtruck.foodtruckapi.repository.ProductRepository;
import com.foodtruck.foodtruckapi.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryMapper::toCategoryResponse)
                .toList();
    }

    @Override
    public CategoryResponse getCategoryById(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
        return categoryMapper.toCategoryResponse(category);
    }

    @Override
    public CategoryResponse createCategory(CreateCategoryRequest request) {
        Category category = categoryMapper.toCategory(request);
        Category savedCategory = categoryRepository.save(category);
        return categoryMapper.toCategoryResponse(savedCategory);
    }

    @Override
    public CategoryResponse updateCategory(Integer id, UpdateCategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));

        if (request.getName() != null) {
            category.setName(request.getName());
        }

        Category updatedCategory = categoryRepository.save(category);
        return categoryMapper.toCategoryResponse(updatedCategory);
    }

    @Override
    public void deleteCategory(Integer id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category", "id", id);
        }

        if (productRepository.existsByCategoryCategoryId(id)) {
            throw new ConflictException("Cannot delete category with associated products");
        }

        categoryRepository.deleteById(id);
    }
}
