import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/">
            <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">ViajesM</h1>
          </Link>
          <p className="mt-1 text-sm text-neutral-500 text-pretty">Gastos de transporte · CDMX</p>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            Dashboard
          </Link>
          <Link href="/login" className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
            Iniciar sesión
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
