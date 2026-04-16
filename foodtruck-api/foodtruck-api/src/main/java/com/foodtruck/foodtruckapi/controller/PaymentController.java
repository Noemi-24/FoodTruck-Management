package com.foodtruck.foodtruckapi.controller;

import com.foodtruck.foodtruckapi.dto.request.PaymentIntentRequest;
import com.foodtruck.foodtruckapi.dto.response.PaymentIntentResponse;
import com.foodtruck.foodtruckapi.service.PaymentIntentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {
    public final PaymentIntentService paymentIntentService;

    @PostMapping("/create-intent")
    public ResponseEntity<PaymentIntentResponse> createIntent(@Valid @RequestBody PaymentIntentRequest intentRequest) {
        PaymentIntentResponse response = paymentIntentService.createIntent(intentRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
