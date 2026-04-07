import api from './api';
import type {CreateCategoryRequest, Category, CategoryResponse, UpdateCategoryRequest} from '../types/category.types'

export const getAllCategories = async () => {
    const response = await api.get<CategoryResponse[]>('/categories');
    return response.data;
}

export const getCategoryById = async (id: number) => {
    const response = await api.get<CategoryResponse>(`/categories/${id}`);
    return response.data;
}

export const createCategory = async (data: CreateCategoryRequest) :Promise<Category> => {
    const response = await api.post<Category>('/categories', data);
    return response.data;
}

export const updateCategory = async (id:number, data: UpdateCategoryRequest): Promise<Category> =>{
    const response = await api.put<Category>(`/categories/${id}`, data);
    return response.data;
}

export const deleteCategory = async (id:number) => {
    await api.delete(`/categories/${id}`);
}