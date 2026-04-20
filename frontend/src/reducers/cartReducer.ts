import type { CartState, CartAction, CartItem } from "../types/cart.types";

const calculateTotals = (items: CartItem[]) => {
    const total = items.reduce(
        (acc, item) => acc + item.priceAtOrder * item.quantity,
        0
    );

    return {total };
};

export const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch(action.type){

        case 'ADD_ITEM':{
            const existingItem = state.items.find(item => item.productId === action.payload.productId);
            
            const newItems = existingItem
                ? state.items.map(item =>
                    item.productId === action.payload.productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                    )
                : [...state.items, { ...action.payload, quantity: 1 }];

            const totals = calculateTotals(newItems);

            return { ...state, items: newItems, ...totals};
        }

        case "REMOVE_ITEM": {
            const newItems = state.items.filter(
                item => item.productId !== action.payload
            );

            const totals = calculateTotals(newItems);

            return { ...state, items: newItems, ...totals };
        }

        case "UPDATE_QUANTITY": {
            const newItems = state.items.map(item =>
                item.productId === action.payload.productId
                ? {
                    ...item,
                    quantity: Math.max(1, action.payload.quantity) 
                    }
                : item
            );

            const totals = calculateTotals(newItems);

            return { ...state, items: newItems, ...totals };
        }

        case "CLEAR_CART": {
            return { items: [], total: 0 };
        }

        case 'UPDATE_NOTES': {
            const newItems = state.items.map(item =>
                item.productId === action.payload.productId
                    ? { ...item, notes: action.payload.notes }
                    : item
            );
            return { ...state, items: newItems };
        }
        
        default:
            return state;
    }
};
