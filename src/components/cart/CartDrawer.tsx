"use client";

import { useEffect } from "react";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/States";
import { CartLineItem } from "./CartLineItem";
import { ExtrasPicker } from "./ExtrasPicker";

export function CartDrawer() {
  const { isOpen, closeCart, items, subtotal, clear } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, closeCart]);

  return (
    <div
      className={cn("fixed inset-0 z-[75]", isOpen ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      <div
        className={cn(
          "absolute inset-0 bg-charcoal-950/60 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={closeCart}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream-50 shadow-2xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-charcoal-200 px-5 py-4">
          <h2 className="font-display text-xl font-bold text-charcoal-900">
            Your Cart
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal-700 hover:bg-charcoal-100"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center p-6">
            <EmptyState
              icon="🛒"
              title="Your cart is empty"
              description="Add some delicious biryani to get started."
              actionLabel="Browse the menu"
              actionHref="/menu"
              onAction={closeCart}
            />
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="divide-y divide-charcoal-100">
                {items.map((item) => (
                  <li key={item.id} className="py-3 first:pt-0">
                    <CartLineItem item={item} />
                  </li>
                ))}
              </ul>
              <ExtrasPicker className="mt-6 border-t border-charcoal-100 pt-5" />

              <button
                type="button"
                onClick={clear}
                className="mt-6 text-sm font-medium text-charcoal-500 underline-offset-2 hover:text-maroon-700 hover:underline"
              >
                Clear cart
              </button>
            </div>

            <div className="border-t border-charcoal-200 bg-white px-5 py-4">
              <div className="flex items-center justify-between text-base">
                <span className="text-charcoal-600">Subtotal</span>
                <span className="font-display text-xl font-bold text-charcoal-900">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-charcoal-400">
                Delivery fee (if any) is calculated at checkout.
              </p>
              <div className="mt-4 space-y-2">
                <Button
                  href="/checkout"
                  onClick={closeCart}
                  size="lg"
                  className="w-full"
                >
                  Checkout
                </Button>
                <Link
                  href="/menu"
                  onClick={closeCart}
                  className="block text-center text-sm font-medium text-charcoal-500 hover:text-maroon-700"
                >
                  Add more items
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
