"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Viaje } from "@/types";
import { COLORES } from "@/lib/api";

export default function Mapa({ viajes }: { viajes: Viaje[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapa = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapa.current) return;
    mapa.current = L.map(mapRef.current, { zoomControl: true, attributionControl: false }).setView([19.3, -99.1], 11);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", { maxZoom: 19 }).addTo(mapa.current);
    setTimeout(() => mapa.current?.invalidateSize(), 200);
  }, []);

  useEffect(() => {
    if (!mapa.current) return;
    const m = mapa.current;
    m.eachLayer(l => { if (l instanceof L.CircleMarker || l instanceof L.Polyline) m.removeLayer(l); });
    const bounds: L.LatLngTuple[] = [];
    viajes.forEach(t => {
      if (!t.origenLat || !t.destinoLat) return;
      const o: L.LatLngTuple = [t.origenLat!, t.origenLng!];
      const d: L.LatLngTuple = [t.destinoLat!, t.destinoLng!];
      bounds.push(o, d);
      L.circleMarker(o, { radius: 6, color: COLORES[t.tipo], fillColor: "#fff", fillOpacity: 0.8, weight: 2 })
        .addTo(m).bindPopup(`<b>${t.origen}</b><br>${t.tipo} · ${t.fecha}`);
      L.circleMarker(d, { radius: 6, color: COLORES[t.tipo], fillColor: "#fff", fillOpacity: 0.8, weight: 2 })
        .addTo(m).bindPopup(`<b>${t.destino}</b><br>${t.tipo} · ${t.fecha}`);
      L.polyline([o, d], { color: COLORES[t.tipo], weight: 2.5, opacity: 0.5 }).addTo(m);
    });
    if (bounds.length) m.fitBounds(bounds, { padding: [30, 30], maxZoom: 14 });
    else m.setView([19.3, -99.1], 11);
    setTimeout(() => m.invalidateSize(), 100);
  }, [viajes]);

  return <div ref={mapRef} className="h-80 w-full min-h-[20rem] rounded-xl border border-neutral-100" />;
}
