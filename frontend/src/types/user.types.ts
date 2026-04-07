export interface UserResponse{
    userId: number;
    name: string;
    email: string;
    role: UserRole;
    active: boolean;
}

export interface User extends UserResponse{
    password: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}

export type UserRole = 'ADMIN' | 'EMPLOYEE';

export interface UpdateUserRequest{
    name: string;
    email: string;
    phone: string;
    role: UserRole;
}

export interface CreateUserRequest extends UpdateUserRequest{
    password: string;
}