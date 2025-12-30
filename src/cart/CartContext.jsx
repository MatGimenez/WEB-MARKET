import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { cartReducer } from "./cartReducer";
import { loadCart, saveCart } from "./cartStorage";
import { initialCartState } from "../domain/cart";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const hydrated = loadCart();
  const [state, dispatch] = useReducer(cartReducer, hydrated ?? initialCartState);

  useEffect(() => saveCart(state), [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider />");
  return ctx;
}
