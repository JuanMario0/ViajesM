import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-10">
        <Link href="/">
          <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">ViajesM</h1>
        </Link>
        <p className="mt-1 text-sm text-neutral-500 text-pretty">Gastos de transporte · CDMX</p>
      </header>

      <div className="mx-auto max-w-sm">
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900 text-balance mb-1">Iniciar sesión</h2>
          <p className="text-sm text-neutral-500 mb-6 text-pretty">Ingresa para administrar tus viajes.</p>

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-neutral-600">Correo</label>
              <input id="email" type="email" required className="mt-1 block w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900" placeholder="correo@ejemplo.com" />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-neutral-600">Contraseña</label>
              <input id="password" type="password" required className="mt-1 block w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900" placeholder="••••••••" />
            </div>
            <button type="button" className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2">
              Entrar
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-neutral-500">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="font-medium text-neutral-900 hover:underline">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
