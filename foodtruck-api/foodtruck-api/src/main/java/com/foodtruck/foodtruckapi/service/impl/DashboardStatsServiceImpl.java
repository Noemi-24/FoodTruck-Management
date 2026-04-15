package com.foodtruck.foodtruckapi.service.impl;

import com.foodtruck.foodtruckapi.dto.response.DashboardStatsResponse;
import com.foodtruck.foodtruckapi.entity.DailySales;
import com.foodtruck.foodtruckapi.enums.OrderStatus;
import com.foodtruck.foodtruckapi.repository.DailySalesRepository;
import com.foodtruck.foodtruckapi.repository.ExpenseRepository;
import com.foodtruck.foodtruckapi.repository.OrderRepository;
import com.foodtruck.foodtruckapi.service.DashboardStatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DashboardStatsServiceImpl implements DashboardStatsService {
    private final DailySalesRepository dailySalesRepository;
    private final OrderRepository orderRepository;
    private final ExpenseRepository expenseRepository;

    @Override
    public DashboardStatsResponse getDashboardStats() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        DashboardStatsResponse response = new DashboardStatsResponse();
        LocalDate date = LocalDate.now();
        Long ordersToday;
        BigDecimal revenueToday;
        Long pendingOrders;
        BigDecimal expenses;
        boolean isAdmin = false;

        Optional<DailySales> dailySales = dailySalesRepository.findBySaleDate(date);
        if (dailySales.isPresent()){
            ordersToday = dailySales.get().getTotalOrders();
            revenueToday = dailySales.get().getTotalRevenue();
        }else{
            ordersToday = 0L;
            revenueToday = BigDecimal.ZERO;
        }

        pendingOrders = orderRepository.countByStatus(OrderStatus.PENDING);

        if (authentication != null && authentication.isAuthenticated()) {
            isAdmin = authentication.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));
        }
        if(isAdmin){
            expenses = expenseRepository.sumAmountByExpenseDate(date);
            if(expenses == null){
                expenses = BigDecimal.ZERO;
            }
            response.setExpensesToday(expenses);
        }else{
            response.setExpensesToday(null);
        }

        response.setOrdersToday(ordersToday);
        response.setRevenueToday(revenueToday);
        response.setPendingOrders(pendingOrders);

        return response;

    }
}
