package com.foodtruck.foodtruckapi.service.impl;

import com.foodtruck.foodtruckapi.model.Product;
import com.foodtruck.foodtruckapi.repository.ProductRepository;
import com.foodtruck.foodtruckapi.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Integer id) {
        return productRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Not Found: " + id));
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Integer id, Product product) {
        if(!productRepository.existsById(id)){
            throw new RuntimeException("Not Found: " + id);
        }
        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Integer id) {
        if(!productRepository.existsById(id)){
            throw new RuntimeException("Not Found: " + id);
        }
        productRepository.deleteById(id);
    }
}
