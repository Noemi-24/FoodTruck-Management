export interface Order{
    orderId: number;
    processedByUser: number | null;
    processedByUserName: string | null;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    total: number;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    orderDate: Date;
    updatedAt: Date;
    items: OrderItem[];
}

export type OrderStatus = 'PENDING' | 'IN_PREPARATION' | 'READY' | 'DELIVERED' | 'CANCELLED';
export type PaymentMethod = 'CASH' | 'STRIPE';

export interface CreateOrderRequest{
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    paymentMethod: PaymentMethod;
    status: OrderStatus;
    note: string;
    items: OrderItemRequest[];
}

export interface OrderItem{
    orderItemId: number;
    productId: number;
    productName: string;
    quantity: number;
    priceAtOrder: number;
    subtotal: number;
    notes: string;
}

export interface OrderItemRequest{
    productId: number;
    quantity: number;
    notes: string;
}

export type OrderItemResponse = OrderItem;

export type OrderResponse = Order;
