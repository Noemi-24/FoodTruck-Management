package com.foodtruck.foodtruckapi.dto.response;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryResponse {
    Integer categoryId;
    String name;
}
