"use client";

import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { extras } from "@/config/extras";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { VegIndicator } from "@/components/ui/Badge";

/** Add-on picker (raita, salad …) with per-option quantity steppers. */
export function ExtrasPicker({ className }: { className?: string }) {
  const { extras: chosen, setExtra } = useCart();

  return (
    <div className={cn(className)}>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-charcoal-500">
        Add extras
      </h3>
      <ul className="mt-3 space-y-2.5">
        {extras.map((option) => {
          const qty = chosen[option.id] ?? 0;
          return (
            <li
              key={option.id}
              className="flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <VegIndicator vegetarian={option.vegetarian} />
                  <span className="text-sm font-medium text-charcoal-900">
                    {option.name}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-charcoal-500">
                  {formatPrice(option.price)} {option.unit}
                </p>
              </div>
              <QuantityStepper
                value={qty}
                onIncrement={() => setExtra(option.id, qty + 1)}
                onDecrement={() => setExtra(option.id, qty - 1)}
                label={option.name}
                size="sm"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
