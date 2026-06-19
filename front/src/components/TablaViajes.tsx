"use client";

import type { Viaje } from "@/types";
import { fmt, COLORES } from "@/lib/api";

interface Props {
  viajes: Viaje[];
  filter: string;
  onFilter: (f: string) => void;
  onEdit: (t: Viaje) => void;
  onDelete: (id: number) => void;
}

export default function TablaViajes({ viajes, filter, onFilter, onEdit, onDelete }: Props) {
  return (
    <section className="rounded-xl border border-neutral-200 bg-white">
      <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-neutral-900 text-balance">Historial</h2>
        <select
          value={filter}
          onChange={e => onFilter(e.target.value)}
          className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
        >
          <option value="all">Todos</option>
          <option value="Tren Ligero">Tren Ligero</option>
          <option value="Combi">Combi</option>
          <option value="Trolebús">Trolebús</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
              <th className="px-5 py-3 font-medium">Fecha</th>
              <th className="px-5 py-3 font-medium">Salida</th>
              <th className="px-5 py-3 font-medium">Transporte</th>
              <th className="px-5 py-3 font-medium">Origen</th>
              <th className="px-5 py-3 font-medium">Destino</th>
              <th className="px-5 py-3 text-right font-medium tabular-nums">Costo</th>
              <th className="px-5 py-3 text-right font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {!viajes.length ? (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-xs text-neutral-400">
                  No hay viajes registrados.
                </td>
              </tr>
            ) : (
              viajes.map(t => (
                <tr key={t.id} className="transition-colors hover:bg-neutral-50">
                  <td className="px-5 py-3 tabular-nums text-neutral-700 text-xs">{t.fecha}</td>
                  <td className="px-5 py-3 text-xs tabular-nums text-neutral-500">{t.horaSalida || "—"}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-700">
                      <span className="size-2 rounded-full" style={{ background: COLORES[t.tipo] }} />
                      {t.tipo}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-neutral-600">{t.origen}</td>
                  <td className="px-5 py-3 text-xs text-neutral-600">{t.destino}</td>
                  <td className="px-5 py-3 text-right text-xs font-semibold tabular-nums text-neutral-700">{fmt(t.costo)}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => onEdit(t)} className="rounded-md p-1 text-neutral-400 transition-colors hover:text-neutral-600" aria-label="Editar">
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/></svg>
                      </button>
                      <button onClick={() => onDelete(t.id)} className="rounded-md p-1 text-neutral-400 transition-colors hover:text-red-500" aria-label="Eliminar">
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
