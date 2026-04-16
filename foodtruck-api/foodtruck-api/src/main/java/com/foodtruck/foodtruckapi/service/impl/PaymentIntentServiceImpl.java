package com.foodtruck.foodtruckapi.service.impl;

import com.foodtruck.foodtruckapi.dto.request.PaymentIntentRequest;
import com.foodtruck.foodtruckapi.dto.response.PaymentIntentResponse;
import com.foodtruck.foodtruckapi.service.PaymentIntentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentIntentServiceImpl implements PaymentIntentService {

    @Override
    public PaymentIntentResponse createIntent(PaymentIntentRequest request) {
        try {
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(request.getAmount())
                    .setCurrency("usd")
                    .build();
            PaymentIntent intent = PaymentIntent.create(params);
            return new PaymentIntentResponse(intent.getClientSecret());
        } catch (StripeException e) {
            throw new RuntimeException("Error creating payment intent: " + e.getMessage());
        }
    }
}
