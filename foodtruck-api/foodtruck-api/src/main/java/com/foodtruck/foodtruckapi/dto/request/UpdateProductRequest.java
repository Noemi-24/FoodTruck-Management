package com.foodtruck.foodtruckapi.dto.request;
import jakarta.validation.constraints.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateProductRequest {
    Integer categoryId;

    @Size(min = 2, max = 100, message = "Name must be 2-100 chars")
    String name;

    @Size(max = 255, message = "Description must be max 255 chars")
    String description;

    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    @DecimalMax(value = "9999.99", message = "Price is too high")
    BigDecimal price;

    String imageUrl;

    Boolean isSpecial;
}
