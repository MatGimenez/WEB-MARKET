import { Link } from "react-router-dom";
import { clientConfig } from "../../app/config/clientConfig";
import { useCart } from "../../cart/CartContext";
import { cartCount } from "../../cart/cartSelectors";

export function Header() {
  const { state } = useCart();
  const count = cartCount(state);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b">
      <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="min-w-0">
          <p className="font-bold truncate">{clientConfig.brandName}</p>
          <p className="text-xs text-slate-600 truncate">{clientConfig.tagline}</p>
        </Link>

        <nav className="flex items-center gap-2">
          <Link to="/menu" className="rounded-xl px-3 py-2 text-sm border">Menú</Link>
          <Link to="/cart" className="rounded-xl px-3 py-2 text-sm border font-semibold">
            Carrito {count > 0 ? `(${count})` : ""}
          </Link>
        </nav>
      </div>
    </header>
  );
}
