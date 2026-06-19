package com.viajesm.dto;

import jakarta.validation.constraints.*;

// DTO = Data Transfer Object. Define lo que el cliente debe enviar en el body.
public class ViajeRequest {

  @NotBlank(message = "El tipo es obligatorio")
  private String tipo;

  @NotBlank(message = "El origen es obligatorio")
  private String origen;

  @NotBlank(message = "El destino es obligatorio")
  private String destino;

  @NotNull(message = "La fecha es obligatoria")
  private String fecha; // ISO: "2026-06-19"

  @NotNull(message = "El costo es obligatorio")
  @Min(value = 0, message = "El costo no puede ser negativo")
  private Double costo;

  public String getTipo() { return tipo; }
  public void setTipo(String tipo) { this.tipo = tipo; }

  public String getOrigen() { return origen; }
  public void setOrigen(String origen) { this.origen = origen; }

  public String getDestino() { return destino; }
  public void setDestino(String destino) { this.destino = destino; }

  public String getFecha() { return fecha; }
  public void setFecha(String fecha) { this.fecha = fecha; }

  public Double getCosto() { return costo; }
  public void setCosto(Double costo) { this.costo = costo; }
}
