export interface CreateCategoryRequest{
    name: string;
}

export interface Category {
    categoryId: number;
    name: string;
    createdAt: Date;
}

export interface CategoryResponse{
    categoryId: number;
    name: string;
};

export type UpdateCategoryRequest = CreateCategoryRequest