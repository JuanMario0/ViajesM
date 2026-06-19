const API = "http://localhost:8080/api";

export async function req<T>(path: string, opts?: RequestInit): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) headers["Authorization"] = "Bearer " + token;
  const r = await fetch(API + path, { headers, ...opts });
  if (r.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new Error("Sesión expirada");
  }
  if (!r.ok) {
    const e = await r.json().catch(() => ({ error: "Error" }));
    throw new Error(e.error || "Error");
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
