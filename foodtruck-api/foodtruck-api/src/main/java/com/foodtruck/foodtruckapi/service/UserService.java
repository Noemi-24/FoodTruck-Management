package com.foodtruck.foodtruckapi.service;

import com.foodtruck.foodtruckapi.dto.request.CreateUserRequest;
import com.foodtruck.foodtruckapi.dto.request.UpdateUserRequest;
import com.foodtruck.foodtruckapi.dto.response.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse createUser(CreateUserRequest userRequest);
    UserResponse updateUser(Integer id, UpdateUserRequest userRequest);
    List<UserResponse> getAllUsers();
    UserResponse getUserById(Integer id);
    UserResponse deactivateUser(Integer id);
}
