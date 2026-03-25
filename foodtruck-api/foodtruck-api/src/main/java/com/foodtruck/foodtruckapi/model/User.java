package com.foodtruck.foodtruckapi.model;

import com.foodtruck.foodtruckapi.enums.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@Data
@Entity
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID")
    Integer userId;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be 2-100 chars")
    @Column(name = "Name", nullable = false, length = 100)
    String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(name = "Email", unique = true, length = 100)
    String email;

    @NotBlank(message = "Password is required")
    @Column(name = "Password", nullable = false)
    String password;

    @Pattern(regexp = "^\\d{3}-\\d{3}-\\d{4}$", message = "Format: 000-000-0000")
    @Column(name = "Phone", length = 20)
    String phone;

    @NotNull(message = "Role is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "Role")
    UserRole role;

    @NotNull(message = "Active is required")
    @Column(name = "Active")
    Boolean active;

    @Column(name = "CreatedAt")
    @CreationTimestamp
    LocalDateTime createdAt;

    @Column(name = "UpdatedAt")
    @UpdateTimestamp
    LocalDateTime updatedAt;
}
