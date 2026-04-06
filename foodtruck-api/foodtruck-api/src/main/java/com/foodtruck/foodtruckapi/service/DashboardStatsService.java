package com.foodtruck.foodtruckapi.service;

import com.foodtruck.foodtruckapi.dto.response.DashboardStatsResponse;
import org.springframework.stereotype.Service;

@Service
public interface DashboardStatsService {
    DashboardStatsResponse getDashboardStats();
}
