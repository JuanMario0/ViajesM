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

@RestController // Expone endpoints REST
@RequestMapping("/api/viajes") // Base URL para este controller
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

  @PostMapping
  public ResponseEntity<Viaje> crear(@Valid @RequestBody ViajeRequest req) {
    Viaje v = new Viaje(req.getTipo(), req.getOrigen(), req.getDestino(),
        LocalDate.parse(req.getFecha()), req.getCosto());
    return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(v));
  }

  @PutMapping("/{id}")
  public Viaje actualizar(@PathVariable Long id, @Valid @RequestBody ViajeRequest req) {
    Viaje v = new Viaje(req.getTipo(), req.getOrigen(), req.getDestino(),
        LocalDate.parse(req.getFecha()), req.getCosto());
    return service.actualizar(id, v);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> eliminar(@PathVariable Long id) {
    service.eliminar(id);
    return ResponseEntity.noContent().build();
  }
}
