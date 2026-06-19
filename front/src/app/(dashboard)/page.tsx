"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import type { Viaje, Stats } from "@/types";
import { req, COLORES, TIPOS } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import StatsCards from "@/components/StatsCards";
import RouteTimes from "@/components/RouteTimes";
import Charts from "@/components/Charts";
import TablaViajes from "@/components/TablaViajes";
import ModalViaje from "@/components/ModalViaje";

const Mapa = dynamic(() => import("@/components/Mapa"), { ssr: false });

export default function Dashboard() {
  const { user } = useAuth();
  const [viajes, setViajes] = useState<Viaje[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [filter, setFilter] = useState("all");
  const [editando, setEditando] = useState<Viaje | null>(null);

  const cargar = useCallback(async () => {
    if (!user) return;
    try {
      const [v, s] = await Promise.all([
        req<Viaje[]>("/viajes?tipo=" + filter),
        req<Stats>("/stats"),
      ]);
      setViajes(v);
      setStats(s);
    } catch {} // redirect handled by layout / req()
  }, [filter, user]);

  useEffect(() => { cargar(); }, [cargar]);

  const handleSave = async (data: any) => {
    if (editando) await req("/viajes/" + editando.id, { method: "PUT", body: JSON.stringify(data) });
    else await req("/viajes", { method: "POST", body: JSON.stringify(data) });
    setEditando(null);
    cargar();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este viaje?")) return;
    await req("/viajes/" + id, { method: "DELETE" });
    cargar();
  };

  return (
    <>
      <StatsCards />

      <div className="mb-6 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-xl border border-neutral-200 bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-neutral-900 text-balance">Mapa de rutas</h2>
            <div className="flex gap-2 text-xs text-neutral-500">
              {TIPOS.map(t => (
                <span key={t} className="flex items-center gap-1">
                  <span className="size-2.5 rounded-full" style={{ background: COLORES[t] }} />
                  {t}
                </span>
              ))}
            </div>
          </div>
          <Mapa viajes={viajes} />
        </div>
        <div className="lg:col-span-2">
          <RouteTimes viajes={viajes} />
        </div>
      </div>

      <Charts s={stats} />

      <TablaViajes
        viajes={viajes}
        filter={filter}
        onFilter={setFilter}
        onEdit={setEditando}
        onDelete={handleDelete}
      />

      {editando !== null && (
        <ModalViaje
          viaje={editando}
          onSave={handleSave}
          onClose={() => setEditando(null)}
        />
      )}

      <button
        onClick={() => setEditando({} as Viaje)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Nuevo viaje
      </button>
    </>
  );
}
