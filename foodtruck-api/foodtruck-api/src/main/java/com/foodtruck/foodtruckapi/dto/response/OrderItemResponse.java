package com.foodtruck.foodtruckapi.dto.response;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderItemResponse {
    Integer orderItemId;
    Integer productId;
    String productName;
    Integer quantity;
    BigDecimal priceAtOrder;
    BigDecimal subtotal;
    String notes;
}
