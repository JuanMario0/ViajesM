package com.viajesm.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "viajes")
public class Viaje {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String tipo;

  @Column(nullable = false)
  private String origen;

  @Column(nullable = false)
  private String destino;

  @Column(nullable = false)
  private LocalDate fecha;

  @Column(nullable = false)
  private Double costo;

  @Column
  private String horaSalida;

  @Column
  private String horaLlegada;

  @Column
  private Double origenLat;

  @Column
  private Double origenLng;

  @Column
  private Double destinoLat;

  @Column
  private Double destinoLng;

  public Viaje() {}

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public String getTipo() { return tipo; }
  public void setTipo(String tipo) { this.tipo = tipo; }

  public String getOrigen() { return origen; }
  public void setOrigen(String origen) { this.origen = origen; }

  public String getDestino() { return destino; }
  public void setDestino(String destino) { this.destino = destino; }

  public LocalDate getFecha() { return fecha; }
  public void setFecha(LocalDate fecha) { this.fecha = fecha; }

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
