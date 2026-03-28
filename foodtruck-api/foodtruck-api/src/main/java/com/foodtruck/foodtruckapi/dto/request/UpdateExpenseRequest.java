package com.foodtruck.foodtruckapi.dto.request;
import com.foodtruck.foodtruckapi.enums.ExpenseCategory;
import jakarta.validation.constraints.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateExpenseRequest {
    LocalDate date;

    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    @DecimalMax(value = "9999.99", message = "Amount is too high")
    BigDecimal amount;

    ExpenseCategory category;

    @Size(min = 2, max = 255, message = "Description must be 2-255 chars")
    String description;

    String receiptUrl;
}
