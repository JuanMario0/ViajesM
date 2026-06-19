package com.viajesm.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.persistence.EntityNotFoundException;
import java.util.Map;

@RestControllerAdvice // Atrapa errores de los controllers y devuelve JSON bonito
public class ErrorHandler {

  @ExceptionHandler(EntityNotFoundException.class)
  public ResponseEntity<Map<String, String>> notFound(EntityNotFoundException e) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(Map.of("error", e.getMessage()));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, String>> validacion(MethodArgumentNotValidException e) {
    String msg = e.getBindingResult().getFieldErrors().stream()
        .map(f -> f.getField() + ": " + f.getDefaultMessage())
        .reduce((a, b) -> a + "; " + b)
        .orElse("Error de validación");
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(Map.of("error", msg));
  }
}
