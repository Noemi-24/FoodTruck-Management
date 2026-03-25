package com.foodtruck.foodtruckapi.service.impl;

import com.foodtruck.foodtruckapi.dto.request.CreateUserRequest;
import com.foodtruck.foodtruckapi.dto.request.UpdateUserRequest;
import com.foodtruck.foodtruckapi.dto.response.UserResponse;
import com.foodtruck.foodtruckapi.exception.ConflictException;
import com.foodtruck.foodtruckapi.exception.ResourceNotFoundException;
import com.foodtruck.foodtruckapi.mapper.UserMapper;
import com.foodtruck.foodtruckapi.model.User;
import com.foodtruck.foodtruckapi.repository.UserRepository;
import com.foodtruck.foodtruckapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    @Override
    public UserResponse getUserById(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("User", "id", id));
        return userMapper.toUserResponse(user);
    }

    @Override
    public UserResponse createUser(CreateUserRequest userRequest) {
        // Validate unique email
        if(userRepository.existsByEmail(userRequest.getEmail())){
            throw new ConflictException("Email already exists");
        }

        // Create user entity
        User user = new User();
        user.setName(userRequest.getName());
        user.setEmail(userRequest.getEmail());
        user.setRole(userRequest.getRole());
        user.setPhone(userRequest.getPhone());
        user.setActive(true);

        // Hash password
        String hashedPassword = passwordEncoder.encode(userRequest.getPassword());
        user.setPassword(hashedPassword);

        // Save user
        User savedUser = userRepository.save(user);

        // Convert to a response
        return userMapper.toUserResponse(savedUser);
    }

    @Override
    public UserResponse updateUser(Integer id, UpdateUserRequest userRequest) {
        // Find user by id
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        // Validate unique email
        if(!user.getEmail().equals(userRequest.getEmail()) &&
                userRepository.existsByEmail(userRequest.getEmail())){
            throw new ConflictException("Email already exists");
        }

        // Update user
        user.setName(userRequest.getName());
        user.setEmail(userRequest.getEmail());
        user.setRole(userRequest.getRole());
        user.setPhone(userRequest.getPhone());
        user.setUserId(id);

        // Save user
        User savedUser = userRepository.save(user);

        // Convert to a response
        return userMapper.toUserResponse(savedUser);
    }

    @Override
    public void deleteUser(Integer id) {
        if (!userRepository.existsById(id)){
            throw new ResourceNotFoundException("User", "id", id);
        }
        userRepository.deleteById(id);
    }
}
