import api from './api';
import type { OrderResponse, CreateOrderRequest, Order, OrderStatus} from '../types/order.types';

export const getAllOrders = async () => {
    const response = await api.get<OrderResponse[]>('/orders');
    return response.data;
}

export const getOrderById = async (id: number) => {
    const response = await api.get<OrderResponse>(`/orders/${id}`);
    return response.data;
}

export const createOrder = async (data: CreateOrderRequest) :Promise<Order> => {
    const response = await api.post<Order>('/orders', data);
    return response.data;
}

export const updateOrderStatus = async (id:number, data: OrderStatus): Promise<Order> => {
    const response = await api.put<Order>(`/orders/${id}/status?status=${data}`);
    return response.data;
}

