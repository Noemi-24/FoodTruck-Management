package com.foodtruck.foodtruckapi.controller;

import com.foodtruck.foodtruckapi.dto.request.CreateExpenseRequest;
import com.foodtruck.foodtruckapi.dto.request.UpdateExpenseRequest;
import com.foodtruck.foodtruckapi.dto.response.ExpenseResponse;
import com.foodtruck.foodtruckapi.entity.Expense;
import com.foodtruck.foodtruckapi.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {
    private final ExpenseService expenseService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<List<ExpenseResponse>> getAllExpenses() {
        List<ExpenseResponse> expenses = expenseService.getAllExpenses();
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<ExpenseResponse> getExpenseById(@PathVariable Integer id) {
        ExpenseResponse expense = expenseService.getExpenseById(id);
        return ResponseEntity.ok(expense);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<ExpenseResponse> createExpense(@Valid @RequestBody CreateExpenseRequest request) {
        ExpenseResponse expense = expenseService.createExpense(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(expense);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ExpenseResponse> updateExpense(
            @PathVariable Integer id,
            @Valid @RequestBody UpdateExpenseRequest request
    ) {
        ExpenseResponse expense = expenseService.updateExpense(id, request);
        return ResponseEntity.ok(expense);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteExpense(@PathVariable Integer id){
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}
