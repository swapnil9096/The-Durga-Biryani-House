"use client";

import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

/**
 * Floating "view cart" button. Appears once the cart has items so the order
 * is always one tap away. Hidden on the checkout page (the cart is already the
 * focus there) and on mobile, where the sticky bottom nav already carries a
 * cart entry.
 */
export function FloatingCartButton() {
  const pathname = usePathname();
  const { itemCount, subtotal, openCart, ready } = useCart();

  if (!ready || itemCount === 0) return null;
  if (pathname.startsWith("/checkout")) return null;

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`View cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}, ${formatPrice(subtotal)}`}
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-3 rounded-full bg-maroon-700 py-3 pl-4 pr-5 text-cream-50 shadow-lg shadow-maroon-900/25 transition-all hover:bg-maroon-800 hover:shadow-xl active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 sm:right-6 lg:inline-flex"
    >
      <span className="relative">
        <CartIcon />
        <span className="absolute -right-2.5 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-300 px-1 text-[11px] font-bold text-charcoal-950">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      </span>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[11px] font-medium uppercase tracking-wide text-cream-100/80">
          View cart
        </span>
        <span className="font-display text-sm font-bold">{formatPrice(subtotal)}</span>
      </span>
    </button>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6h15l-1.5 9h-12L5 3H2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.4" fill="currentColor" />
      <circle cx="18" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}
