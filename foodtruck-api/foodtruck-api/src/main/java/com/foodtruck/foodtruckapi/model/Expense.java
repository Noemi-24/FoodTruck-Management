package com.foodtruck.foodtruckapi.model;

import com.foodtruck.foodtruckapi.enums.ExpenseCategory;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@Data
@Entity
@Table(name = "Expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ExpenseID")
    Integer expenseId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RecordedByUserID", nullable = false)
    User recordedByUser;

    @Column(name = "Date", nullable = false)
    LocalDate date;

    @Column(name = "Amount", nullable = false, precision = 12, scale = 2)
    BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "Category", nullable = false)
    ExpenseCategory category;

    @Column(name = "Description", nullable = false)
    String description;

    @Column(name = "ReceiptUrl")
    String receiptUrl;

    @Column(name = "CreatedAt")
    @CreationTimestamp
    LocalDateTime createdAt;
}
