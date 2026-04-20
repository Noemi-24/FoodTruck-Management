export type CartItem = {
    productId: number;
    productName: string;
    imageUrl: string;
    quantity: number;
    priceAtOrder: number;
    subtotal: number;
    notes: string;
}

export type CartState = {
    items: CartItem[];
    total: number;
}

export type CartAction = 
    | { type: 'ADD_ITEM'; payload: CartItem }
    | { type: 'REMOVE_ITEM'; payload: number }
    | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'UPDATE_NOTES'; payload: { productId: number; notes: string } }