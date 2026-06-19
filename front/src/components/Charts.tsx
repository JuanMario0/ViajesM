"use client";

import type { Stats } from "@/types";
import { fmt, COLORES, TIPOS } from "@/lib/api";

export default function Charts({ s }: { s: Stats | null }) {
  if (!s) return null;
  const maxF = Math.max(...Object.values(s.frecuencia), 1);
  const maxC = Math.max(...Object.values(s.gastoPorTipo), 1);

  return (
    <section className="mb-6 grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-neutral-900 text-balance">Frecuencia por transporte</h2>
        <div className="mt-4 space-y-3">
          {TIPOS.map(t => {
            const n = s.frecuencia[t] || 0;
            return (
              <div key={t} className="flex items-center gap-3">
                <span className="w-24 text-xs font-medium text-neutral-600 truncate">{t}</span>
                <div className="flex-1 h-2 rounded-full bg-neutral-100 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(n / maxF) * 100}%`, background: COLORES[t] }} />
                </div>
                <span className="w-8 text-right text-xs font-semibold tabular-nums text-neutral-700">{n}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="rounded-xl border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-neutral-900 text-balance">Gasto por transporte</h2>
        <div className="mt-4 space-y-3">
          {TIPOS.map(t => {
            const c = s.gastoPorTipo[t] || 0;
            return (
              <div key={t} className="flex items-center gap-3">
                <span className="w-24 text-xs font-medium text-neutral-600 truncate">{t}</span>
                <div className="flex-1 h-2 rounded-full bg-neutral-100 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(c / maxC) * 100}%`, background: COLORES[t] }} />
                </div>
                <span className="w-20 text-right text-xs font-semibold tabular-nums text-neutral-700">{fmt(c)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
