package com.foodtruck.foodtruckapi.service;

import com.foodtruck.foodtruckapi.dto.request.CreateExpenseRequest;
import com.foodtruck.foodtruckapi.dto.request.UpdateExpenseRequest;
import com.foodtruck.foodtruckapi.dto.response.ExpenseResponse;
import com.foodtruck.foodtruckapi.entity.Expense;
import com.foodtruck.foodtruckapi.entity.User;
import com.foodtruck.foodtruckapi.exception.ResourceNotFoundException;
import com.foodtruck.foodtruckapi.mapper.ExpenseMapper;
import com.foodtruck.foodtruckapi.repository.ExpenseRepository;
import com.foodtruck.foodtruckapi.repository.UserRepository;
import com.foodtruck.foodtruckapi.service.impl.ExpenseServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.foodtruck.foodtruckapi.enums.ExpenseCategory.FUEL;
import static com.foodtruck.foodtruckapi.enums.ExpenseCategory.SUPPLIES;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ExpenseServiceImplTest {
    @Mock
    private ExpenseRepository expenseRepository;

    @Mock
    private ExpenseMapper expenseMapper;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ExpenseServiceImpl expenseService;

    @Test
    void testCreateExpense_Success(){
        // ARRANGE
        CreateExpenseRequest request = new CreateExpenseRequest();
        request.setDate(LocalDate.now());
        request.setAmount(BigDecimal.valueOf(100));
        request.setCategory(FUEL);
        request.setDescription("Test expense");

        User user = new User();
        user.setUserId(1);
        user.setName("Test User");
        user.setEmail("test@email.com");

        Expense expense = new Expense();
        expense.setAmount(BigDecimal.valueOf(100));
        expense.setCategory(FUEL);
        expense.setDescription("Test expense");
        expense.setRecordedByUser(user);

        Expense savedExpense = new Expense();
        savedExpense.setExpenseId(1);
        savedExpense.setAmount(BigDecimal.valueOf(100));
        savedExpense.setCategory(FUEL);
        savedExpense.setDescription("Test expense");
        savedExpense.setRecordedByUser(user);

        ExpenseResponse response = new ExpenseResponse();
        response.setExpenseId(1);
        response.setRecordedByUserId(1);
        response.setAmount(BigDecimal.valueOf(100));
        response.setCategory(FUEL);
        response.setDescription("Test expense");

        Authentication auth = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(auth);
        when(auth.getName()).thenReturn("test@email.com");
        SecurityContextHolder.setContext(securityContext);

        when(auth.isAuthenticated()).thenReturn(true);
        when(userRepository.findByEmail("test@email.com")).thenReturn(Optional.of(user));
        when(expenseMapper.toExpense(request, user)).thenReturn(expense);  // ← expense, no savedExpense
        when(expenseRepository.save(any(Expense.class))).thenReturn(savedExpense);  // ← any()
        when(expenseMapper.toExpenseResponse(savedExpense)).thenReturn(response);  // ← savedExpense

        // ACT
        ExpenseResponse result = expenseService.createExpense(request);

        // ASSERT
        assertNotNull(result);
        assertEquals(1, result.getExpenseId());
        assertEquals(BigDecimal.valueOf(100), result.getAmount());
        assertEquals(FUEL, result.getCategory());
        assertEquals("Test expense", result.getDescription());

        // VERIFY
        verify(userRepository).findByEmail("test@email.com");
        verify(expenseMapper).toExpense(request, user);
        verify(expenseRepository).save(any(Expense.class));
    }

    @Test
    void testGetExpenseById_Success() {
        // ARRANGE
        User user = new User();
        user.setUserId(1);
        user.setName("Test User");

        Expense expense = new Expense();
        expense.setExpenseId(1);
        expense.setAmount(BigDecimal.valueOf(100));
        expense.setCategory(FUEL);
        expense.setDescription("Test expense");
        expense.setRecordedByUser(user);

        ExpenseResponse response = new ExpenseResponse();
        response.setExpenseId(1);
        response.setRecordedByUserId(1);
        response.setAmount(BigDecimal.valueOf(100));
        response.setCategory(FUEL);
        response.setDescription("Test expense");

        when(expenseRepository.findById(1)).thenReturn(Optional.of(expense));
        when(expenseMapper.toExpenseResponse(expense)).thenReturn(response);

        // ACT
        ExpenseResponse result = expenseService.getExpenseById(1);

        // ASSERT
        assertNotNull(result);
        assertEquals(1, result.getExpenseId());
        assertEquals(BigDecimal.valueOf(100), result.getAmount());
        verify(expenseRepository).findById(1);
    }

    @Test
    void testGetExpenseById_NotFound_ThrowsException() {
        // ARRANGE
        when(expenseRepository.findById(999)).thenReturn(Optional.empty());

        // ACT & ASSERT
        assertThrows(ResourceNotFoundException.class, () -> {
            expenseService.getExpenseById(999);
        });

        // VERIFY
        verify(expenseRepository).findById(999);
    }

    @Test
    void testGetAllExpenses_Success() {
        // ARRANGE
        User user = new User();
        user.setUserId(1);
        user.setName("Test User");

        List<Expense> expenses = new ArrayList<>();

        Expense expense1 = new Expense();
        expense1.setExpenseId(1);
        expense1.setAmount(BigDecimal.valueOf(100));
        expense1.setCategory(FUEL);
        expense1.setRecordedByUser(user);

        Expense expense2 = new Expense();
        expense2.setExpenseId(2);
        expense2.setAmount(BigDecimal.valueOf(200));
        expense2.setCategory(SUPPLIES);
        expense2.setRecordedByUser(user);

        expenses.add(expense1);
        expenses.add(expense2);

        ExpenseResponse response1 = new ExpenseResponse();
        response1.setExpenseId(1);
        response1.setAmount(BigDecimal.valueOf(100));

        ExpenseResponse response2 = new ExpenseResponse();
        response2.setExpenseId(2);
        response2.setAmount(BigDecimal.valueOf(200));

        when(expenseRepository.findAll()).thenReturn(expenses);
        when(expenseMapper.toExpenseResponse(expense1)).thenReturn(response1);
        when(expenseMapper.toExpenseResponse(expense2)).thenReturn(response2);

        // ACT
        List<ExpenseResponse> result = expenseService.getAllExpenses();

        // ASSERT
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(expenseRepository).findAll();
    }

    @Test
    void testUpdateExpense_Success() {
        // ARRANGE
        User user = new User();
        user.setUserId(1);
        user.setName("Test User");

        Expense expense = new Expense();
        expense.setExpenseId(1);
        expense.setAmount(BigDecimal.valueOf(100));
        expense.setCategory(FUEL);
        expense.setDescription("Old description");
        expense.setRecordedByUser(user);

        UpdateExpenseRequest request = new UpdateExpenseRequest();
        request.setAmount(BigDecimal.valueOf(150));
        request.setDescription("Updated description");

        Expense updatedExpense = new Expense();
        updatedExpense.setExpenseId(1);
        updatedExpense.setAmount(BigDecimal.valueOf(150));
        updatedExpense.setCategory(FUEL);
        updatedExpense.setDescription("Updated description");
        updatedExpense.setRecordedByUser(user);

        ExpenseResponse response = new ExpenseResponse();
        response.setExpenseId(1);
        response.setAmount(BigDecimal.valueOf(150));
        response.setDescription("Updated description");

        when(expenseRepository.findById(1)).thenReturn(Optional.of(expense));
        when(expenseRepository.save(any(Expense.class))).thenReturn(updatedExpense);
        when(expenseMapper.toExpenseResponse(updatedExpense)).thenReturn(response);

        // ACT
        ExpenseResponse result = expenseService.updateExpense(1, request);

        // ASSERT
        assertNotNull(result);
        assertEquals(BigDecimal.valueOf(150), result.getAmount());
        assertEquals("Updated description", result.getDescription());
        verify(expenseRepository).findById(1);
        verify(expenseRepository).save(any(Expense.class));
    }

    @Test
    void testUpdateExpense_NotFound_ThrowsException() {
        // ARRANGE
        UpdateExpenseRequest request = new UpdateExpenseRequest();
        request.setAmount(BigDecimal.valueOf(150));

        when(expenseRepository.findById(999)).thenReturn(Optional.empty());

        // ACT & ASSERT
        assertThrows(ResourceNotFoundException.class, () -> {
            expenseService.updateExpense(999, request);
        });

        // VERIFY
        verify(expenseRepository).findById(999);
        verify(expenseRepository, never()).save(any(Expense.class));
    }

    @Test
    void testDeleteExpense_Success() {
        // ARRANGE
        when(expenseRepository.existsById(1)).thenReturn(true);

        // ACT
        expenseService.deleteExpense(1);

        // VERIFY
        verify(expenseRepository).existsById(1);
        verify(expenseRepository).deleteById(1);
    }

    @Test
    void testDeleteExpense_NotFound_ThrowsException() {
        // ARRANGE
        when(expenseRepository.existsById(999)).thenReturn(false);

        // ACT & ASSERT
        assertThrows(ResourceNotFoundException.class, () -> {
            expenseService.deleteExpense(999);
        });

        // VERIFY
        verify(expenseRepository).existsById(999);
        verify(expenseRepository, never()).deleteById(anyInt());
    }

    @Test
    void testCreateExpense_UserNotFound_ThrowsException() {
        // ARRANGE
        CreateExpenseRequest request = new CreateExpenseRequest();
        request.setAmount(BigDecimal.valueOf(100));
        request.setCategory(FUEL);
        request.setDescription("Test");

        Authentication auth = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(auth);
        when(auth.getName()).thenReturn("test@email.com");
        when(auth.isAuthenticated()).thenReturn(true);
        SecurityContextHolder.setContext(securityContext);

        when(userRepository.findByEmail("test@email.com")).thenReturn(Optional.empty());

        // ACT & ASSERT
        assertThrows(ResourceNotFoundException.class, () -> {
            expenseService.createExpense(request);
        });

        // VERIFY
        verify(userRepository).findByEmail("test@email.com");
        verify(expenseRepository, never()).save(any(Expense.class));
    }

    @Test
    void testUpdateExpense_AllFields_Success() {
        // ARRANGE
        User user = new User();
        user.setUserId(1);
        user.setName("Test User");

        Expense expense = new Expense();
        expense.setExpenseId(1);
        expense.setDate(LocalDate.of(2024, 1, 1));
        expense.setAmount(BigDecimal.valueOf(100));
        expense.setCategory(FUEL);
        expense.setDescription("Old description");
        expense.setReceiptUrl("old-url.jpg");
        expense.setRecordedByUser(user);

        UpdateExpenseRequest request = new UpdateExpenseRequest();
        request.setDate(LocalDate.of(2024, 2, 1));
        request.setAmount(BigDecimal.valueOf(150));
        request.setCategory(SUPPLIES);
        request.setDescription("Updated description");
        request.setReceiptUrl("new-url.jpg");

        Expense updatedExpense = new Expense();
        updatedExpense.setExpenseId(1);
        updatedExpense.setDate(LocalDate.of(2024, 2, 1));
        updatedExpense.setAmount(BigDecimal.valueOf(150));
        updatedExpense.setCategory(SUPPLIES);
        updatedExpense.setDescription("Updated description");
        updatedExpense.setReceiptUrl("new-url.jpg");
        updatedExpense.setRecordedByUser(user);

        ExpenseResponse response = new ExpenseResponse();
        response.setExpenseId(1);
        response.setDate(LocalDate.of(2024, 2, 1));
        response.setAmount(BigDecimal.valueOf(150));
        response.setCategory(SUPPLIES);
        response.setDescription("Updated description");
        response.setReceiptUrl("new-url.jpg");

        when(expenseRepository.findById(1)).thenReturn(Optional.of(expense));
        when(expenseRepository.save(any(Expense.class))).thenReturn(updatedExpense);
        when(expenseMapper.toExpenseResponse(updatedExpense)).thenReturn(response);

        // ACT
        ExpenseResponse result = expenseService.updateExpense(1, request);

        // ASSERT
        assertNotNull(result);
        assertEquals(LocalDate.of(2024, 2, 1), result.getDate());
        assertEquals(BigDecimal.valueOf(150), result.getAmount());
        assertEquals(SUPPLIES, result.getCategory());
        assertEquals("Updated description", result.getDescription());
        assertEquals("new-url.jpg", result.getReceiptUrl());
        verify(expenseRepository).findById(1);
        verify(expenseRepository).save(any(Expense.class));
    }

    @Test
    void testCreateExpense_NotAuthenticated_ThrowsException() {
        Authentication auth = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(auth);
        when(auth.isAuthenticated()).thenReturn(false);
        SecurityContextHolder.setContext(securityContext);

        assertThrows(ResourceNotFoundException.class, () -> {
            expenseService.createExpense(new CreateExpenseRequest());
        });
    }
}
