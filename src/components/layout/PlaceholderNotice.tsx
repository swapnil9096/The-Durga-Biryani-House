import { restaurant } from "@/config/restaurant";

/**
 * Small dismissable-free notice shown only while contact placeholders are in
 * use. Set restaurant.contact.usingPlaceholders = false to hide it once real
 * details are configured.
 */
export function PlaceholderNotice() {
  if (!restaurant.contact.usingPlaceholders) return null;
  return (
    <div className="bg-gold-300 text-charcoal-950">
      <div className="container-px mx-auto max-w-7xl py-1.5 text-center text-xs font-medium">
        Demo site · Email, social links &amp; domain are placeholders — update{" "}
        <code className="rounded bg-charcoal-950/10 px-1 py-0.5">
          src/config/restaurant.ts
        </code>{" "}
        before launch.
      </div>
    </div>
  );
}
