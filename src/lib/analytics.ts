/**
 * ANALYTICS INTEGRATION POINT
 * ----------------------------
 * Central place to emit tracking events. No provider is wired up by default.
 *
 * To enable Google Analytics (GA4):
 *   1. Set NEXT_PUBLIC_GA_ID in your environment (see .env.example).
 *   2. Add the GA script to app/layout.tsx (guarded by that env var).
 * This module will then forward events via window.gtag automatically.
 *
 * If no provider is configured, events are logged to the console in dev only,
 * so you can verify the wiring without a real tracking ID.
 */

export type AnalyticsEvent =
  | "page_view"
  | "menu_view"
  | "menu_item_view"
  | "add_to_cart"
  | "remove_from_cart"
  | "checkout_started"
  | "order_clicked"
  | "whatsapp_order_clicked"
  | "whatsapp_clicked"
  | "instagram_clicked"
  | "call_clicked"
  | "directions_clicked"
  | "offer_clicked";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, params: Params = {}): void {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.debug(`[analytics] ${event}`, params);
  }
}
