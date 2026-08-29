"use client";

import type { CartItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { SmartImage } from "@/components/ui/SmartImage";
import { VegIndicator } from "@/components/ui/Badge";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

export function CartLineItem({ item }: { item: CartItem }) {
  const { increment, decrement, removeItem } = useCart();

  return (
    <div className="flex gap-3">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
        <SmartImage
          src={item.image}
          alt={item.name}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <VegIndicator vegetarian={item.vegetarian} />
              <h3 className="truncate text-sm font-semibold text-charcoal-900">
                {item.name}
              </h3>
            </div>
            <p className="mt-0.5 text-sm text-charcoal-500">
              {formatPrice(item.price)}
            </p>
            <span className="mt-1 inline-block rounded-full bg-maroon-50 px-2 py-0.5 text-xs font-medium text-maroon-700">
              🌶 {item.spiceLevel}
            </span>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.key)}
            aria-label={`Remove ${item.name} (${item.spiceLevel})`}
            className="rounded-full p-1 text-charcoal-400 transition-colors hover:bg-maroon-50 hover:text-maroon-700"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <QuantityStepper
            value={item.quantity}
            onIncrement={() => increment(item.key)}
            onDecrement={() => decrement(item.key)}
            label={`${item.name} (${item.spiceLevel})`}
            size="sm"
          />
          <span className="text-sm font-semibold text-charcoal-900">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
