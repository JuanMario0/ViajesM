export interface Viaje {
  id: number;
  tipo: string;
  origen: string;
  destino: string;
  fecha: string;
  costo: number;
  horaSalida: string | null;
  horaLlegada: string | null;
  origenLat: number | null;
  origenLng: number | null;
  destinoLat: number | null;
  destinoLng: number | null;
}

export interface Stats {
  totalViajes: number;
  gastoHoy: number;
  gastoMes: number;
  masUsado: string | null;
  frecuencia: Record<string, number>;
  gastoPorTipo: Record<string, number>;
}

export interface User {
  id: number;
  nombre: string;
  email: string;
}
