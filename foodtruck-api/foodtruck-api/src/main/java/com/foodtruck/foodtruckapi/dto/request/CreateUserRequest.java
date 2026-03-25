package com.foodtruck.foodtruckapi.dto.request;

import com.foodtruck.foodtruckapi.enums.UserRole;
import jakarta.validation.constraints.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateUserRequest {
    @NotBlank(message = "Name is required")
    String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    String email;

    @Pattern(regexp = "^\\d{3}-\\d{3}-\\d{4}$", message = "Format: 000-000-0000")
    String phone;

    @NotBlank(message = "Password is required")
    @Size(min = 8)
    String password;

    @NotNull(message = "Role is required")
    UserRole role;
}
