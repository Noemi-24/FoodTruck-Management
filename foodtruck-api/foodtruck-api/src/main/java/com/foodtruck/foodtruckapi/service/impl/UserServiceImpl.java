package com.foodtruck.foodtruckapi.service.impl;

import com.foodtruck.foodtruckapi.exception.ResourceNotFoundException;
import com.foodtruck.foodtruckapi.model.User;
import com.foodtruck.foodtruckapi.repository.UserRepository;
import com.foodtruck.foodtruckapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("User", "id", id));
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Integer id, User user) {
        if (!userRepository.existsById(id)){
            throw new ResourceNotFoundException("User", "id", id);
        }
        user.setUserId(id);
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Integer id) {
        if (!userRepository.existsById(id)){
            throw new ResourceNotFoundException("User", "id", id);
        }
        userRepository.deleteById(id);
    }
}
