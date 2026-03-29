package com.foodtruck.foodtruckapi.service;

import com.foodtruck.foodtruckapi.dto.request.CreateCategoryRequest;
import com.foodtruck.foodtruckapi.dto.request.UpdateCategoryRequest;
import com.foodtruck.foodtruckapi.dto.response.CategoryResponse;
import com.foodtruck.foodtruckapi.entity.Category;
import com.foodtruck.foodtruckapi.exception.ConflictException;
import com.foodtruck.foodtruckapi.exception.ResourceNotFoundException;
import com.foodtruck.foodtruckapi.mapper.CategoryMapper;
import com.foodtruck.foodtruckapi.repository.CategoryRepository;
import com.foodtruck.foodtruckapi.repository.ProductRepository;
import com.foodtruck.foodtruckapi.service.impl.CategoryServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceImplTest {
    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private CategoryMapper categoryMapper;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private CategoryServiceImpl categoryService;

    @Test
    void testCreateCategory_Success(){
        // ARRANGE
        CreateCategoryRequest request = new CreateCategoryRequest();
        request.setName("test");

        Category category = new Category();
        category.setCategoryId(1);
        category.setName("test");

        Category savedCategory = new Category();
        savedCategory.setCategoryId(1);
        savedCategory.setName("test");

        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setCategoryId(1);
        categoryResponse.setName("test");

        when(categoryMapper.toCategory(request)).thenReturn(category);
        when(categoryRepository.save(category)).thenReturn(savedCategory);
        when(categoryMapper.toCategoryResponse(savedCategory)).thenReturn(categoryResponse);

        // ACT
        CategoryResponse result = categoryService.createCategory(request);

        // ASSERT
        assertNotNull(result);
        assertEquals("test", result.getName());
        verify(categoryRepository).save(category);
    }

    @Test
    void testGetCategoryById_Success() {
        // ARRANGE
        Category category = new Category();
        category.setCategoryId(1);
        category.setName("test");

        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setCategoryId(1);
        categoryResponse.setName("test");

        when(categoryRepository.findById(1)).thenReturn(Optional.of(category));
        when(categoryMapper.toCategoryResponse(category)).thenReturn(categoryResponse);

        // ACT
        CategoryResponse result = categoryService.getCategoryById(1);

        // ASSERT
        assertNotNull(result);
        assertEquals("test", result.getName());
        verify(categoryRepository).findById(1);
    }

    @Test
    void testGetCategoryById_NotFound_ThrowsException() {
        // ARRANGE
        when(categoryRepository.findById(999)).thenReturn(Optional.empty());

        // ACT & ASSERT
        assertThrows(ResourceNotFoundException.class, () -> {
            categoryService.getCategoryById(999);
        });

        // VERIFY
        verify(categoryRepository).findById(999);
    }

    @Test
    void testGetAllCategories_Success(){
        // ARRANGE
        List<Category> categories = new ArrayList<>();
        Category category1 = new Category();
        category1.setCategoryId(1);
        category1.setName("test1");

        Category category2 = new Category();
        category2.setCategoryId(2);
        category2.setName("test2");

        categories.add(category1);
        categories.add(category2);

        List<CategoryResponse> categoryResponseList = new ArrayList<>();
        CategoryResponse categoryResponse1 = new CategoryResponse();
        categoryResponse1.setCategoryId(1);
        categoryResponse1.setName("test1");

        CategoryResponse categoryResponse2 = new CategoryResponse();
        categoryResponse2.setCategoryId(2);
        categoryResponse2.setName("test2");

        categoryResponseList.add(categoryResponse1);
        categoryResponseList.add(categoryResponse2);

        when(categoryRepository.findAll()).thenReturn(categories);
        when(categoryMapper.toCategoryResponse(category1)).thenReturn(categoryResponse1);
        when(categoryMapper.toCategoryResponse(category2)).thenReturn(categoryResponse2);

        // ACT
        List<CategoryResponse> result = categoryService.getAllCategories();

        // ASSERT
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("test1", result.get(0).getName());
        assertEquals("test2", result.get(1).getName());
        verify(categoryRepository).findAll();
    }

    @Test
    void testUpdateCategory_Success(){
        // ARRANGE
        Category category = new Category();
        category.setCategoryId(1);
        category.setName("test1");

        UpdateCategoryRequest request = new UpdateCategoryRequest();
        request.setName("updated");

        Category updatedCategory = new Category();
        updatedCategory.setCategoryId(1);
        updatedCategory.setName("updated");

        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setCategoryId(1);
        categoryResponse.setName("updated");

        when(categoryRepository.findById(1)).thenReturn(Optional.of(category));
        when(categoryRepository.save(any(Category.class))).thenReturn(updatedCategory);
        when(categoryMapper.toCategoryResponse(updatedCategory)).thenReturn(categoryResponse);

        // ACT
        CategoryResponse result = categoryService.updateCategory(1, request);

        // ASSERT
        assertNotNull(result);
        assertEquals("updated", result.getName());
        verify(categoryRepository).findById(1);
        verify(categoryRepository).save(any(Category.class));

    }

    @Test
    void testDeleteCategory_Success(){
        // ARRANGE
        Category category = new Category();
        category.setCategoryId(1);

        when(categoryRepository.existsById(1)).thenReturn(true);
        when(productRepository.existsByCategoryCategoryId(1)).thenReturn(false);

        // ACT
        categoryService.deleteCategory(1);

        // VERIFY
        verify(categoryRepository).existsById(1);
        verify(productRepository).existsByCategoryCategoryId(1);
        verify(categoryRepository).deleteById(1);
    }

    @Test
    void testDeleteCategory_WithProducts_ThrowsException(){
        // ARRANGE
        Category category = new Category();
        category.setCategoryId(1);

        when(categoryRepository.existsById(1)).thenReturn(true);
        when(productRepository.existsByCategoryCategoryId(1)).thenReturn(true);

        // ACT & ASSERT
        assertThrows(ConflictException.class , () -> { categoryService.deleteCategory(1);});

        // VERIFY
        verify(categoryRepository).existsById(1);
    }

    @Test
    void testDeleteCategory_NotFound_ThrowsException() {
        // ARRANGE
        when(categoryRepository.existsById(999)).thenReturn(false);

        // ACT & ASSERT
        assertThrows(ResourceNotFoundException.class, () -> {
            categoryService.deleteCategory(999);
        });

        // VERIFY
        verify(categoryRepository).existsById(999);
        verify(productRepository, never()).existsByCategoryCategoryId(anyInt());
        verify(categoryRepository, never()).deleteById(anyInt());
    }
}
