package com.foodtruck.foodtruckapi.service.impl;

import com.foodtruck.foodtruckapi.model.Expense;
import com.foodtruck.foodtruckapi.repository.ExpenseRepository;
import com.foodtruck.foodtruckapi.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {
    private final ExpenseRepository expenseRepository;

    @Override
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @Override
    public Expense getExpenseById(Integer id) {
        return expenseRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Expense not found: " + id));
    }

    @Override
    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    @Override
    public Expense updateExpense(Integer id, Expense expense) {
        if(!expenseRepository.existsById(id)) {
            throw new RuntimeException("Expense not found: " + id);
        }
        return expenseRepository.save(expense);
    }

    @Override
    public void deleteExpense(Integer id) {
        if(!expenseRepository.existsById(id)) {
            throw new RuntimeException("Expense not found: " + id);
        }
        expenseRepository.deleteById(id);
    }
}
