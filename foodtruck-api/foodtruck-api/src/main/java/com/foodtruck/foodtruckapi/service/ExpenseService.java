package com.foodtruck.foodtruckapi.service;

import com.foodtruck.foodtruckapi.entity.Expense;

import java.util.List;

public interface ExpenseService {
    List<Expense> getAllExpenses();
    Expense getExpenseById(Integer id);
    Expense createExpense(Expense expense);
    Expense updateExpense(Integer id, Expense expense);
    void deleteExpense(Integer id);
}
