"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Viaje } from "@/types";
import { COLORES, fmt, estimarDuracion } from "@/lib/api";

export default function Mapa({ viajes }: { viajes: Viaje[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapa = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapa.current) return;
    const m = L.map(mapRef.current, { zoomControl: true, attributionControl: false }).setView([19.3, -99.1], 11);

    const normal = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", { maxZoom: 19 });
    const satelite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { maxZoom: 19 });

    normal.addTo(m);
    L.control.layers({ "Mapa": normal, "Satélite": satelite }, {}, { position: "bottomleft" }).addTo(m);

    mapa.current = m;
    setTimeout(() => m.invalidateSize(), 200);
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

      const min = t.horaSalida && t.horaLlegada
        ? (() => { const [h1, m1] = t.horaSalida!.split(":").map(Number); const [h2, m2] = t.horaLlegada!.split(":").map(Number); return h2 * 60 + m2 - (h1 * 60 + m1); })()
        : estimarDuracion(t.origenLat!, t.origenLng!, t.destinoLat!, t.destinoLng!, t.tipo);
      const durStr = min > 0 ? `${Math.floor(min / 60) > 0 ? Math.floor(min / 60) + "h " : ""}${min % 60}min` : "";

      const popupContent = `
        <div style="font-family:system-ui,sans-serif;font-size:13px;line-height:1.5;min-width:160px">
          <b>${t.origen}</b> → <b>${t.destino}</b>
          <div style="color:#525252;margin:4px 0">${t.tipo} · ${fmt(t.costo)}</div>
          <div style="color:#525252;font-size:12px">${t.fecha}${t.horaSalida ? " · " + t.horaSalida : ""}${durStr ? " · " + durStr : ""}</div>
        </div>`;

      L.circleMarker(o, { radius: 6, color: COLORES[t.tipo], fillColor: "#fff", fillOpacity: 0.8, weight: 2 })
        .addTo(m).bindPopup(`<b>${t.origen}</b><br>${t.tipo} · ${t.fecha}`);
      L.circleMarker(d, { radius: 6, color: COLORES[t.tipo], fillColor: "#fff", fillOpacity: 0.8, weight: 2 })
        .addTo(m).bindPopup(`<b>${t.destino}</b><br>${t.tipo} · ${t.fecha}`);

      const line = L.polyline([o, d], { color: COLORES[t.tipo], weight: 3, opacity: 0.6 })
        .addTo(m)
        .bindPopup(popupContent);

      line.on("mouseover", () => line.setStyle({ weight: 5, opacity: 1 }));
      line.on("mouseout", () => line.setStyle({ weight: 3, opacity: 0.6 }));
    });
    if (bounds.length) m.fitBounds(bounds, { padding: [30, 30], maxZoom: 14 });
    else m.setView([19.3, -99.1], 11);
    setTimeout(() => m.invalidateSize(), 100);
  }, [viajes]);

  return <div ref={mapRef} className="h-80 w-full min-h-[20rem] rounded-xl border border-neutral-100" />;
}
