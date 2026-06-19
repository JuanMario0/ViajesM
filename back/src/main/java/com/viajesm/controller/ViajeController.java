package com.viajesm.controller;

import com.viajesm.dto.ViajeRequest;
import com.viajesm.model.Viaje;
import com.viajesm.service.ViajeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/viajes")
public class ViajeController {

  private final ViajeService service;

  public ViajeController(ViajeService service) {
    this.service = service;
  }

  @GetMapping
  public List<Viaje> listar(@RequestParam(defaultValue = "all") String tipo) {
    return service.listar(tipo);
  }

  @GetMapping("/{id}")
  public Viaje obtener(@PathVariable Long id) {
    return service.obtener(id);
  }

  private Viaje mapear(ViajeRequest req) {
    Viaje v = new Viaje();
    v.setTipo(req.getTipo());
    v.setOrigen(req.getOrigen());
    v.setDestino(req.getDestino());
    v.setFecha(LocalDate.parse(req.getFecha()));
    v.setCosto(req.getCosto());
    v.setHoraSalida(req.getHoraSalida());
    v.setHoraLlegada(req.getHoraLlegada());
    v.setOrigenLat(req.getOrigenLat());
    v.setOrigenLng(req.getOrigenLng());
    v.setDestinoLat(req.getDestinoLat());
    v.setDestinoLng(req.getDestinoLng());
    return v;
  }

  @PostMapping
  public ResponseEntity<Viaje> crear(@Valid @RequestBody ViajeRequest req) {
    return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(mapear(req)));
  }

  @PutMapping("/{id}")
  public Viaje actualizar(@PathVariable Long id, @Valid @RequestBody ViajeRequest req) {
    return service.actualizar(id, mapear(req));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> eliminar(@PathVariable Long id) {
    service.eliminar(id);
    return ResponseEntity.noContent().build();
  }
}
