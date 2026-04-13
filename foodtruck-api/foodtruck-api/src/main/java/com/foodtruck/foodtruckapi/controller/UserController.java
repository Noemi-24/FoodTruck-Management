package com.foodtruck.foodtruckapi.controller;

import com.foodtruck.foodtruckapi.dto.request.CreateUserRequest;
import com.foodtruck.foodtruckapi.dto.request.UpdateUserRequest;
import com.foodtruck.foodtruckapi.dto.response.UserResponse;
import com.foodtruck.foodtruckapi.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class UserController {
    private final UserService userService;

    @GetMapping
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody CreateUserRequest userRequest) {
        UserResponse response = userService.createUser(userRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Integer id, @Valid @RequestBody UpdateUserRequest userRequest) {
        UserResponse response = userService.updateUser(id, userRequest);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<UserResponse> deactivateUser(@PathVariable Integer id) {
        UserResponse response = userService.deactivateUser(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/reactivate")
    public ResponseEntity<UserResponse> reactivateUser(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.reactivateUser(id));
    }
}
