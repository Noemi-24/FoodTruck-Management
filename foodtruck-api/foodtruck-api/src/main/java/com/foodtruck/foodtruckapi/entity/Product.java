package com.foodtruck.foodtruckapi.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@Data
@Entity
@Table(name = "Products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ProductID")
    Integer productId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CategoryID", nullable = false)
    Category category;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be 2-100 chars")
    @Column(name = "Name", nullable = false, length = 100)
    String name;

    @Size(min = 2, max = 255, message = "Description must be 2-255 chars")
    @Column(name = "Description")
    String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    @DecimalMax(value = "9999.99", message = "Price is too high")
    @Column(name = "Price", nullable = false, precision = 12, scale = 2)
    BigDecimal price;

    @Column(name = "ImageUrl")
    String imageUrl;

    @Column(name = "Available", nullable = false)
    Boolean available;

    @Column(name = "IsSpecial", nullable = false)
    Boolean isSpecial;

    @Column(name = "CreatedAt")
    @CreationTimestamp
    LocalDateTime createdAt;

    @Column(name = "UpdatedAt")
    @UpdateTimestamp
    LocalDateTime updatedAt;
}
