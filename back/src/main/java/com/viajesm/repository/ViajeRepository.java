package com.viajesm.repository;

import com.viajesm.model.Viaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository // Spring crea automáticamente los métodos CRUD gracias a JpaRepository
public interface ViajeRepository extends JpaRepository<Viaje, Long> {

  // Buscar por tipo de transporte
  List<Viaje> findByTipo(String tipo);

  // Buscar por fecha exacta
  List<Viaje> findByFecha(LocalDate fecha);

  // Viajes de un mes específico (entre dos fechas)
  List<Viaje> findByFechaBetween(LocalDate inicio, LocalDate fin);

  // Cuenta cuántos viajes hay por cada tipo de transporte
  @Query("SELECT v.tipo, COUNT(v) FROM Viaje v GROUP BY v.tipo ORDER BY COUNT(v) DESC")
  List<Object[]> countByTipo();

  // Suma los costos por cada tipo de transporte
  @Query("SELECT v.tipo, SUM(v.costo) FROM Viaje v GROUP BY v.tipo")
  List<Object[]> sumCostByTipo();

  // Gasto total de un mes específico
  @Query("SELECT COALESCE(SUM(v.costo), 0) FROM Viaje v WHERE v.fecha BETWEEN ?1 AND ?2")
  Double sumCostBetween(LocalDate inicio, LocalDate fin);
}
