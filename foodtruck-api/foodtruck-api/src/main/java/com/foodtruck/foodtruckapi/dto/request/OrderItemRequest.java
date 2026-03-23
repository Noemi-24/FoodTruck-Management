package com.foodtruck.foodtruckapi.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderItemRequest {
    @NotNull(message = "Product id is required")
    Integer productId;

    @NotNull(message = "Quantity is required")
    @Min(value = 1)
    Integer quantity;

    String notes;
}
