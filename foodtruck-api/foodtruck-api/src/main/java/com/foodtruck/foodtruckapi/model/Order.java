package com.foodtruck.foodtruckapi.model;

import com.foodtruck.foodtruckapi.enums.OrderStatus;
import com.foodtruck.foodtruckapi.enums.PaymentMethod;
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
@Table(name = "Orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OrderID")
    Integer orderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserId")
    //@Column(name = "ProcessedByUserId")
    User processedByUserId;

    @Column(name = "CustomerName", nullable = false, length = 100)
    String customerName;

    @Column(name = "CustomerPhone", nullable = false, length = 20)
    String customerPhone;

    @Column(name = "CustomerEmail", nullable = false, length = 100)
    String customerEmail;

    @Column(name = "Total", nullable = false, precision = 12, scale = 2)
    BigDecimal total;

    @Enumerated(EnumType.STRING)
    @Column(name = "Status")
    OrderStatus status;

   @Enumerated(EnumType.STRING)
    @Column(name = "PaymentMethod")
    PaymentMethod paymentMethod;

    @Column(name = "Notes")
    String notes;

    @Column(name = "OrderDate")
    @CreationTimestamp
    LocalDateTime orderDate;

    @Column(name = "UpdatedAt")
    @UpdateTimestamp
    LocalDateTime updatedAt;
}
