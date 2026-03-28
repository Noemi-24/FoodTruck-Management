package com.foodtruck.foodtruckapi.service;

import com.foodtruck.foodtruckapi.dto.request.CreateProductRequest;
import com.foodtruck.foodtruckapi.dto.request.UpdateProductRequest;
import com.foodtruck.foodtruckapi.dto.response.ProductResponse;
import com.foodtruck.foodtruckapi.entity.Product;

import java.util.List;

public interface ProductService {
    ProductResponse createProduct(CreateProductRequest request);
    ProductResponse updateProduct(Integer id, UpdateProductRequest request);
    ProductResponse getProductById(Integer id);
    List<ProductResponse> getAllProducts();
    ProductResponse updateProductAvailability(Integer id, boolean available);
    Product getProductEntityById(Integer id);
}
