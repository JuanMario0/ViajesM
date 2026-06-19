package com.viajesm.service;

import com.viajesm.repository.ViajeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service // Agrega datos estadísticos para el dashboard
public class StatsService {

  private final ViajeRepository repo;

  public StatsService(ViajeRepository repo) {
    this.repo = repo;
  }

  public Map<String, Object> obtener() {
    LocalDate hoy = LocalDate.now();
    LocalDate inicioMes = hoy.withDayOfMonth(1);
    LocalDate finMes = hoy.withDayOfMonth(hoy.lengthOfMonth());

    Map<String, Object> stats = new LinkedHashMap<>();

    // Total de viajes
    stats.put("totalViajes", repo.count());

    // Gasto hoy
    stats.put("gastoHoy", repo.sumCostBetween(hoy, hoy));

    // Gasto este mes
    stats.put("gastoMes", repo.sumCostBetween(inicioMes, finMes));

    // Transporte más usado
    List<Object[]> freq = repo.countByTipo();
    stats.put("masUsado", freq.isEmpty() ? null : freq.get(0)[0]);

    // Frecuencia por tipo
    Map<String, Long> frecuencia = new LinkedHashMap<>();
    freq.forEach(f -> frecuencia.put((String) f[0], (Long) f[1]));
    stats.put("frecuencia", frecuencia);

    // Gasto por tipo
    Map<String, Double> gastoPorTipo = new LinkedHashMap<>();
    repo.sumCostByTipo().forEach(f -> gastoPorTipo.put((String) f[0], (Double) f[1]));
    stats.put("gastoPorTipo", gastoPorTipo);

    return stats;
  }
}
