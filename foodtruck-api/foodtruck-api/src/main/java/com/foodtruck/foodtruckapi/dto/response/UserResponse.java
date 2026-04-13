package com.foodtruck.foodtruckapi.dto.response;

import com.foodtruck.foodtruckapi.enums.UserRole;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    Integer userId;
    String name;
    String email;
    String phone;
    UserRole role;
    Boolean active;
}
