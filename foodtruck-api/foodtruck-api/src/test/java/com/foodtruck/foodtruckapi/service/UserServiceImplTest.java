package com.foodtruck.foodtruckapi.service;

import com.foodtruck.foodtruckapi.dto.request.CreateUserRequest;
import com.foodtruck.foodtruckapi.dto.request.UpdateUserRequest;
import com.foodtruck.foodtruckapi.dto.response.UserResponse;
import com.foodtruck.foodtruckapi.entity.User;
import com.foodtruck.foodtruckapi.exception.ConflictException;
import com.foodtruck.foodtruckapi.exception.ResourceNotFoundException;
import com.foodtruck.foodtruckapi.mapper.UserMapper;
import com.foodtruck.foodtruckapi.repository.UserRepository;
import com.foodtruck.foodtruckapi.service.impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.foodtruck.foodtruckapi.enums.UserRole.EMPLOYEE;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceImplTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void testCreateUser_Success(){
        // ARRANGE
        CreateUserRequest request = new CreateUserRequest();
        request.setName("test");
        request.setPassword("password123");
        request.setEmail("test@test");
        request.setPhone("111-222-3333");
        request.setRole(EMPLOYEE);

        User savedUser = new User();
        savedUser.setUserId(1);
        savedUser.setName("test");
        savedUser.setEmail("test@test");
        savedUser.setRole(EMPLOYEE);
        savedUser.setPhone("111-222-3333");
        savedUser.setPassword("hashedPassword");
        savedUser.setActive(true);

        UserResponse userResponse = new UserResponse();
        userResponse.setUserId(1);
        userResponse.setName("test");
        userResponse.setEmail("test@test");
        userResponse.setRole(EMPLOYEE);

        when(passwordEncoder.encode("password123")).thenReturn("hashedPassword");
        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        when(userMapper.toUserResponse(savedUser)).thenReturn(userResponse);
        // ACT
        UserResponse result = userService.createUser(request);
        // ASSERT
        assertNotNull(result);
        assertEquals(userResponse, result);
        verify(passwordEncoder).encode("password123");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testGetUserById_Success() {
        // ARRANGE
        User user = new User();
        user.setUserId(1);
        user.setName("test");
        user.setEmail("test@test.com");
        user.setRole(EMPLOYEE);

        UserResponse userResponse = new UserResponse();
        userResponse.setUserId(1);
        userResponse.setName("test");
        userResponse.setEmail("test@test.com");
        userResponse.setRole(EMPLOYEE);

        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(userMapper.toUserResponse(user)).thenReturn(userResponse);

        // ACT
        UserResponse result = userService.getUserById(1);

        // ASSERT
        assertNotNull(result);
        assertEquals(1, result.getUserId());
        assertEquals("test@test.com", result.getEmail());
        verify(userRepository).findById(1);
    }

    @Test
    void testGetUserById_NotFound_ThrowsException(){
        //ARRANGE
        when(userRepository.findById(999)).thenReturn(Optional.empty());
        //ACT & ASSERT
        assertThrows(ResourceNotFoundException.class, ()->{ userService.getUserById(999);});
        //VERIFY
        verify(userRepository).findById(999);
    }

    @Test
    void testUpdateUser_Success() {
        //ARRANGE
        UpdateUserRequest request = new UpdateUserRequest();
        request.setName("test1");
        request.setEmail("test1@test.com");
        request.setPhone("111-222-4444");
        request.setRole(EMPLOYEE);

        User existingUser = new User();
        existingUser.setUserId(1);
        existingUser.setEmail("test@test.com");

        UserResponse userResponse = new UserResponse();
        userResponse.setUserId(1);
        userResponse.setName("test1");
        userResponse.setEmail("test1@test.com");
        userResponse.setRole(EMPLOYEE);

        when(userRepository.findById(1)).thenReturn(Optional.of(existingUser));
        when(userRepository.existsByEmail("test1@test.com")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(existingUser);
        when(userMapper.toUserResponse(existingUser)).thenReturn(userResponse);

        // ACT
        UserResponse result = userService.updateUser(1, request);

        // ASSERT
        assertNotNull(result);
        assertEquals("test1@test.com", result.getEmail());
        assertEquals("test1", result.getName());
        verify(userRepository).findById(1);
        verify(userRepository).existsByEmail("test1@test.com");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testUpdateUser_EmailAlreadyExists_ThrowsException(){
        // ARRANGE
        UpdateUserRequest request = new UpdateUserRequest();
        request.setEmail("other@test.com");

        User existingUser = new User();
        existingUser.setUserId(1);
        existingUser.setEmail("test@test.com");

        when(userRepository.findById(1)).thenReturn(Optional.of(existingUser));
        when(userRepository.existsByEmail("other@test.com")).thenReturn(true);

        // ACT & ASSERT
        assertThrows(ConflictException.class, ()->{ userService.updateUser(1, request);});

        // VERIFY
        verify(userRepository).findById(1);
        verify(userRepository).existsByEmail("other@test.com");
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testDeleteUser_Success(){
        // ARRANGE
        when(userRepository.existsById(1)).thenReturn(true);

        // ACT
        userService.deleteUser(1);

        // ASSERT
        verify(userRepository).existsById(1);
        verify(userRepository).deleteById(1);
    }

    @Test
    void testGetAllUsers_Success(){
        // ARRANGE
        List<User> users = new ArrayList<>();
        User user1 = new User();
        user1.setUserId(1);
        user1.setName("test1");
        user1.setEmail("test1@test.com");
        user1.setRole(EMPLOYEE);

        User user2 = new User();
        user2.setUserId(2);
        user2.setName("test2");
        user2.setEmail("test2@test.com");
        user2.setRole(EMPLOYEE);

        users.add(user1);
        users.add(user2);

        List<UserResponse> userResponseList = new ArrayList<>();
        UserResponse userResponse1 = new UserResponse();
        userResponse1.setUserId(1);
        userResponse1.setName("test1");
        userResponse1.setEmail("test1@test.com");
        userResponse1.setRole(EMPLOYEE);

        UserResponse userResponse2 = new UserResponse();
        userResponse2.setUserId(2);
        userResponse2.setName("test2");
        userResponse2.setEmail("test1@test.com");
        userResponse2.setRole(EMPLOYEE);

        userResponseList.add(userResponse1);
        userResponseList.add(userResponse2);

        when(userRepository.findAll()).thenReturn(users);
        when(userMapper.toUserResponse(user1)).thenReturn(userResponse1);
        when(userMapper.toUserResponse(user2)).thenReturn(userResponse2);

        // ACT
        List<UserResponse> result = userService.getAllUsers();

        // ASSERT & VERIFY
        assertEquals(2, result.size());
        verify(userRepository).findAll();

    }
}
