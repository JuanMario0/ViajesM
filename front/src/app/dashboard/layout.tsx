"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/dashboard">
            <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">ViajesM</h1>
          </Link>
          <p className="mt-1 text-sm text-neutral-500 text-pretty">Gastos de transporte · CDMX</p>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            Dashboard
          </Link>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-neutral-500">{user.nombre}</span>
              <button
                onClick={() => { logout(); router.push("/login"); }}
                className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Link href="/login" className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
              Iniciar sesión
            </Link>
          )}
        </nav>
      </header>
      {children}
    </div>
  );
}
