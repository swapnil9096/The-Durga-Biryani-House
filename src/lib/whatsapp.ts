import type { CartExtras, CartItem, ExtraOption, OrderDetails } from "@/types";
import { restaurant } from "@/config/restaurant";
import { getExtra } from "@/config/extras";
import { formatPrice } from "./utils";

export interface OrderTotals {
  subtotal: number;
  deliveryFee: number;
  total: number;
}

/** Chosen extras resolved to their option + quantity, skipping unknown ids. */
export function resolveExtras(
  extras: CartExtras
): { option: ExtraOption; quantity: number }[] {
  return Object.entries(extras)
    .map(([id, quantity]) => {
      const option = getExtra(id);
      return option && quantity > 0 ? { option, quantity } : null;
    })
    .filter((e): e is { option: ExtraOption; quantity: number } => e !== null);
}

/** Compute cart totals, applying delivery fee rules from config. */
export function computeTotals(
  items: CartItem[],
  orderType: "pickup" | "delivery",
  extras: CartExtras = {}
): OrderTotals {
  const itemsSubtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const extrasSubtotal = resolveExtras(extras).reduce(
    (sum, e) => sum + e.option.price * e.quantity,
    0
  );
  const subtotal = itemsSubtotal + extrasSubtotal;

  let deliveryFee = 0;
  if (orderType === "delivery" && restaurant.deliveryFee > 0) {
    const qualifiesFree =
      restaurant.freeDeliveryOver > 0 &&
      subtotal >= restaurant.freeDeliveryOver;
    deliveryFee = qualifiesFree ? 0 : restaurant.deliveryFee;
  }

  return { subtotal, deliveryFee, total: subtotal + deliveryFee };
}

/**
 * Build a nicely formatted WhatsApp order message.
 * Note: totals are computed here for the message text, but final pricing is
 * always confirmed by the restaurant — never trust client-side pricing for payment.
 */
export function buildWhatsAppMessage(
  items: CartItem[],
  details: OrderDetails,
  extras: CartExtras = {}
): string {
  const totals = computeTotals(items, details.orderType, extras);
  const chosenExtras = resolveExtras(extras);

  const lines: string[] = [];
  lines.push(`*New Order — ${restaurant.name}*`);
  lines.push("");
  lines.push(`*Name:* ${details.name}`);
  lines.push(`*Phone:* ${details.mobile}`);
  lines.push(
    `*Order type:* ${details.orderType === "delivery" ? "Delivery" : "Pickup"}`
  );
  if (details.orderType === "delivery" && details.address) {
    lines.push(`*Address:* ${details.address}`);
  }
  lines.push("");
  lines.push("*Items:*");
  items.forEach((i) => {
    lines.push(
      `• ${i.name} (${i.spiceLevel}) × ${i.quantity} — ${formatPrice(
        i.price * i.quantity
      )}`
    );
  });
  if (chosenExtras.length > 0) {
    lines.push("");
    lines.push("*Extras:*");
    chosenExtras.forEach(({ option, quantity }) => {
      lines.push(
        `• ${option.name} × ${quantity} — ${formatPrice(
          option.price * quantity
        )}`
      );
    });
  }
  lines.push("");
  lines.push(`*Subtotal:* ${formatPrice(totals.subtotal)}`);
  if (details.orderType === "delivery") {
    lines.push(
      `*Delivery:* ${
        totals.deliveryFee === 0 ? "Free" : formatPrice(totals.deliveryFee)
      }`
    );
  }
  lines.push(`*Total:* ${formatPrice(totals.total)}`);
  if (details.instructions?.trim()) {
    lines.push("");
    lines.push(`*Special instructions:* ${details.instructions.trim()}`);
  }

  return lines.join("\n");
}

/** Full wa.me link with a prefilled message. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${restaurant.contact.whatsapp}?text=${encodeURIComponent(
    message
  )}`;
}
