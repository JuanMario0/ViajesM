package com.viajesm.dto;

import jakarta.validation.constraints.*;

public class ViajeRequest {

  @NotBlank(message = "El tipo es obligatorio")
  private String tipo;

  @NotBlank(message = "El origen es obligatorio")
  private String origen;

  @NotBlank(message = "El destino es obligatorio")
  private String destino;

  @NotNull(message = "La fecha es obligatoria")
  private String fecha;

  @NotNull(message = "El costo es obligatorio")
  @Min(value = 0, message = "El costo no puede ser negativo")
  private Double costo;

  private String horaSalida;
  private String horaLlegada;
  private Double origenLat;
  private Double origenLng;
  private Double destinoLat;
  private Double destinoLng;

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

  public String getHoraSalida() { return horaSalida; }
  public void setHoraSalida(String horaSalida) { this.horaSalida = horaSalida; }

  public String getHoraLlegada() { return horaLlegada; }
  public void setHoraLlegada(String horaLlegada) { this.horaLlegada = horaLlegada; }

  public Double getOrigenLat() { return origenLat; }
  public void setOrigenLat(Double origenLat) { this.origenLat = origenLat; }

  public Double getOrigenLng() { return origenLng; }
  public void setOrigenLng(Double origenLng) { this.origenLng = origenLng; }

  public Double getDestinoLat() { return destinoLat; }
  public void setDestinoLat(Double destinoLat) { this.destinoLat = destinoLat; }

  public Double getDestinoLng() { return destinoLng; }
  public void setDestinoLng(Double destinoLng) { this.destinoLng = destinoLng; }
}
