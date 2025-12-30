import { useMemo, useState } from "react";
import { Header } from "../components/layout/Header";
import { sampleProducts } from "../data/products.sample";
import { clientConfig } from "../app/config/clientConfig";
import { ProductCard } from "../components/catalog/ProductCard";
import { CategoryTabs } from "../components/catalog/CategoryTabs";
import { useCart } from "../cart/CartContext";
import { currencySymbol } from "../domain/money";

export function Menu() {
  const { dispatch } = useCart();
  const categories = useMemo(() => Array.from(new Set(sampleProducts.map((p) => p.category))), []);
  const [active, setActive] = useState(categories[0]);

  const filtered = sampleProducts.filter((p) => p.category === active);
  const sym = currencySymbol(clientConfig.currency);

  return (
    <div className="min-h-dvh bg-slate-50">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-5 space-y-4">
        <CategoryTabs categories={categories} active={active} onChange={setActive} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              currencySymbol={sym}
              onAdd={(prod) => dispatch({ type: "ADD", product: prod, qty: 1 })}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
