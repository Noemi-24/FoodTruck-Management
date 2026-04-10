import api from './api';
import type {ProductResponse, CreateProductRequest, UpdateProductRequest, Product} from '../types/product.types'

export const getAllProducts = async () => {
    const response = await api.get<ProductResponse[]>('/products');
    return response.data;
}

export const getProductById = async (id: number) => {
    const response = await api.get<ProductResponse>(`/products/${id}`);
    return response.data;
}

export const createProduct = async (data: CreateProductRequest): Promise<Product> => {
    const response = await api.post<Product>('/products', data);
    return response.data;
}

export const updateProduct = async (id:number, data: UpdateProductRequest): Promise<Product> =>{
    const response = await api.put<Product>(`/products/${id}`, data);
    return response.data;
}

export const updateProductAvailability = async (id:number, available:boolean): Promise<Product> => {
    const response = await api.put<Product>(`/products/${id}/availability?available=${available}`);
    return response.data;
}
