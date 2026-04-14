package com.foodtruck.foodtruckapi.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;

@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@Getter
@Entity
@Table(name = "popular_items")
@Immutable
public class PopularItem {
    @Id
    @Column(name= "ProductID")
    Integer productId;

    @Column(name= "Name")
    String name;

    @Column(name= "CategoryName")
    String categoryName;

    @Column(name= "times_ordered")
    Integer timesOrdered;

    @Column(name= "total_revenue", precision =32, scale = 2)
    BigDecimal totalRevenue;
}
