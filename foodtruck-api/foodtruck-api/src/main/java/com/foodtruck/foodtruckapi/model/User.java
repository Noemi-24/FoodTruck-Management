package com.foodtruck.foodtruckapi.model;

import com.foodtruck.foodtruckapi.enums.UserRole;
import jakarta.persistence.*;
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

    @Column(name = "Name", nullable = false, length = 100)
    String name;

    @Column(name = "Email", unique = true, length = 100)
    String email;

    @Column(name = "Password", nullable = false)
    String password;

    @Column(name = "Phone", length = 20)
    String phone;

    @Enumerated(EnumType.STRING)
    @Column(name = "Role")
    UserRole role;

    @Column(name = "Active")
    Boolean active;

    @Column(name = "CreatedAt")
    @CreationTimestamp
    LocalDateTime createdAt;

    @Column(name = "UpdatedAt")
    @UpdateTimestamp
    LocalDateTime updatedAt;
}
