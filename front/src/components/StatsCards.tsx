"use client";

import { req, fmt, COLORES } from "@/lib/api";
import type { Stats } from "@/types";
import { useEffect, useState } from "react";

export default function StatsCards() {
  const [s, setStats] = useState<Stats | null>(null);

  useEffect(() => { req<Stats>("/stats").then(setStats).catch(e => console.error("Stats:", e)); }, []);

  if (!s) return (
    <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="rounded-xl border border-neutral-200 bg-white p-5 animate-pulse">
          <div className="h-3 w-16 bg-neutral-100 rounded mb-3" />
          <div className="h-7 w-20 bg-neutral-100 rounded" />
        </div>
      ))}
    </section>
  );

  return (
    <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl border border-neutral-200 bg-white p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Total viajes</p>
        <p className="mt-2 text-3xl font-semibold tabular-nums">{s.totalViajes}</p>
      </div>
      <div className="rounded-xl border border-neutral-200 bg-white p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Gastado hoy</p>
        <p className="mt-2 text-3xl font-semibold tabular-nums">{fmt(s.gastoHoy)}</p>
      </div>
      <div className="rounded-xl border border-neutral-200 bg-white p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Este mes</p>
        <p className="mt-2 text-3xl font-semibold tabular-nums">{fmt(s.gastoMes)}</p>
      </div>
      <div className="rounded-xl border border-neutral-200 bg-white p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Más usado</p>
        <p className="mt-2 text-3xl font-semibold tabular-nums">{s.masUsado || "—"}</p>
      </div>
    </section>
  );
}
