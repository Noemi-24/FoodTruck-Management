package com.foodtruck.foodtruckapi.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@Data
@Entity
@Table(name = "Categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CategoryID")
    Integer categoryId;

    @Column(name = "Name", nullable = false, length = 100)
    String name;

    @Column(name = "CreatedAt")
    @CreationTimestamp
    LocalDateTime createdAt;
}
