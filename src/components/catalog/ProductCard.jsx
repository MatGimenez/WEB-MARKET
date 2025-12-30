export function ProductCard({ product, currencySymbol, onAdd }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4 shadow-sm bg-white flex flex-col gap-2">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold leading-tight truncate text-start">{product.name}</p>
          {product.description && <p className="text-sm text-slate-600">{product.description}</p>}
        </div>
        <p className="font-semibold whitespace-nowrap">
          {currencySymbol}{product.price.toLocaleString("es-CL")}
        </p>
      </div>

      <button
        disabled={!product.isAvailable}
        onClick={() => onAdd(product)}
        className="mt-2 w-full rounded-xl px-4 py-2 text-sm font-semibold border
                   disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 text-white hover:bg-green-700 transition-colors"
      >
        {product.isAvailable ? "Agregar al carrito" : "No disponible"}
      </button>
    </div>
  );
}
