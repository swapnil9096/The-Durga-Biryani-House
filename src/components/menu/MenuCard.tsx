"use client";

import { useState } from "react";
import { SPICE_LEVELS, type MenuItem, type SpiceLevel } from "@/types";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge, VegIndicator } from "@/components/ui/Badge";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

export function MenuCard({ item, priority = false }: { item: MenuItem; priority?: boolean }) {
  const { items, addItem, increment, decrement } = useCart();
  const { toast } = useToast();

  const [spice, setSpice] = useState<SpiceLevel>("Medium");

  // The cart line matching this item at the currently selected spice level.
  const line = items.find((i) => i.id === item.id && i.spiceLevel === spice);

  const handleAdd = () => {
    addItem(item, spice, 1);
    toast(`${item.name} (${spice}) added to cart`);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-charcoal-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-50">
        <SmartImage
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
        />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">
          {item.bestseller && <Badge variant="bestseller">★ Bestseller</Badge>}
          {!item.available && <Badge variant="neutral">Sold out</Badge>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start gap-2">
          <VegIndicator vegetarian={item.vegetarian} />
          <h3 className="text-base font-semibold leading-snug text-charcoal-900">
            {item.name}
          </h3>
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm text-charcoal-500">
          {item.description}
        </p>

        {item.available && (
          <div className="mt-3">
            <span className="mb-1.5 block text-xs font-medium text-charcoal-500">
              Spice level
            </span>
            <div
              role="radiogroup"
              aria-label={`Spice level for ${item.name}`}
              className="inline-flex rounded-full border border-charcoal-200 bg-white p-0.5"
            >
              {SPICE_LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  role="radio"
                  aria-checked={spice === level}
                  onClick={() => setSpice(level)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                    spice === level
                      ? "bg-maroon-700 text-cream-50"
                      : "text-charcoal-600 hover:bg-maroon-50 hover:text-maroon-700"
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-3 pt-1">
          <span className="font-display text-lg font-bold text-charcoal-900">
            {formatPrice(item.price)}
          </span>

          {!item.available ? (
            <span className="text-sm font-medium text-charcoal-400">
              Unavailable
            </span>
          ) : line ? (
            <QuantityStepper
              value={line.quantity}
              onIncrement={() => increment(line.key)}
              onDecrement={() => decrement(line.key)}
              label={`${item.name} (${spice})`}
            />
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-maroon-700 px-4 py-2 text-sm font-semibold text-cream-50 transition-all hover:bg-maroon-800 active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              Add
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
