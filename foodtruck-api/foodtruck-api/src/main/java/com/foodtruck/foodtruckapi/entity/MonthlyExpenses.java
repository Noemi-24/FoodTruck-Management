package com.foodtruck.foodtruckapi.entity;

import com.foodtruck.foodtruckapi.enums.ExpenseCategory;
import jakarta.persistence.*;
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
@Table(name = "monthly_expenses")
@Immutable
@IdClass(MonthlyExpensesPK.class)
public class MonthlyExpenses {
    @Id
    @Column(name= "month")
    String month;

    @Id
    @Column(name= "Category")
    @Enumerated(EnumType.STRING)
    ExpenseCategory category;

    @Column(name= "expense_count")
    Integer expenseCount;

    @Column(name= "total_amount", precision =32, scale = 2)
    BigDecimal totalAmount;
}
