# ViajesM

Dashboard de gastos de transporte para CDMX (Tren Ligero, Combi, Trolebús).

## Skills utilizadas

| Skill | Propósito |
|---|---|
| **ui-skills-root** | Router para elegir el skill correcto |
| **baseline-ui** | Tipografía (Inter), Tailwind, `text-balance`, `tabular-nums`, sin gradientes |
| **fixing-accessibility** | `aria-label`, `aria-modal`, `aria-hidden`, labels de formulario, jerarquía |
| **fixing-motion-performance** | `prefers-reduced-motion`, transiciones solo en compositor |
| **fixing-metadata** | title, charset, viewport |
| **ponytail** | Lazy senior dev: 1 modal en lugar de 2, sin React, sin chart lib, sin build step |
| **ponytail-review** | Revisión de over-engineering |
| **ponytail-audit** | Auditoría de bloat en el código |

## Stack

- HTML + CSS (Tailwind CDN) + Vanilla JS
- Sin build step, sin dependencias, sin framework
- Persistencia en localStorage
