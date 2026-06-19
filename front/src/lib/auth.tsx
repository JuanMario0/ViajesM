"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { User } from "@/types";

interface AuthCtx {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (nombre: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx>({
  user: null, token: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

const API = "http://localhost:8080/api/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    if (t && u) { setToken(t); setUser(JSON.parse(u)); }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const r = await fetch(API + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!r.ok) { const e = await r.json().catch(() => ({ error: "Error" })); throw new Error(e.error || "Error"); }
    const data = await r.json();
    const u: User = { id: 0, nombre: data.nombre, email: data.email };
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(u));
    setToken(data.token);
    setUser(u);
  }, []);

  const register = useCallback(async (nombre: string, email: string, password: string) => {
    const r = await fetch(API + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password }),
    });
    if (!r.ok) { const e = await r.json().catch(() => ({ error: "Error" })); throw new Error(e.error || "Error"); }
    const data = await r.json();
    const u: User = { id: 0, nombre: data.nombre, email: data.email };
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(u));
    setToken(data.token);
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
