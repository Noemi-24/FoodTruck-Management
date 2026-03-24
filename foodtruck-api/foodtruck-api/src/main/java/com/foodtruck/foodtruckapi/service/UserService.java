package com.foodtruck.foodtruckapi.service;

import com.foodtruck.foodtruckapi.dto.request.CreateUserRequest;
import com.foodtruck.foodtruckapi.dto.request.UpdateUserRequest;
import com.foodtruck.foodtruckapi.dto.response.UserResponse;
import com.foodtruck.foodtruckapi.model.User;

import java.util.List;

public interface UserService {
    UserResponse createUser(CreateUserRequest userRequest);
    UserResponse updateUser(Integer id, UpdateUserRequest userRequest);
    List<UserResponse> getAllUsers();
    UserResponse getUserById(Integer id);
    void deleteUser(Integer id);
}
