export interface ProductResponse{
    productId: number;
    categoryId: number;
    categoryName: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    available: boolean;
    isSpecial: boolean;
   
}

export interface Product extends ProductResponse{
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateProductRequest{
    categoryId: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    isSpecial: boolean;
}

export interface UpdateProductRequest{
    categoryId?: number;
    name?: string;
    description?: string;
    price?: number;
    imageUrl?: string;
    isSpecial?: boolean;
    available?: boolean;
}