"use client";

import { useState } from "react";
import type { Viaje } from "@/types";
import { geocodificar, estimarDuracion, calcularLlegada } from "@/lib/api";

interface Props {
  viaje: Viaje | null;
  onSave: (data: Partial<Viaje> & { tipo: string; origen: string; destino: string; fecha: string; costo: number }) => Promise<void>;
  onClose: () => void;
}

export default function ModalViaje({ viaje, onSave, onClose }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const d = new FormData(e.currentTarget);
    const body: any = {
      tipo: d.get("tipo"),
      origen: d.get("origen"),
      destino: d.get("destino"),
      fecha: d.get("fecha"),
      costo: parseFloat(d.get("costo") as string) || 0,
      horaSalida: d.get("horaSalida") || null,
      horaLlegada: null,
      origenLat: null,
      origenLng: null,
      destinoLat: null,
      destinoLng: null,
    };
    try {
      const [o, dest] = await Promise.all([geocodificar(body.origen), geocodificar(body.destino)]);
      if (o) { body.origenLat = o.lat; body.origenLng = o.lng; }
      if (dest) { body.destinoLat = dest.lat; body.destinoLng = dest.lng; }
      if (body.horaSalida && o && dest) {
        const min = estimarDuracion(o.lat, o.lng, dest.lat, dest.lng, body.tipo);
        body.horaLlegada = calcularLlegada(body.horaSalida, min);
      }
      await onSave(body);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="modal" className="fixed inset-0 z-[9999] flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Formulario de viaje">
      <div onClick={onClose} className="absolute inset-0 bg-black/20" />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl border border-neutral-200 bg-white p-6 shadow-lg mx-4">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-base font-semibold text-neutral-900 text-balance">
            {viaje ? "Editar viaje" : "Nuevo viaje"}
          </h3>
          <button onClick={onClose} className="rounded-md p-1 text-neutral-400 transition-colors hover:text-neutral-600" aria-label="Cerrar">
            <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="tipo" className="block text-xs font-medium text-neutral-600">Transporte</label>
              <select id="tipo" name="tipo" defaultValue={viaje?.tipo || "Tren Ligero"} required className="mt-1 block w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900">
                <option value="Tren Ligero">Tren Ligero</option>
                <option value="Combi">Combi</option>
                <option value="Trolebús">Trolebús</option>
              </select>
            </div>
            <div>
              <label htmlFor="costo" className="block text-xs font-medium text-neutral-600">Costo ($)</label>
              <input id="costo" name="costo" type="number" min={0} step={0.5} defaultValue={viaje?.costo ?? ""} required className="mt-1 block w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="origen" className="block text-xs font-medium text-neutral-600">Origen</label>
              <input id="origen" name="origen" type="text" defaultValue={viaje?.origen || ""} required className="mt-1 block w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900" placeholder="Ej: Tasqueña" />
            </div>
            <div>
              <label htmlFor="destino" className="block text-xs font-medium text-neutral-600">Destino</label>
              <input id="destino" name="destino" type="text" defaultValue={viaje?.destino || ""} required className="mt-1 block w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900" placeholder="Ej: Xochimilco" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="fecha" className="block text-xs font-medium text-neutral-600">Fecha</label>
              <input id="fecha" name="fecha" type="date" defaultValue={viaje?.fecha || new Date().toISOString().slice(0, 10)} required className="mt-1 block w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900" />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600">Salida aprox.</label>
              <input id="horaSalida" name="horaSalida" type="time" defaultValue={viaje?.horaSalida || "09:40"} className="mt-1 block w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900" />
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-neutral-50 px-3 py-2 text-xs text-neutral-500">
            <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            Coordenadas y llegada estimada se calculan al guardar.
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2">
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
}
