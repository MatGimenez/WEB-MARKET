import { formatMoney } from "../../domain/money";

export function PriceSummary({ currency, subtotal, deliveryFee, total, minOrder }) {
  const belowMin = (minOrder || 0) > 0 && subtotal < minOrder;

  return (
    <div className="rounded-2xl border p-4 bg-white shadow-sm">
      <p className="font-semibold">Resumen</p>

      <div className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-600">Subtotal</span>
          <span className="font-semibold">{formatMoney(subtotal, currency)}</span>
        </div>

        {(deliveryFee || 0) > 0 && (
          <div className="flex justify-between">
            <span className="text-slate-600">Delivery</span>
            <span className="font-semibold">{formatMoney(deliveryFee, currency)}</span>
          </div>
        )}

        <div className="pt-2 border-t flex justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-bold">{formatMoney(total, currency)}</span>
        </div>

        {belowMin && (
          <p className="text-xs text-rose-600">
            Pedido mínimo: {formatMoney(minOrder, currency)}. Te faltan{" "}
            {formatMoney(minOrder - subtotal, currency)}.
          </p>
        )}
      </div>
    </div>
  );
}
