import { Link } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { useCart } from "../cart/CartContext";
import { clientConfig } from "../app/config/clientConfig";
import { cartSubtotal, cartTotal } from "../cart/cartSelectors";
import { CartItemRow } from "../components/cart/CartItemRow";
import { PriceSummary } from "../components/cart/PriceSummary";

export function Cart() {
  const { state, dispatch } = useCart();
  const subtotal = cartSubtotal(state);
  const total = cartTotal(state, clientConfig.deliveryFee);

  const canCheckout =
    state.items.length > 0 &&
    ((clientConfig.minOrder || 0) === 0 || subtotal >= clientConfig.minOrder);

  return (
    <div className="min-h-dvh bg-slate-50">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-5 space-y-4">
        <h1 className="text-xl font-bold">Carrito</h1>

        {state.items.length === 0 ? (
          <div className="rounded-2xl border p-6 bg-white">
            <p className="font-semibold">Tu carrito está vacío.</p>
            <Link to="/menu" className="inline-block mt-3 rounded-xl px-4 py-2 border text-sm">
              Ir al Menú
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {state.items.map((it) => (
                <CartItemRow
                  key={it.product.id}
                  item={it}
                  currency={clientConfig.currency}
                  onInc={() => dispatch({ type: "ADD", product: it.product, qty: 1 })}
                  onDec={() =>
                    dispatch({ type: "SET_QTY", productId: it.product.id, qty: it.qty - 1 })
                  }
                  onRemove={() => dispatch({ type: "REMOVE", productId: it.product.id })}
                />
              ))}
            </div>

            <PriceSummary
              currency={clientConfig.currency}
              subtotal={subtotal}
              deliveryFee={clientConfig.deliveryFee}
              total={total}
              minOrder={clientConfig.minOrder}
            />

            <div className="flex gap-2">
              <button
                onClick={() => dispatch({ type: "CLEAR" })}
                className="rounded-xl px-4 py-2 border text-sm"
              >
                Vaciar
              </button>

              <Link
                to={canCheckout ? "/checkout" : "#"}
                className={`ml-auto rounded-xl px-4 py-2 text-sm font-semibold border
                  ${canCheckout ? "bg-black text-white" : "bg-slate-200 text-slate-500 pointer-events-none"}`}
              >
                Continuar
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
