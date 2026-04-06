package com.foodtruck.foodtruckapi.controller;

import com.foodtruck.foodtruckapi.dto.response.DashboardStatsResponse;
import com.foodtruck.foodtruckapi.service.DashboardStatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardStatsController {
    private final DashboardStatsService dashboardStatsService;

    @GetMapping("/stats")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public DashboardStatsResponse getDashboardStats(){
        return dashboardStatsService.getDashboardStats();
    }
}
