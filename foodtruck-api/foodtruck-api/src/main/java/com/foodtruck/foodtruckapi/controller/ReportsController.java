package com.foodtruck.foodtruckapi.controller;

import com.foodtruck.foodtruckapi.dto.response.DailySalesResponse;
import com.foodtruck.foodtruckapi.dto.response.MonthlyExpenseResponse;
import com.foodtruck.foodtruckapi.dto.response.PopularItemResponse;
import com.foodtruck.foodtruckapi.service.DashboardStatsService;
import com.foodtruck.foodtruckapi.service.ReportsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportsController{

    private final ReportsService reportsService;

    @GetMapping("/monthly-expenses")
    @PreAuthorize("hasRole('ADMIN')")
    public List<MonthlyExpenseResponse> getMonthlyExpenses(){
        return reportsService.getMonthlyExpenses();
    }

    @GetMapping("/popular-items")
    @PreAuthorize("hasRole('ADMIN')")
    public List<PopularItemResponse> getPopularItems() {
        return reportsService.getPopularItems();
    }

    @GetMapping("/daily-sales")
    @PreAuthorize("hasRole('ADMIN')")
    public List<DailySalesResponse> getDailySales() {
        return reportsService.getDailySales();
    }
}
