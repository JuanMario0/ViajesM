package com.viajesm.config;

import com.viajesm.repository.UsuarioRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

  private final JwtUtil jwtUtil;
  private final UsuarioRepository usuarioRepository;

  public JwtAuthenticationFilter(JwtUtil jwtUtil, UsuarioRepository usuarioRepository) {
    this.jwtUtil = jwtUtil;
    this.usuarioRepository = usuarioRepository;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request,
                                  HttpServletResponse response,
                                  FilterChain filterChain) throws ServletException, IOException {
    String path = request.getServletPath();
    String method = request.getMethod();
    String authHeader = request.getHeader("Authorization");

    log.info("=== FILTER: {} {} | Auth: {} | ContentType: {}", method, path,
        authHeader != null ? "present" : "none", request.getContentType());

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      log.info("→ No Bearer token, passing through");
      filterChain.doFilter(request, response);
      return;
    }

    String token = authHeader.substring(7);
    if (!jwtUtil.isTokenValid(token)) {
      log.warn("→ Token INVALID");
      filterChain.doFilter(request, response);
      return;
    }

    String email = jwtUtil.extractEmail(token);
    var userOpt = usuarioRepository.findByEmail(email);
    if (userOpt.isEmpty()) {
      log.warn("→ User NOT found: {}", email);
      filterChain.doFilter(request, response);
      return;
    }

    UsernamePasswordAuthenticationToken authToken =
        new UsernamePasswordAuthenticationToken(userOpt.get(), null, null);
    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    SecurityContextHolder.getContext().setAuthentication(authToken);
    log.info("→ Authentication SET for: {}", email);

    filterChain.doFilter(request, response);
  }

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) {
    String path = request.getServletPath();
    return path.startsWith("/api/auth/") || "OPTIONS".equalsIgnoreCase(request.getMethod());
  }
}
