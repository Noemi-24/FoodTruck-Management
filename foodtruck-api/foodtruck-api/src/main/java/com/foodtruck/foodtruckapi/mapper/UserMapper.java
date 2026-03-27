package com.foodtruck.foodtruckapi.mapper;

import com.foodtruck.foodtruckapi.dto.response.UserResponse;
import com.foodtruck.foodtruckapi.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {
    public UserResponse toUserResponse(User user){
        UserResponse userResponse = new UserResponse();

        userResponse.setUserId(user.getUserId());
        userResponse.setName(user.getName());
        userResponse.setEmail(user.getEmail());
        userResponse.setRole(user.getRole());
        userResponse.setCreatedAt(user.getCreatedAt());

        return userResponse;
    }
}
