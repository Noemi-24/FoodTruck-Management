package com.foodtruck.foodtruckapi.service;

import com.foodtruck.foodtruckapi.dto.request.CreateCategoryRequest;
import com.foodtruck.foodtruckapi.dto.request.UpdateCategoryRequest;
import com.foodtruck.foodtruckapi.dto.response.CategoryResponse;
import com.foodtruck.foodtruckapi.entity.Category;

import java.util.List;

public interface CategoryService {
    CategoryResponse createCategory(CreateCategoryRequest request);
    CategoryResponse updateCategory(Integer id, UpdateCategoryRequest request);
    CategoryResponse getCategoryById(Integer id);
    List<CategoryResponse> getAllCategories();
    void deleteCategory(Integer id);
}
