export const cartCount = (state) =>
  state.items.reduce((acc, it) => acc + it.qty, 0);

export const cartSubtotal = (state) =>
  state.items.reduce((acc, it) => acc + it.product.price * it.qty, 0);

export const cartTotal = (state, deliveryFee) =>
  cartSubtotal(state) + Math.max(0, deliveryFee || 0);
