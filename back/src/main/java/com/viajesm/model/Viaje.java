package com.viajesm.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity // Esta clase es una tabla en la base de datos
@Table(name = "viajes")
public class Viaje {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String tipo; // Tren Ligero, Combi, Trolebús

  @Column(nullable = false)
  private String origen;

  @Column(nullable = false)
  private String destino;

  @Column(nullable = false)
  private LocalDate fecha;

  @Column(nullable = false)
  private Double costo;

  public Viaje() {}

  public Viaje(String tipo, String origen, String destino, LocalDate fecha, Double costo) {
    this.tipo = tipo;
    this.origen = origen;
    this.destino = destino;
    this.fecha = fecha;
    this.costo = costo;
  }

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
}
