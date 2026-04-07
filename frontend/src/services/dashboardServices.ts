import api from './api';
import type { DashboardStatsResponse } from '../types/dashboard.types';

const getDashboardStats = async () => {
    const response = await api.get<DashboardStatsResponse>('/dashboard/stats');
    return response.data;
}

export {getDashboardStats};