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

## Instalación de skills

Instalar en otro dispositivo (requiere OpenCode o Claude Code):

```bash
# UI Skills (ibelick)
npx skills add ibelick/ui-skills

# Ponytail (DietrichGebert)
npx skills add https://github.com/DietrichGebert/ponytail
```

Esto instala las 10 skills en `.agents/skills/`:

| Skill | Comando individual |
|---|---|
| `ui-skills-root` | `npx ui-skills get ui-skills-root` |
| `baseline-ui` | `npx ui-skills add baseline-ui` |
| `fixing-accessibility` | `npx ui-skills add fixing-accessibility` |
| `fixing-motion-performance` | `npx ui-skills add fixing-motion-performance` |
| `fixing-metadata` | `npx ui-skills add fixing-metadata` |
| `ponytail` | incluida en el pack |
| `ponytail-review` | incluida en el pack |
| `ponytail-audit` | incluida en el pack |
| `ponytail-debt` | incluida en el pack |
| `ponytail-help` | incluida en el pack |

## Stack

- HTML + CSS (Tailwind CDN) + Vanilla JS
- Sin build step, sin dependencias, sin framework
- Persistencia en localStorage
