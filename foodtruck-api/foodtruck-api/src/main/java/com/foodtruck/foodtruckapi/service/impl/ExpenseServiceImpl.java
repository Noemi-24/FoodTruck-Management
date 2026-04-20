package com.foodtruck.foodtruckapi.service.impl;

import com.foodtruck.foodtruckapi.dto.request.CreateExpenseRequest;
import com.foodtruck.foodtruckapi.dto.request.UpdateExpenseRequest;
import com.foodtruck.foodtruckapi.dto.response.ExpenseResponse;
import com.foodtruck.foodtruckapi.entity.User;
import com.foodtruck.foodtruckapi.exception.ResourceNotFoundException;
import com.foodtruck.foodtruckapi.entity.Expense;
import com.foodtruck.foodtruckapi.mapper.ExpenseMapper;
import com.foodtruck.foodtruckapi.repository.ExpenseRepository;
import com.foodtruck.foodtruckapi.repository.UserRepository;
import com.foodtruck.foodtruckapi.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final ExpenseMapper expenseMapper;

    @Override
    public List<ExpenseResponse> getAllExpenses() {
        return expenseRepository.findAll()
                .stream()
                .map(expenseMapper::toExpenseResponse)
                .toList();
    }

    @Override
    public ExpenseResponse getExpenseById(Integer id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense", "id", id));
        return expenseMapper.toExpenseResponse(expense);
    }

    @Override
    public ExpenseResponse createExpense(CreateExpenseRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            throw new ResourceNotFoundException("User", "auth", "not authenticated");
        }
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        Expense expense = expenseMapper.toExpense(request, user);

        expense.setAmount(request.getAmount().setScale(2, RoundingMode.HALF_UP));

        Expense savedExpense = expenseRepository.save(expense);
        return expenseMapper.toExpenseResponse(savedExpense);
    }

    @Override
    public ExpenseResponse updateExpense(Integer id, UpdateExpenseRequest request) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense", "id", id));

        if (request.getDate() != null) {
            expense.setDate(request.getDate());
        }

        if (request.getAmount() != null) {
            expense.setAmount(request.getAmount().setScale(2, RoundingMode.HALF_UP));
        }

        if (request.getCategory() != null) {
            expense.setCategory(request.getCategory());
        }

        if (request.getDescription() != null) {
            expense.setDescription(request.getDescription());
        }

        if (request.getReceiptUrl() != null) {
            expense.setReceiptUrl(request.getReceiptUrl());
        }

        Expense updatedExpense = expenseRepository.save(expense);
        return expenseMapper.toExpenseResponse(updatedExpense);
    }

    @Override
    public void deleteExpense(Integer id) {
        if(!expenseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Expense", "id", id);
        }
        expenseRepository.deleteById(id);
    }
}
