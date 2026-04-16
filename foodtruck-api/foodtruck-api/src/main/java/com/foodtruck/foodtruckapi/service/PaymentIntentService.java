package com.foodtruck.foodtruckapi.service;

import com.foodtruck.foodtruckapi.dto.request.PaymentIntentRequest;
import com.foodtruck.foodtruckapi.dto.response.PaymentIntentResponse;

public interface PaymentIntentService {
    PaymentIntentResponse createIntent(PaymentIntentRequest intentRequest);
}
