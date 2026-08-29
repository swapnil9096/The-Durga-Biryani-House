"use client";

import { cn } from "@/lib/utils";

export function QuantityStepper({
  value,
  onIncrement,
  onDecrement,
  label,
  size = "md",
}: {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  /** Item name, used for accessible button labels. */
  label: string;
  size?: "sm" | "md";
}) {
  const btn = cn(
    "flex items-center justify-center rounded-full text-maroon-700 transition-colors hover:bg-maroon-50 disabled:opacity-40",
    size === "sm" ? "h-7 w-7" : "h-9 w-9"
  );
  const val = cn(
    "min-w-6 text-center font-semibold text-charcoal-900 tabular-nums",
    size === "sm" ? "text-sm" : "text-base"
  );

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-charcoal-200 bg-white",
        size === "sm" ? "px-1" : "px-1.5"
      )}
    >
      <button
        type="button"
        className={btn}
        onClick={onDecrement}
        aria-label={`Decrease quantity of ${label}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </button>
      <span className={val} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={btn}
        onClick={onIncrement}
        aria-label={`Increase quantity of ${label}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
