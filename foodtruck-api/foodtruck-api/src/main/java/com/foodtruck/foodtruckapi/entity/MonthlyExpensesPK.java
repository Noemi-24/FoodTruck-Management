package com.foodtruck.foodtruckapi.entity;

import com.foodtruck.foodtruckapi.enums.ExpenseCategory;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class MonthlyExpensesPK implements Serializable {
    String month;
    ExpenseCategory category;
}
