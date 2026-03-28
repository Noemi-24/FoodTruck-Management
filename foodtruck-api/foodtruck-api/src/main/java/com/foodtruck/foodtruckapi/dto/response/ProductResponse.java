package com.foodtruck.foodtruckapi.dto.response;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductResponse {
    Integer productId;
    Integer categoryId;
    String categoryName;
    String name;
    String description;
    BigDecimal price;
    String imageUrl;
    Boolean available;
    Boolean isSpecial;
}
