package com.foodtruck.foodtruckapi.exception;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BadRequestException extends RuntimeException {
    String message;

    public BadRequestException(String message) {
        super(String.format("Bad Request: %s", message));
        this.message = message;
    }
}
