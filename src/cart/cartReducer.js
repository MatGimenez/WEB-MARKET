export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const qtyToAdd = Math.max(1, action.qty ?? 1);
      const existing = state.items.find((i) => i.product.id === action.product.id);

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id ? { ...i, qty: i.qty + qtyToAdd } : i
          ),
        };
      }

      return { items: [...state.items, { product: action.product, qty: qtyToAdd }] };
    }

    case "REMOVE":
      return { items: state.items.filter((i) => i.product.id !== action.productId) };

    case "SET_QTY":
      return {
        items: state.items
          .map((i) => (i.product.id === action.productId ? { ...i, qty: action.qty } : i))
          .filter((i) => i.qty > 0),
      };

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}
