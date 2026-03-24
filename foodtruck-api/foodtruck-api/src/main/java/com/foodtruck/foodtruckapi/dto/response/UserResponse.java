package com.foodtruck.foodtruckapi.dto.response;

import com.foodtruck.foodtruckapi.enums.UserRole;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    Integer userId;
    String name;
    String email;
    UserRole role;
    LocalDateTime createdAt;
}
