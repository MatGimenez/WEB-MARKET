import { useMemo, useState } from "react";
import { Header } from "../components/layout/Header";
import { clientConfig } from "../app/config/clientConfig";
import { useCart } from "../cart/CartContext";
import { cartSubtotal, cartTotal } from "../cart/cartSelectors";
import { PriceSummary } from "../components/cart/PriceSummary";
import { buildWhatsAppUrl } from "../cart/whatsapp";

export function Checkout() {
  const { state, dispatch } = useCart();
  const subtotal = cartSubtotal(state);
  const total = cartTotal(state, clientConfig.deliveryFee);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");

  const canSend =
    state.items.length > 0 &&
    name.trim().length >= 2 &&
    address.trim().length >= 6 &&
    ((clientConfig.minOrder || 0) === 0 || subtotal >= clientConfig.minOrder);

  const waUrl = useMemo(() => {
    return buildWhatsAppUrl(state, clientConfig, { name, address, reference, notes });
  }, [state, name, address, reference, notes]);

  return (
    <div className="min-h-dvh bg-slate-50">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-5 space-y-4">
        <h1 className="text-xl font-bold">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-2xl border p-4 bg-white space-y-3">
            <p className="font-semibold">Datos para entrega</p>

            <label className="block">
              <span className="text-sm text-slate-600">Nombre</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                placeholder="Ej: Matías"
              />
            </label>

            <label className="block">
              <span className="text-sm text-slate-600">Dirección</span>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                placeholder="Calle, número, comuna"
              />
            </label>

            <label className="block">
              <span className="text-sm text-slate-600">Referencia (opcional)</span>
              <input
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                placeholder="Portón negro / Conserjería / etc."
              />
            </label>

            <label className="block">
              <span className="text-sm text-slate-600">Observaciones (opcional)</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2 min-h-24"
                placeholder="Sin cebolla, extra queso, etc."
              />
            </label>
          </div>

          <div className="space-y-3">
            <PriceSummary
              currency={clientConfig.currency}
              subtotal={subtotal}
              deliveryFee={clientConfig.deliveryFee}
              total={total}
              minOrder={clientConfig.minOrder}
            />

            <a
              href={canSend ? waUrl : undefined}
              target="_blank"
              rel="noreferrer"
              className={`block text-center rounded-2xl px-4 py-3 font-semibold border
                ${canSend ? "bg-black text-white" : "bg-slate-200 text-slate-500 pointer-events-none"}`}
            >
              Enviar pedido por WhatsApp
            </a>

            <button
              onClick={() => dispatch({ type: "CLEAR" })}
              className="w-full rounded-2xl px-4 py-3 border"
            >
              Finalizar y vaciar carrito
            </button>

            <p className="text-xs text-slate-600">
              Abre WhatsApp con el pedido preformateado. El cierre final se gestiona por chat.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
