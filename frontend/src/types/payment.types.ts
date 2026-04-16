export interface PaymentIntentResponse {
    clientSecret: string;
}

export interface PaymentIntentRequest {
    amount: number;
}