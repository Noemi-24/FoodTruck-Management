package com.foodtruck.foodtruckapi.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@Data
@Entity
@Table(name = "OrderItems")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OrderItemID")
    Integer orderItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "OrderID", nullable = false)
    Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ProductID", nullable = false)
    Product product;

    @Column(name = "Quantity", nullable = false)
    Integer quantity;

    @Column(name = "PriceAtOrder", nullable = false, precision = 12, scale = 2)
    BigDecimal priceAtOrder;

    @Column(name = "Subtotal", nullable = false, precision = 12, scale = 2)
    BigDecimal subtotal;

    @Column(name = "Notes")
    String notes;

}
