export function currencySymbol(code) {
  if (code === "USD") return "US$";
  if (code === "EUR") return "€";
  return "$";
}

export function formatMoney(amount, code) {
  const sym = currencySymbol(code);
  return `${sym}${Number(amount || 0).toLocaleString("es-CL")}`;
}
