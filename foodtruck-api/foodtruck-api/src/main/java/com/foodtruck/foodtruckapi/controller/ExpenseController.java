package com.foodtruck.foodtruckapi.controller;

import com.foodtruck.foodtruckapi.model.Expense;
import com.foodtruck.foodtruckapi.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {
    private final ExpenseService expenseService;

    @GetMapping
    public List<Expense> getAllExpenses(){
        return expenseService.getAllExpenses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Integer id){
       Expense expense = expenseService.getExpenseById(id);
       return ResponseEntity.ok().body(expense);
    }

    @PostMapping
    public Expense createExpense(@Valid @RequestBody Expense expense){
        return expenseService.createExpense(expense);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Integer id, @Valid @RequestBody Expense expense){
        expense.setExpenseId(id);
        Expense updatedExpense = expenseService.updateExpense(id, expense);
        return ResponseEntity.ok(updatedExpense);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Integer id){
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}
