import api from './api';
import type { PopularItemResponse, MonthlyExpenseResponse, DailySalesResponse } from '../types/reports.types';

export const getPopularItems = async () => {
    const response = await api.get<PopularItemResponse[]>('/reports/popular-items');
    return response.data;
}

export const getMonthlyExpenses = async () => {
    const response = await api.get<MonthlyExpenseResponse[]>('/reports/monthly-expenses');
    return response.data;
}

export const getDailySales = async () => {
    const response = await api.get<DailySalesResponse[]>('/reports/daily-sales');
    return response.data;
}