import { cartSubtotal, cartTotal } from "./cartSelectors";
import { formatMoney } from "../domain/money";

function sanitizePhone(phone) {
  return String(phone || "").replace(/\D/g, "");
}

export function buildWhatsAppMessage(state, cfg, contact) {
  const subtotal = cartSubtotal(state);
  const total = cartTotal(state, cfg.deliveryFee);

  const lines = [];
  lines.push(`Pedido - ${cfg.brandName}`);
  lines.push("");
  lines.push("Items:");

  state.items.forEach((it) => {
    const lineTotal = it.product.price * it.qty;
    lines.push(`- ${it.qty} x ${it.product.name} (${formatMoney(lineTotal, cfg.currency)})`);
  });

  lines.push("");
  lines.push(`Subtotal: ${formatMoney(subtotal, cfg.currency)}`);
  if ((cfg.deliveryFee || 0) > 0) lines.push(`Delivery: ${formatMoney(cfg.deliveryFee, cfg.currency)}`);
  lines.push(`TOTAL: ${formatMoney(total, cfg.currency)}`);

  lines.push("");
  lines.push("Cliente:");
  lines.push(`- Nombre: ${contact.name}`);
  lines.push(`- Dirección: ${contact.address}`);
  if ((contact.reference || "").trim()) lines.push(`- Referencia: ${contact.reference.trim()}`);
  if ((contact.notes || "").trim()) lines.push(`- Observaciones: ${contact.notes.trim()}`);

  return lines.join("\n");
}

export function buildWhatsAppUrl(state, cfg, contact) {
  const phone = sanitizePhone(cfg.whatsappNumber);
  const text = buildWhatsAppMessage(state, cfg, contact);
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
