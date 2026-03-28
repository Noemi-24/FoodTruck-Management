package com.foodtruck.foodtruckapi.mapper;
import com.foodtruck.foodtruckapi.dto.request.CreateCategoryRequest;
import com.foodtruck.foodtruckapi.dto.response.CategoryResponse;
import com.foodtruck.foodtruckapi.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {
    public CategoryResponse toCategoryResponse(Category category) {
        CategoryResponse response = new CategoryResponse();
        response.setCategoryId(category.getCategoryId());
        response.setName(category.getName());

        return response;
    }

    public Category toCategory(CreateCategoryRequest request) {
        Category category = new Category();
        category.setName(request.getName());

        return category;
    }
}
