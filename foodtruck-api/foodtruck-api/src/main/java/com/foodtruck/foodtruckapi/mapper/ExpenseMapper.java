package com.foodtruck.foodtruckapi.mapper;

import com.foodtruck.foodtruckapi.dto.request.CreateExpenseRequest;
import com.foodtruck.foodtruckapi.dto.response.ExpenseResponse;
import com.foodtruck.foodtruckapi.entity.Expense;
import com.foodtruck.foodtruckapi.entity.User;
import org.springframework.stereotype.Component;

@Component
public class ExpenseMapper {

    public ExpenseResponse toExpenseResponse(Expense expense) {
        ExpenseResponse response = new ExpenseResponse();
        response.setExpenseId(expense.getExpenseId());
        response.setRecordedByUserId(expense.getRecordedByUser().getUserId());
        response.setRecordedByUserName(expense.getRecordedByUser().getName());
        response.setDate(expense.getDate());
        response.setAmount(expense.getAmount());
        response.setCategory(expense.getCategory());
        response.setDescription(expense.getDescription());
        response.setReceiptUrl(expense.getReceiptUrl());
        return response;
    }

    public Expense toExpense(CreateExpenseRequest request, User user) {
        Expense expense = new Expense();
        expense.setRecordedByUser(user);
        expense.setDate(request.getDate());
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setDescription(request.getDescription());
        expense.setReceiptUrl(request.getReceiptUrl());
        return expense;
    }
}