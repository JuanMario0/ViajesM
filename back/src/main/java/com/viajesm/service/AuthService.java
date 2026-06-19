package com.viajesm.service;

import com.viajesm.config.JwtUtil;
import com.viajesm.dto.AuthResponse;
import com.viajesm.dto.LoginRequest;
import com.viajesm.dto.RegisterRequest;
import com.viajesm.model.Usuario;
import com.viajesm.repository.UsuarioRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  private final UsuarioRepository usuarioRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtil jwtUtil;
  private final AuthenticationManager authenticationManager;

  public AuthService(UsuarioRepository usuarioRepository,
                     PasswordEncoder passwordEncoder,
                     JwtUtil jwtUtil,
                     AuthenticationManager authenticationManager) {
    this.usuarioRepository = usuarioRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtUtil = jwtUtil;
    this.authenticationManager = authenticationManager;
  }

  public AuthResponse register(RegisterRequest request) {
    if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
      throw new RuntimeException("El email ya está registrado");
    }

    Usuario user = new Usuario();
    user.setNombre(request.getNombre());
    user.setEmail(request.getEmail());
    user.setPassword(passwordEncoder.encode(request.getPassword()));

    usuarioRepository.save(user);

    String token = jwtUtil.generateToken(user.getEmail());
    return new AuthResponse(token, user.getEmail(), user.getNombre());
  }

  public AuthResponse login(LoginRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

    Usuario user = usuarioRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));

    String token = jwtUtil.generateToken(user.getEmail());
    return new AuthResponse(token, user.getEmail(), user.getNombre());
  }
}
