package com.foodtruck.foodtruckapi.service;

import com.foodtruck.foodtruckapi.dto.request.CreateExpenseRequest;
import com.foodtruck.foodtruckapi.dto.request.UpdateExpenseRequest;
import com.foodtruck.foodtruckapi.dto.response.ExpenseResponse;
import com.foodtruck.foodtruckapi.entity.Expense;

import java.util.List;

public interface ExpenseService {
    ExpenseResponse createExpense(CreateExpenseRequest request);
    ExpenseResponse updateExpense(Integer id, UpdateExpenseRequest request);
    ExpenseResponse getExpenseById(Integer id);
    List<ExpenseResponse> getAllExpenses();
    void deleteExpense(Integer id);
}
