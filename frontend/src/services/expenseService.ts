import api from './api';
import type { ExpenseResponse, CreateExpenseRequest, UpdateExpenseRequest, Expense } from '../types/expense.types';

export const getAllExpenses = async () => {
    const response = await api.get<ExpenseResponse[]>('/expenses');
    return response.data;
}

export const getExpenseById = async (id: number) => {
    const response = await api.get<ExpenseResponse>(`/expenses/${id}`);
    return response.data;
}

export const createExpense = async (data: CreateExpenseRequest) :Promise<Expense> => {
    const response = await api.post<Expense>('/expenses', data);
    return response.data;
}

export const updateExpense = async (id:number, data: UpdateExpenseRequest): Promise<Expense> =>{
    const response = await api.put<Expense>(`/expenses/${id}`, data);
    return response.data;
}

export const deleteExpense = async (id:number) => {
    await api.delete(`/expenses/${id}`);
}