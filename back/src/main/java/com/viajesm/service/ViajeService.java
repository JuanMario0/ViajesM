package com.viajesm.service;

import com.viajesm.model.Viaje;
import com.viajesm.repository.ViajeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service // Lógica de negocio — intermediario entre controller y repository
public class ViajeService {

  private final ViajeRepository repo;

  public ViajeService(ViajeRepository repo) {
    this.repo = repo;
  }

  public List<Viaje> listar(String tipo) {
    if (tipo == null || tipo.isEmpty() || tipo.equals("all"))
      return repo.findAll();
    return repo.findByTipo(tipo);
  }

  public Viaje obtener(Long id) {
    return repo.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Viaje no encontrado"));
  }

  public Viaje crear(Viaje v) {
    return repo.save(v);
  }

  public Viaje actualizar(Long id, Viaje datos) {
    Viaje v = obtener(id);
    v.setTipo(datos.getTipo());
    v.setOrigen(datos.getOrigen());
    v.setDestino(datos.getDestino());
    v.setFecha(datos.getFecha());
    v.setCosto(datos.getCosto());
    v.setHoraSalida(datos.getHoraSalida());
    v.setHoraLlegada(datos.getHoraLlegada());
    v.setOrigenLat(datos.getOrigenLat());
    v.setOrigenLng(datos.getOrigenLng());
    v.setDestinoLat(datos.getDestinoLat());
    v.setDestinoLng(datos.getDestinoLng());
    return repo.save(v);
  }

  public void eliminar(Long id) {
    Viaje v = obtener(id);
    repo.delete(v);
  }
}
