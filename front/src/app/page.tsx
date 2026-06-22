import Link from "next/link";

export default function Landing() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-20 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">ViajesM</h1>
          <p className="mt-1 text-sm text-neutral-500 text-pretty">Gastos de transporte · CDMX</p>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900">Iniciar sesión</Link>
          <Link href="/register" className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800">Crear cuenta</Link>
        </nav>
      </header>

      <section className="mb-20 max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl leading-tight">
          Controla tus gastos de transporte en la CDMX
        </h2>
        <p className="mt-4 text-base text-neutral-600 text-pretty leading-relaxed">
          Registra cada viaje en Tren Ligero, Trolebús o Combi, visualiza tus rutas en el mapa,
          y lleva el control de lo que gastas por día, mes y tipo de transporte.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/register" className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800">Comenzar</Link>
          <Link href="/login" className="rounded-lg border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100">Ya tengo cuenta</Link>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-neutral-100">
            <svg className="size-5 text-neutral-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
          </div>
          <h3 className="text-sm font-semibold text-neutral-900 text-balance">Mapa de rutas</h3>
          <p className="mt-1.5 text-sm text-neutral-500 text-pretty leading-relaxed">Visualiza tus trayectos sobre calles reales con vista normal o satélite.</p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-neutral-100">
            <svg className="size-5 text-neutral-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>
          </div>
          <h3 className="text-sm font-semibold text-neutral-900 text-balance">Estadísticas</h3>
          <p className="mt-1.5 text-sm text-neutral-500 text-pretty leading-relaxed">Resumen de gasto por día, mes y tipo de transporte en cards y gráficas.</p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-neutral-100">
            <svg className="size-5 text-neutral-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
          </div>
          <h3 className="text-sm font-semibold text-neutral-900 text-balance">Tiempos reales</h3>
          <p className="mt-1.5 text-sm text-neutral-500 text-pretty leading-relaxed">La hora de llegada se calcula automáticamente según distancia y tipo de transporte.</p>
        </div>
      </section>

      <footer className="mt-20 border-t border-neutral-100 pt-6 text-center text-xs text-neutral-400">
        ViajesM · Gastos de transporte CDMX
      </footer>
    </div>
  );
}
