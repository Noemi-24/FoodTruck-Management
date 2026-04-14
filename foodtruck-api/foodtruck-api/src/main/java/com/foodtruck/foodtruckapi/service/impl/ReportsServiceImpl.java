package com.foodtruck.foodtruckapi.service.impl;

import com.foodtruck.foodtruckapi.dto.response.MonthlyExpenseResponse;
import com.foodtruck.foodtruckapi.dto.response.PopularItemResponse;
import com.foodtruck.foodtruckapi.repository.MonthlyExpensesRepository;
import com.foodtruck.foodtruckapi.repository.PopularItemsRepository;
import com.foodtruck.foodtruckapi.service.ReportsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class ReportsServiceImpl implements ReportsService {
    private final MonthlyExpensesRepository monthlyExpensesRepository;
    private final PopularItemsRepository popularItemsRepository;

    public List<MonthlyExpenseResponse> getMonthlyExpenses() {
        return monthlyExpensesRepository.findAll()
                .stream()
                .map(expense -> new MonthlyExpenseResponse(
                        expense.getMonth(),
                        expense.getCategory(),
                        expense.getExpenseCount(),
                        expense.getTotalAmount()
                ))
                .toList();
    }

    @Override
    public List<PopularItemResponse> getPopularItems() {
        return popularItemsRepository.findAll()
                .stream()
                .map(item -> new PopularItemResponse(
                        item.getProductId(),
                        item.getName(),
                        item.getCategoryName(),
                        item.getTimesOrdered(),
                        item.getTotalRevenue()
                ))
                .toList();
    }
}
