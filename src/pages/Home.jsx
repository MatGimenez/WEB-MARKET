import { Link } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { clientConfig } from "../app/config/clientConfig";

export function Home() {
  return (
    <div className="min-h-dvh bg-slate-50">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-3xl border bg-white p-6">
          <h1 className="text-2xl font-bold">{clientConfig.brandName}</h1>
          <p className="mt-2 text-slate-600">{clientConfig.tagline}</p>

          <div className="mt-6 flex gap-2">
            <Link to="/menu" className="rounded-2xl px-5 py-3 bg-black text-white font-semibold">
              Ver Menú
            </Link>
            <Link to="/cart" className="rounded-2xl px-5 py-3 border font-semibold">
              Ir al Carrito
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
