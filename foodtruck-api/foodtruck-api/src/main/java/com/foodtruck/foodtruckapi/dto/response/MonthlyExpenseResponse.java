package com.foodtruck.foodtruckapi.dto.response;

import com.foodtruck.foodtruckapi.enums.ExpenseCategory;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MonthlyExpenseResponse {
    String month;
    ExpenseCategory category;
    Integer expenseCount;
    BigDecimal totalAmount;
}
