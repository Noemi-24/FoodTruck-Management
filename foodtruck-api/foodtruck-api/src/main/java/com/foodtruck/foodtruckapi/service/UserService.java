package com.foodtruck.foodtruckapi.service;

import com.foodtruck.foodtruckapi.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Integer id);
    User createUser(User user);
    User updateUser(Integer id, User user);
    void deleteUser(Integer id);
}
