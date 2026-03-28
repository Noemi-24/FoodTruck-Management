package com.foodtruck.foodtruckapi.dto.request;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateCategoryRequest {
    @Size(min = 2, max = 100, message = "Name must be 2-100 chars")
    String name;
}
