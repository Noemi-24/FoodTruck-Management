package com.foodtruck.foodtruckapi.exception;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ConflictException extends RuntimeException {
    String message;

    public ConflictException(String message) {
        super(String.format("Conflict Exception: %s", message));
        this.message = message;
    }
}
