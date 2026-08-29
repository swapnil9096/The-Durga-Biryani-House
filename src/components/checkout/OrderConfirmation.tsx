import type { OrderDetails } from "@/types";
import { Button } from "@/components/ui/Button";

export function OrderConfirmation({
  details,
  whatsappUrl,
  onNewOrder,
}: {
  details: OrderDetails;
  whatsappUrl: string;
  onNewOrder: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg text-center">
      <div className="rounded-2xl border border-charcoal-100 bg-white p-8 shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
          ✓
        </div>
        <h2 className="mt-5 font-display text-2xl font-bold text-charcoal-900">
          Order on its way to us!
        </h2>
        <p className="mt-2 text-charcoal-600">
          Thanks, {details.name}. We&apos;ve opened WhatsApp with your order
          details. Please hit send there to confirm — we&apos;ll reply shortly.
        </p>

        <div className="mt-6 rounded-xl bg-cream-100/70 p-4 text-left text-sm text-charcoal-600">
          <p className="font-medium text-charcoal-800">What happens next?</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>Send the pre-filled message on WhatsApp.</li>
            <li>We confirm your order, price and timing.</li>
            <li>
              {details.orderType === "delivery"
                ? "We deliver to your address."
                : "You pick up fresh from our kitchen."}
            </li>
          </ol>
        </div>

        <div className="mt-6 space-y-2">
          <Button href={whatsappUrl} external size="lg" className="w-full">
            Re-open WhatsApp
          </Button>
          <Button variant="ghost" size="md" onClick={onNewOrder} className="w-full">
            Start a new order
          </Button>
        </div>
      </div>
    </div>
  );
}
