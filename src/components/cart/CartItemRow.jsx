import { formatMoney } from "../../domain/money";

export function CartItemRow({ item, currency, onInc, onDec, onRemove }) {
  const lineTotal = item.product.price * item.qty;

  return (
    <div className="rounded-2xl border p-4 bg-white flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="font-semibold truncate">{item.product.name}</p>
        <p className="text-sm text-slate-600">
          {formatMoney(item.product.price, currency)} c/u
        </p>

        <div className="mt-3 flex items-center gap-2">
          <button onClick={onDec} className="w-10 h-10 rounded-xl border text-lg">−</button>
          <span className="w-8 text-center font-semibold">{item.qty}</span>
          <button onClick={onInc} className="w-10 h-10 rounded-xl border text-lg">+</button>

          <button onClick={onRemove} className="ml-2 rounded-xl px-3 py-2 text-sm border">
            Quitar
          </button>
        </div>
      </div>

      <p className="font-semibold whitespace-nowrap">{formatMoney(lineTotal, currency)}</p>
    </div>
  );
}
