import { cn } from "@/lib/utils";

type BadgeVariant = "veg" | "nonveg" | "bestseller" | "spicy" | "offer" | "neutral";

const styles: Record<BadgeVariant, string> = {
  veg: "text-green-700 ring-green-600/40 bg-green-50",
  nonveg: "text-maroon-700 ring-maroon-600/40 bg-maroon-50",
  bestseller: "text-gold-800 ring-gold-500/50 bg-gold-100",
  spicy: "text-orange-700 ring-orange-500/40 bg-orange-50",
  offer: "text-cream-50 ring-white/20 bg-maroon-700",
  neutral: "text-charcoal-700 ring-charcoal-300 bg-charcoal-50",
};

export function Badge({
  variant = "neutral",
  children,
  className,
}: {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

/** Small square veg/non-veg indicator dot (Indian FSSAI style). */
export function VegIndicator({ vegetarian }: { vegetarian: boolean }) {
  const color = vegetarian ? "border-green-600" : "border-maroon-700";
  const dot = vegetarian ? "bg-green-600" : "bg-maroon-700";
  return (
    <span
      role="img"
      aria-label={vegetarian ? "Vegetarian" : "Non-vegetarian"}
      className={cn(
        "inline-flex h-4 w-4 shrink-0 items-center justify-center border-2 rounded-[3px]",
        color
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
    </span>
  );
}
