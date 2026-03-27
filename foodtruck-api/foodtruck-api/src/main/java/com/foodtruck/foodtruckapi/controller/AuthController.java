package com.foodtruck.foodtruckapi.controller;

import com.foodtruck.foodtruckapi.dto.request.LoginRequest;
import com.foodtruck.foodtruckapi.dto.response.LoginResponse;
import com.foodtruck.foodtruckapi.dto.response.UserResponse;
import com.foodtruck.foodtruckapi.exception.BadRequestException;
import com.foodtruck.foodtruckapi.mapper.UserMapper;
import com.foodtruck.foodtruckapi.entity.User;
import com.foodtruck.foodtruckapi.repository.UserRepository;
import com.foodtruck.foodtruckapi.util.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest){
        // Find user by email
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(()-> new BadRequestException("Invalid credentials"));

        // Verify password
        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
           throw  new BadRequestException("Invalid credentials");
        }

        // Generate token JWT
        String token = jwtUtil.generateToken(loginRequest.getEmail());

        // Convert to a user response
        UserResponse userResponse = userMapper.toUserResponse(user);

        // Create LoginResponse
        LoginResponse loginResponse = new LoginResponse(token,"Bearer", userResponse);

        return ResponseEntity.ok(loginResponse);

    }
}
