package com.foodtruck.foodtruckapi.model;

import com.foodtruck.foodtruckapi.enums.OrderStatus;
import com.foodtruck.foodtruckapi.enums.PaymentMethod;
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
@Table(name = "Orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OrderID")
    Integer orderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ProcessedByUserId")
    User processedByUser;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be 2-100 chars")
    @Column(name = "CustomerName", nullable = false, length = 100)
    String customerName;

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^\\d{3}-\\d{3}-\\d{4}$", message = "Format: 000-000-0000")
    @Column(name = "CustomerPhone", nullable = false, length = 20)
    String customerPhone;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(name = "CustomerEmail", length = 100)
    String customerEmail;

    @NotNull(message = "Total is required")
    @DecimalMin(value = "0.01", message = "Total must be greater than 0")
    @DecimalMax(value = "9999.99", message = "Total is too high")
    @Column(name = "Total", nullable = false, precision = 12, scale = 2)
    BigDecimal total;

    @NotNull(message = "Status is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "Status")
    OrderStatus status;

    @NotNull(message = "Method of payment is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "PaymentMethod")
    PaymentMethod paymentMethod;

    @Size(min = 2, max = 255, message = "Notes must be 2-255 chars")
    @Column(name = "Notes")
    String notes;

    @Column(name = "OrderDate")
    @CreationTimestamp
    LocalDateTime orderDate;

    @Column(name = "UpdatedAt")
    @UpdateTimestamp
    LocalDateTime updatedAt;
}
