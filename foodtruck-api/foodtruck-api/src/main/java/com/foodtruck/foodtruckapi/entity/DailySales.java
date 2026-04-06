package com.foodtruck.foodtruckapi.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;
import java.time.LocalDate;

@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@Getter
@Entity
@Table(name = "daily_sales")
@Immutable
public class DailySales {

    @Id
    @Column(name= "sale_date")
    LocalDate saleDate;

    @Column(name= "total_orders")
    Long totalOrders;

    @Column(name= "total_revenue", precision =32, scale = 2)
    BigDecimal totalRevenue;
}
