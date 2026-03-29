package com.foodtruck.foodtruckapi.service;
import com.foodtruck.foodtruckapi.dto.request.CreateProductRequest;
import com.foodtruck.foodtruckapi.dto.request.UpdateProductRequest;
import com.foodtruck.foodtruckapi.dto.response.ProductResponse;
import com.foodtruck.foodtruckapi.entity.Category;
import com.foodtruck.foodtruckapi.entity.Product;
import com.foodtruck.foodtruckapi.exception.ResourceNotFoundException;
import com.foodtruck.foodtruckapi.mapper.ProductMapper;
import com.foodtruck.foodtruckapi.repository.CategoryRepository;
import com.foodtruck.foodtruckapi.repository.ProductRepository;
import com.foodtruck.foodtruckapi.service.impl.ProductServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductServiceImplTest {
    @Mock
    private ProductRepository productRepository;

    @Mock
    private ProductMapper productMapper;

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private ProductServiceImpl productService;
    
    @Test
    void testCreateProduct_Success(){
        // ARRANGE
        CreateProductRequest request = new CreateProductRequest();
        request.setCategoryId(1);
        request.setName("test product");
        request.setDescription("test product");
        request.setPrice(BigDecimal.valueOf(10.99));
        request.setIsSpecial(true);

        Category category = new Category();
        category.setCategoryId(1);
        category.setName("test category");

        Product product = new Product();
        product.setCategory(category);
        product.setName("test product");
        product.setDescription("test description");
        product.setPrice(BigDecimal.valueOf(10.99));
        product.setIsSpecial(true);
        product.setAvailable(true);
        
        Product savedProduct= new Product();
        savedProduct.setProductId(1);
        savedProduct.setName("test product");
        savedProduct.setDescription("test product");
        savedProduct.setPrice(BigDecimal.valueOf(10.99));
        savedProduct.setIsSpecial(true);
        savedProduct.setAvailable(true);

        ProductResponse productResponse = new ProductResponse();
        productResponse.setProductId(1);
        productResponse.setCategoryId(1);
        productResponse.setCategoryName("test product");
        productResponse.setName("test product");
        productResponse.setDescription("test product");
        productResponse.setPrice(BigDecimal.valueOf(10.99));
        productResponse.setIsSpecial(true);
        productResponse.setAvailable(true);

        when(categoryRepository.findById(1)).thenReturn(Optional.of(category));
        when(productMapper.toProduct(request, category)).thenReturn(product);
        when(productRepository.save(any(Product.class))).thenReturn(savedProduct);
        when(productMapper.toProductResponse(savedProduct)).thenReturn(productResponse);

        // ACT
        ProductResponse result = productService.createProduct(request);

        // ASSERT
        assertNotNull(result);
        assertEquals("test product", result.getName());
        assertEquals("test product", result.getDescription());
        assertEquals(BigDecimal.valueOf(10.99), result.getPrice());
        assertEquals(true, result.getIsSpecial());
        assertEquals(true, result.getAvailable());
        verify(categoryRepository).findById(1);
        verify(productMapper).toProduct(request, category);
        verify(productRepository).save(any(Product.class));
        verify(productMapper).toProductResponse(savedProduct);
        
    }

    @Test
    void testGetProductById_Success(){
        // ARRANGE
        Category category = new Category();
        category.setCategoryId(2);
        category.setName("test category1");

        Product product = new Product();
        product.setCategory(category);
        product.setName("test product1");
        product.setDescription("test description1");
        product.setPrice(BigDecimal.valueOf(15.99));
        product.setIsSpecial(true);
        product.setAvailable(true);

        ProductResponse productResponse = new ProductResponse();
        productResponse.setProductId(1);
        productResponse.setCategoryId(2);
        productResponse.setCategoryName("test product1");
        productResponse.setName("test product1");
        productResponse.setDescription("test product1");
        productResponse.setPrice(BigDecimal.valueOf(15.99));
        productResponse.setIsSpecial(true);
        productResponse.setAvailable(true);

        when(productRepository.findById(1)).thenReturn(Optional.of(product));
        when(productMapper.toProductResponse(product)).thenReturn(productResponse);

        // ACT
        ProductResponse result = productService.getProductById(1);

        // ASSERT
        assertNotNull(result);
        assertEquals("test product1", result.getName());
        assertEquals("test product1", result.getDescription());
        assertEquals(BigDecimal.valueOf(15.99), result.getPrice());
        assertEquals(true, result.getIsSpecial());
        assertEquals(true, result.getAvailable());
        verify(productRepository).findById(1);
        verify(productMapper).toProductResponse(product);

    }

    @Test
    void testGetProductById_NotFound_ThrowsException(){
        // ARRANGE
        when(productRepository.findById(999)).thenReturn(Optional.empty());

        // ACT & ASSERT
        assertThrows(ResourceNotFoundException.class, () -> productService.getProductById(999));

        // VERIFY
        verify(productRepository).findById(999);
    }

    @Test
    void testUpdateProductAvailability_Success(){
        // ARRANGE
        Category category = new Category();
        category.setCategoryId(3);
        category.setName("test category2");

        Product product = new Product();
        product.setProductId(3);
        product.setCategory(category);
        product.setName("test product2");
        product.setDescription("test description1");
        product.setPrice(BigDecimal.valueOf(15.99));
        product.setIsSpecial(true);
        product.setAvailable(true);

        Product updatedProduct = new Product();
        updatedProduct.setProductId(3);
        updatedProduct.setCategory(category);
        updatedProduct.setName("test product2");
        updatedProduct.setDescription("test description2");
        updatedProduct.setPrice(BigDecimal.valueOf(15.99));
        updatedProduct.setIsSpecial(true);
        updatedProduct.setAvailable(false);

        ProductResponse productResponse = new ProductResponse();
        productResponse.setProductId(3);
        productResponse.setCategoryId(3);
        productResponse.setCategoryName("test product2");
        productResponse.setName("test product2");
        productResponse.setDescription("test product2");
        productResponse.setPrice(BigDecimal.valueOf(15.99));
        productResponse.setIsSpecial(true);
        productResponse.setAvailable(false);

        when(productRepository.findById(3)).thenReturn(Optional.of(product));
        when(productRepository.save(any(Product.class))).thenReturn(updatedProduct);
        when(productMapper.toProductResponse(updatedProduct)).thenReturn(productResponse);

        // ACT
        ProductResponse result = productService.updateProductAvailability(3, false);

        // ASSERT & VERIFY
        assertEquals(false, result.getAvailable());
    }

    @Test
    void testGetAllProducts_Success(){
        // ARRANGE
        Category category = new Category();
        category.setCategoryId(4);
        category.setName("test category3");

        List<Product> products = new ArrayList<>();
        Product product1 = new Product();
        product1.setProductId(1);
        product1.setCategory(category);
        product1.setName("test product1");
        product1.setDescription("test product1");
        product1.setPrice(BigDecimal.valueOf(15.99));
        product1.setIsSpecial(true);
        product1.setAvailable(true);

        Product product2 = new Product();
        product2.setProductId(2);
        product2.setCategory(category);
        product2.setName("test product2");
        product2.setDescription("test product2");
        product2.setPrice(BigDecimal.valueOf(15.99));
        product2.setIsSpecial(true);
        product2.setAvailable(false);

        products.add(product1);
        products.add(product2);

        List<ProductResponse> productResponseList = new ArrayList<>();
        ProductResponse productResponse1 = new ProductResponse();
        productResponse1.setProductId(1);
        productResponse1.setCategoryId(4);
        productResponse1.setCategoryName("test product1");
        productResponse1.setName("test product1");
        productResponse1.setDescription("test product1");
        productResponse1.setPrice(BigDecimal.valueOf(15.99));
        productResponse1.setIsSpecial(true);
        productResponse1.setAvailable(false);

        ProductResponse productResponse2 = new ProductResponse();
        productResponse2.setProductId(2);
        productResponse2.setCategoryId(4);
        productResponse2.setCategoryName("test product2");
        productResponse2.setName("test product2");
        productResponse2.setDescription("test product2");
        productResponse2.setPrice(BigDecimal.valueOf(15.99));
        productResponse2.setIsSpecial(true);
        productResponse2.setAvailable(false);

        productResponseList.add(productResponse1);
        productResponseList.add(productResponse2);

        when(productRepository.findAll()).thenReturn(products);
        when(productMapper.toProductResponse(product1)).thenReturn(productResponse1);
        when(productMapper.toProductResponse(product2)).thenReturn(productResponse2);

        // ACT
        List<ProductResponse> result = productService.getAllProducts();

        // ASSERT
        assertEquals(2, result.size());
        verify(productRepository).findAll();
    }

    @Test
    void testUpdateProduct_Success(){
        // ARRANGE
        Category category = new Category();
        category.setCategoryId(3);
        category.setName("test category3");

        Product product = new Product();
        product.setProductId(3);
        product.setCategory(category);
        product.setName("test product3");
        product.setDescription("test description5");
        product.setPrice(BigDecimal.valueOf(12.99));
        product.setIsSpecial(true);
        product.setAvailable(true);

        UpdateProductRequest request = new UpdateProductRequest();
        request.setCategoryId(3);
        request.setName("test product5");
        request.setPrice(BigDecimal.valueOf(12.99));


        Product updatedProduct = new Product();
        updatedProduct.setProductId(3);
        updatedProduct.setCategory(category);
        updatedProduct.setName("test product5");
        updatedProduct.setDescription("test description5");
        updatedProduct.setPrice(BigDecimal.valueOf(12.99));
        updatedProduct.setIsSpecial(true);
        updatedProduct.setAvailable(true);

        ProductResponse productResponse = new ProductResponse();
        productResponse.setProductId(3);
        productResponse.setCategoryId(3);
        productResponse.setCategoryName("test product3");
        productResponse.setName("test product5");
        productResponse.setDescription("test product5");
        productResponse.setPrice(BigDecimal.valueOf(12.99));
        productResponse.setIsSpecial(true);
        productResponse.setAvailable(true);

        when(productRepository.findById(3)).thenReturn(Optional.of(product));
        when(categoryRepository.findById(3)).thenReturn(Optional.of(category));
        when(productRepository.save(any(Product.class))).thenReturn(updatedProduct);
        when(productMapper.toProductResponse(updatedProduct)).thenReturn(productResponse);

        // ACT
        ProductResponse result = productService.updateProduct(3, request);

        // ASSERT & VERIFY
        assertNotNull(result);
        assertEquals("test product5", result.getName());
        assertEquals(BigDecimal.valueOf(12.99), result.getPrice());
        verify(productRepository).findById(3);
        verify(productRepository).save(any(Product.class));
    }

    @Test
    void testCreateProduct_CategoryNotFound_ThrowsException() {
        // ARRANGE
        CreateProductRequest request = new CreateProductRequest();
        request.setCategoryId(999);
        request.setName("test product");
        request.setPrice(BigDecimal.valueOf(10.99));

        when(categoryRepository.findById(999)).thenReturn(Optional.empty());

        // ACT & ASSERT
        assertThrows(ResourceNotFoundException.class, () -> {
            productService.createProduct(request);
        });

        // VERIFY
        verify(categoryRepository).findById(999);
        verify(productRepository, never()).save(any(Product.class));
    }

    @Test
    void testUpdateProduct_ProductNotFound_ThrowsException() {
        // ARRANGE
        UpdateProductRequest request = new UpdateProductRequest();
        request.setName("updated name");

        when(productRepository.findById(999)).thenReturn(Optional.empty());

        // ACT & ASSERT
        assertThrows(ResourceNotFoundException.class, () -> {
            productService.updateProduct(999, request);
        });

        // VERIFY
        verify(productRepository).findById(999);
        verify(productRepository, never()).save(any(Product.class));
    }

    @Test
    void testUpdateProductAvailability_ProductNotFound_ThrowsException() {
        // ARRANGE
        when(productRepository.findById(999)).thenReturn(Optional.empty());

        // ACT & ASSERT
        assertThrows(ResourceNotFoundException.class, () -> {
            productService.updateProductAvailability(999, false);
        });

        // VERIFY
        verify(productRepository).findById(999);
        verify(productRepository, never()).save(any(Product.class));
    }

    @Test
    void testUpdateProduct_AllFields_Success() {
        // ARRANGE
        Category oldCategory = new Category();
        oldCategory.setCategoryId(1);
        oldCategory.setName("old category");

        Category newCategory = new Category();
        newCategory.setCategoryId(2);
        newCategory.setName("new category");

        Product product = new Product();
        product.setProductId(1);
        product.setCategory(oldCategory);
        product.setName("old name");
        product.setDescription("old description");
        product.setPrice(BigDecimal.valueOf(10.00));
        product.setImageUrl("old-url.jpg");
        product.setIsSpecial(false);
        product.setAvailable(true);

        UpdateProductRequest request = new UpdateProductRequest();
        request.setCategoryId(2);
        request.setName("new name");
        request.setDescription("new description");
        request.setPrice(BigDecimal.valueOf(20.00));
        request.setImageUrl("new-url.jpg");
        request.setIsSpecial(true);

        Product updatedProduct = new Product();
        updatedProduct.setProductId(1);
        updatedProduct.setCategory(newCategory);
        updatedProduct.setName("new name");
        updatedProduct.setDescription("new description");
        updatedProduct.setPrice(BigDecimal.valueOf(20.00));
        updatedProduct.setImageUrl("new-url.jpg");
        updatedProduct.setIsSpecial(true);
        updatedProduct.setAvailable(true);

        ProductResponse productResponse = new ProductResponse();
        productResponse.setProductId(1);
        productResponse.setCategoryId(2);
        productResponse.setCategoryName("new category");
        productResponse.setName("new name");
        productResponse.setDescription("new description");
        productResponse.setPrice(BigDecimal.valueOf(20.00));
        productResponse.setImageUrl("new-url.jpg");
        productResponse.setIsSpecial(true);
        productResponse.setAvailable(true);

        when(productRepository.findById(1)).thenReturn(Optional.of(product));
        when(categoryRepository.findById(2)).thenReturn(Optional.of(newCategory));
        when(productRepository.save(any(Product.class))).thenReturn(updatedProduct);
        when(productMapper.toProductResponse(updatedProduct)).thenReturn(productResponse);

        // ACT
        ProductResponse result = productService.updateProduct(1, request);

        // ASSERT
        assertNotNull(result);
        assertEquals("new name", result.getName());
        assertEquals("new description", result.getDescription());
        assertEquals(BigDecimal.valueOf(20.00), result.getPrice());
        assertEquals("new-url.jpg", result.getImageUrl());
        assertEquals(true, result.getIsSpecial());
        verify(productRepository).findById(1);
        verify(categoryRepository).findById(2);
        verify(productRepository).save(any(Product.class));
    }

    @Test
    void testGetProductEntityById_Success() {
        // ARRANGE
        Category category = new Category();
        category.setCategoryId(1);
        category.setName("test category");

        Product product = new Product();
        product.setProductId(1);
        product.setCategory(category);
        product.setName("test product");
        product.setPrice(BigDecimal.valueOf(10.99));
        product.setAvailable(true);

        when(productRepository.findById(1)).thenReturn(Optional.of(product));

        // ACT
        Product result = productService.getProductEntityById(1);

        // ASSERT
        assertNotNull(result);
        assertEquals(1, result.getProductId());
        assertEquals("test product", result.getName());
        verify(productRepository).findById(1);
    }

    @Test
    void testGetProductEntityById_NotFound_ThrowsException() {
        // ARRANGE
        when(productRepository.findById(999)).thenReturn(Optional.empty());

        // ACT & ASSERT
        assertThrows(ResourceNotFoundException.class, () -> {
            productService.getProductEntityById(999);
        });

        // VERIFY
        verify(productRepository).findById(999);
    }
}
