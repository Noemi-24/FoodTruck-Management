package com.foodtruck.foodtruckapi.service;

import com.foodtruck.foodtruckapi.dto.response.DailySalesResponse;
import com.foodtruck.foodtruckapi.dto.response.MonthlyExpenseResponse;
import com.foodtruck.foodtruckapi.dto.response.PopularItemResponse;

import java.util.List;

public interface ReportsService {
    List<MonthlyExpenseResponse> getMonthlyExpenses();
    List<PopularItemResponse> getPopularItems();
    List<DailySalesResponse> getDailySales();
}
