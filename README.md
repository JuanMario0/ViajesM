# ViajesM

Dashboard de gastos de transporte para CDMX + API REST.

```
viajesm/
├── front/          # Dashboard HTML + Tailwind + Vanilla JS
├── back/           # API REST Spring Boot + H2
└── .agents/skills/ # Skills para el agente AI
```

## Frontend

```bash
npx serve front
```

- HTML + CSS (Tailwind CDN) + Vanilla JS
- Sin build step, sin dependencias, sin framework
- Persistencia en localStorage

## Backend

```bash
cd back
mvn spring-boot:run
# API en http://localhost:8080
```

## API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/viajes?tipo=all` | Listar viajes |
| POST | `/api/viajes` | Crear viaje |
| PUT | `/api/viajes/{id}` | Actualizar viaje |
| DELETE | `/api/viajes/{id}` | Eliminar viaje |
| GET | `/api/stats` | Estadísticas del dashboard |
| GET | `/h2-console` | Consola BD (sin contraseña) |

## Skills

Ver `front/README.md`.
