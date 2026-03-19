package com.foodtruck.foodtruckapi.model;

import jakarta.persistence.*;
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

    @Column(name = "Name", nullable = false, length = 100)
    String name;

    @Column(name = "Description")
    String description;

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
