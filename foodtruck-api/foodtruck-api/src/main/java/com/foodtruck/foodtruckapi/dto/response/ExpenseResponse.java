package com.foodtruck.foodtruckapi.dto.response;

import com.foodtruck.foodtruckapi.enums.ExpenseCategory;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ExpenseResponse {
    Integer expenseId;
    Integer recordedByUserId;
    String recordedByUserName;
    LocalDate date;
    BigDecimal amount;
    ExpenseCategory category;
    String description;
    String receiptUrl;
}