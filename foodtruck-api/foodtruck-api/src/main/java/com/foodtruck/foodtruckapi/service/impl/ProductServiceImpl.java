package com.foodtruck.foodtruckapi.service.impl;

import com.foodtruck.foodtruckapi.dto.request.CreateProductRequest;
import com.foodtruck.foodtruckapi.dto.request.UpdateProductRequest;
import com.foodtruck.foodtruckapi.dto.response.ProductResponse;
import com.foodtruck.foodtruckapi.entity.Category;
import com.foodtruck.foodtruckapi.exception.ResourceNotFoundException;
import com.foodtruck.foodtruckapi.entity.Product;
import com.foodtruck.foodtruckapi.mapper.ProductMapper;
import com.foodtruck.foodtruckapi.repository.CategoryRepository;
import com.foodtruck.foodtruckapi.repository.ProductRepository;
import com.foodtruck.foodtruckapi.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final CategoryRepository categoryRepository;

    @Override
    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(productMapper::toProductResponse)
                .toList();
    }

    @Override
    public ProductResponse getProductById(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));

        return productMapper.toProductResponse(product);
    }

    @Override
    public ProductResponse createProduct(CreateProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", request.getCategoryId()));

        Product product = productMapper.toProduct(request, category);
        Product savedProduct = productRepository.save(product);

        return productMapper.toProductResponse(savedProduct);
    }

    @Override
    public ProductResponse updateProduct(Integer id, UpdateProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category", "id", request.getCategoryId()));
            product.setCategory(category);
        }

        if (request.getName() != null) {
            product.setName(request.getName());
        }

        if (request.getDescription() != null) {
            product.setDescription(request.getDescription());
        }

        if (request.getPrice() != null) {
            product.setPrice(request.getPrice());
        }

        if (request.getImageUrl() != null) {
            product.setImageUrl(request.getImageUrl());
        }

        if (request.getIsSpecial() != null) {
            product.setIsSpecial(request.getIsSpecial());
        }

        Product updatedProduct = productRepository.save(product);

        return productMapper.toProductResponse(updatedProduct);
    }

    @Override
    public ProductResponse updateProductAvailability(Integer id, boolean available) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));

        product.setAvailable(available);
        Product updatedProduct = productRepository.save(product);
        return productMapper.toProductResponse(updatedProduct);
    }

    @Override
    public Product getProductEntityById(Integer id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
    }
}
