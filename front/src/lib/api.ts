const API = "http://localhost:8080/api";

export async function req<T>(path: string, opts?: RequestInit): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) headers["Authorization"] = "Bearer " + token;
  const r = await fetch(API + path, { headers, ...opts });
  if (!r.ok) {
    if (r.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    const text = await r.text().catch(() => "");
    let msg = `HTTP ${r.status}`;
    try { const j = JSON.parse(text); msg = j.error || j.message || msg; } catch {}
    throw new Error(msg);
  }
  return r.status === 204 ? null as T : r.json();
}

export function fmt(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 0 });
}

export async function geocodificar(texto: string) {
  const r = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(texto + ", CDMX, México")}&limit=1`
  );
  const datos = await r.json();
  if (datos.length) return { lat: parseFloat(datos[0].lat), lng: parseFloat(datos[0].lon) };
  return null;
}

export const TIPOS = ["Tren Ligero", "Combi", "Trolebús"] as const;
export const COLORES: Record<string, string> = {
  "Tren Ligero": "#525252",
  Combi: "#a3a3a3",
  Trolebús: "#d4d4d4",
};

const VELOCIDAD_KMH: Record<string, number> = {
  "Tren Ligero": 25,
  Combi: 18,
  Trolebús: 14,
};

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function estimarDuracion(origenLat: number, origenLng: number, destLat: number, destLng: number, tipo: string) {
  const km = haversineKm(origenLat, origenLng, destLat, destLng);
  const kmRuta = km * 1.4;
  const velocidad = VELOCIDAD_KMH[tipo] || 20;
  const minutos = Math.round((kmRuta / velocidad) * 60 + 5);
  return minutos;
}

export function calcularLlegada(horaSalida: string, minutos: number) {
  const [h, m] = horaSalida.split(":").map(Number);
  const total = h * 60 + m + minutos;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}
