package com.foodtruck.foodtruckapi.mapper;

import com.foodtruck.foodtruckapi.dto.request.CreateProductRequest;
import com.foodtruck.foodtruckapi.dto.response.ProductResponse;
import com.foodtruck.foodtruckapi.entity.Category;
import com.foodtruck.foodtruckapi.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {
    public ProductResponse toProductResponse(Product product) {
        ProductResponse response = new ProductResponse();
        response.setProductId(product.getProductId());
        response.setCategoryId(product.getCategory().getCategoryId());
        response.setCategoryName(product.getCategory().getName());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setImageUrl(product.getImageUrl());
        response.setAvailable(product.getAvailable());
        response.setIsSpecial(product.getIsSpecial());
        return response;
    }

    public Product toProduct(CreateProductRequest request, Category category) {
        Product product = new Product();
        product.setCategory(category);
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setImageUrl(request.getImageUrl());
        product.setAvailable(true);  // Default true
        product.setIsSpecial(request.getIsSpecial() != null ? request.getIsSpecial() : false);
        return product;
    }
}
