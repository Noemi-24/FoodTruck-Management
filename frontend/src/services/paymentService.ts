import api from './api';
import type { PaymentIntentResponse } from '../types/payment.types'

export const createPaymentIntent = async (amount: number) => {
    const response = await api.post<PaymentIntentResponse>('/payments/create-intent', { amount });
    return response.data;
};