import api from './api';
import type {User, UserResponse, CreateUserRequest, UpdateUserRequest} from '../types/user.types'

export const getAllUsers = async () => {
    const response = await api.get<UserResponse[]>('/users');
    return response.data;
}

export const getUserById = async (id: number) => {
    const response = await api.get<UserResponse>(`/users/${id}`);
    return response.data;
}

export const createUser = async (data: CreateUserRequest) :Promise<User> => {
    const response = await api.post<User>('/users', data);
    return response.data;
}

export const updateUser = async (id:number, data: UpdateUserRequest): Promise<User> =>{
    const response = await api.put<User>(`/users/${id}`, data);
    return response.data;
}

export const deactivateUser = async (id:number) => {
    const response = await api.put<User>(`/users/${id}/deactivate`);
    return response.data;
}