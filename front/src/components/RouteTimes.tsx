"use client";

import type { Viaje } from "@/types";
import { COLORES } from "@/lib/api";

export default function RouteTimes({ viajes }: { viajes: Viaje[] }) {
  const rutas: Record<string, { total: number; count: number; tipo: string }> = {};

  viajes.forEach(t => {
    if (!t.horaSalida || !t.horaLlegada) return;
    const key = `${t.origen} → ${t.destino}`;
    const [h1, m1] = t.horaSalida.split(":").map(Number);
    const [h2, m2] = t.horaLlegada.split(":").map(Number);
    const min = h2 * 60 + m2 - (h1 * 60 + m1);
    if (min > 0) {
      if (!rutas[key]) rutas[key] = { total: 0, count: 0, tipo: t.tipo };
      rutas[key].total += min;
      rutas[key].count++;
    }
  });

  const entries = Object.entries(rutas);

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-neutral-900 text-balance mb-3">Tiempo promedio por ruta</h2>
      <div className="space-y-2 text-sm text-neutral-600">
        {!entries.length ? (
          <p className="text-xs text-neutral-400">Registra viajes con hora para ver tiempos.</p>
        ) : (
          entries.map(([ruta, data]) => {
            const avg = Math.round(data.total / data.count);
            const h = Math.floor(avg / 60);
            const m = avg % 60;
            return (
              <div key={ruta} className="flex items-center justify-between py-1.5 border-b border-neutral-100 last:border-0">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="size-2 shrink-0 rounded-full" style={{ background: COLORES[data.tipo] }} />
                  <span className="truncate text-xs font-medium text-neutral-700">{ruta}</span>
                </div>
                <span className="shrink-0 text-xs font-semibold tabular-nums text-neutral-900 ml-2">
                  {h > 0 ? `${h}h ` : ""}{m}min
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
