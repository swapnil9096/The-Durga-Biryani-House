"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { OrderDetails, OrderType } from "@/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { formatPrice } from "@/lib/utils";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  computeTotals,
} from "@/lib/whatsapp";
import { restaurant } from "@/config/restaurant";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/States";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { VegIndicator } from "@/components/ui/Badge";
import { ExtrasPicker } from "@/components/cart/ExtrasPicker";
import { resolveExtras } from "@/lib/whatsapp";
import { OrderConfirmation } from "./OrderConfirmation";
import { track } from "@/lib/analytics";

interface FormErrors {
  name?: string;
  mobile?: string;
  address?: string;
}

export function CheckoutForm() {
  const router = useRouter();
  const { items, extras, increment, decrement, removeItem, subtotal, clear } =
    useCart();
  const { toast } = useToast();
  const chosenExtras = resolveExtras(extras);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [orderType, setOrderType] = useState<OrderType>("pickup");
  const [address, setAddress] = useState("");
  const [instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [confirmed, setConfirmed] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<{
    details: OrderDetails;
    message: string;
    url: string;
  } | null>(null);

  const totals = computeTotals(items, orderType, extras);

  if (items.length === 0 && !placedOrder) {
    return (
      <EmptyState
        icon="🛒"
        title="Your cart is empty"
        description="Add a few dishes before checking out."
        actionLabel="Browse the menu"
        actionHref="/menu"
        className="my-8"
      />
    );
  }

  if (placedOrder) {
    return (
      <OrderConfirmation
        details={placedOrder.details}
        whatsappUrl={placedOrder.url}
        onNewOrder={() => {
          clear();
          setPlacedOrder(null);
          router.push("/menu");
        }}
      />
    );
  }

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    const digits = mobile.replace(/\D/g, "");
    if (!mobile.trim()) next.mobile = "Please enter your mobile number.";
    else if (digits.length < 10) next.mobile = "Enter a valid 10-digit mobile number.";
    if (orderType === "delivery" && !address.trim())
      next.address = "Delivery address is required for delivery orders.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast("Your cart is empty.", "error");
      return;
    }
    if (validate()) {
      setConfirmed(true);
      track("checkout_started", { value: totals.total });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast("Please fix the highlighted fields.", "error");
    }
  };

  const handlePlaceOrder = () => {
    const details: OrderDetails = {
      name: name.trim(),
      mobile: mobile.trim(),
      orderType,
      address: orderType === "delivery" ? address.trim() : undefined,
      instructions: instructions.trim() || undefined,
    };
    const message = buildWhatsAppMessage(items, details, extras);
    const url = buildWhatsAppUrl(message);
    track("order_clicked", { value: totals.total, order_type: orderType });
    track("whatsapp_order_clicked");
    setPlacedOrder({ details, message, url });
    // Open WhatsApp in a new tab with the prefilled order.
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // ── Confirmation review screen ──────────────────────────
  if (confirmed) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-charcoal-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-2xl font-bold text-charcoal-900">
            Review your order
          </h2>
          <p className="mt-1 text-sm text-charcoal-500">
            Confirm the details below. Your order is sent to us over WhatsApp for
            final confirmation.
          </p>

          <dl className="mt-6 space-y-2 rounded-xl bg-cream-100/60 p-4 text-sm">
            <Row label="Name" value={name} />
            <Row label="Mobile" value={mobile} />
            <Row label="Order type" value={orderType === "delivery" ? "Delivery" : "Pickup"} />
            {orderType === "delivery" && <Row label="Address" value={address} />}
            {instructions.trim() && <Row label="Instructions" value={instructions} />}
          </dl>

          <ul className="mt-5 divide-y divide-charcoal-100">
            {items.map((i) => (
              <li key={i.key} className="flex items-center justify-between py-2 text-sm">
                <span className="flex items-center gap-2 text-charcoal-700">
                  <VegIndicator vegetarian={i.vegetarian} />
                  {i.name} ({i.spiceLevel}) × {i.quantity}
                </span>
                <span className="font-medium text-charcoal-900">
                  {formatPrice(i.price * i.quantity)}
                </span>
              </li>
            ))}
            {chosenExtras.map(({ option, quantity }) => (
              <li
                key={option.id}
                className="flex items-center justify-between py-2 text-sm"
              >
                <span className="flex items-center gap-2 text-charcoal-700">
                  <VegIndicator vegetarian={option.vegetarian} />
                  {option.name} × {quantity}
                </span>
                <span className="font-medium text-charcoal-900">
                  {formatPrice(option.price * quantity)}
                </span>
              </li>
            ))}
          </ul>

          <TotalsBlock
            subtotal={totals.subtotal}
            deliveryFee={totals.deliveryFee}
            total={totals.total}
            orderType={orderType}
          />

          <div className="mt-6 flex flex-col gap-2 sm:flex-row-reverse">
            <Button onClick={handlePlaceOrder} size="lg" className="w-full sm:flex-1">
              <WhatsAppGlyph /> Send Order via WhatsApp
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setConfirmed(false)}
              className="w-full sm:w-auto"
            >
              Edit details
            </Button>
          </div>
          <p className="mt-3 text-center text-xs text-charcoal-400">
            Final pricing &amp; availability are confirmed by the restaurant on WhatsApp.
          </p>
        </div>
      </div>
    );
  }

  // ── Cart + details form ─────────────────────────────────
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
      {/* Details form */}
      <form onSubmit={handleReview} noValidate className="order-2 min-w-0 lg:order-1">
        <div className="rounded-2xl border border-charcoal-100 bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl font-bold text-charcoal-900">
            Your details
          </h2>

          <div className="mt-5 space-y-5">
            <Field label="Full name" htmlFor="name" error={errors.name} required>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={!!errors.name}
                className={inputCls(!!errors.name)}
                placeholder="e.g. Rahul Sharma"
              />
            </Field>

            <Field label="Mobile number" htmlFor="mobile" error={errors.mobile} required>
              <input
                id="mobile"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                aria-invalid={!!errors.mobile}
                className={inputCls(!!errors.mobile)}
                placeholder="10-digit mobile number"
              />
            </Field>

            <fieldset>
              <legend className="mb-2 block text-sm font-medium text-charcoal-700">
                Order type
              </legend>
              <div className="grid grid-cols-2 gap-3">
                {(["pickup", "delivery"] as OrderType[]).map((type) => (
                  <label
                    key={type}
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold capitalize transition-colors ${
                      orderType === type
                        ? "border-maroon-700 bg-maroon-50 text-maroon-700"
                        : "border-charcoal-200 text-charcoal-600 hover:border-maroon-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="orderType"
                      value={type}
                      checked={orderType === type}
                      onChange={() => setOrderType(type)}
                      className="sr-only"
                    />
                    {type === "pickup" ? "🛍️ Pickup" : "🛵 Delivery"}
                  </label>
                ))}
              </div>
            </fieldset>

            {orderType === "delivery" && (
              <Field label="Delivery address" htmlFor="address" error={errors.address} required>
                <textarea
                  id="address"
                  rows={3}
                  autoComplete="street-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  aria-invalid={!!errors.address}
                  className={inputCls(!!errors.address)}
                  placeholder="Flat / house no., building, area, landmark"
                />
              </Field>
            )}

            <Field label="Special instructions (optional)" htmlFor="instructions">
              <textarea
                id="instructions"
                rows={2}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className={inputCls(false)}
                placeholder="e.g. Less spicy, extra raita"
              />
            </Field>
          </div>
        </div>

        <Button type="submit" size="lg" className="mt-5 w-full">
          Review Order
        </Button>
      </form>

      {/* Cart summary */}
      <aside className="order-1 min-w-0 lg:order-2">
        <div className="rounded-2xl border border-charcoal-100 bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-bold text-charcoal-900">
            Order summary
          </h2>
          <ul className="mt-4 space-y-4">
            {items.map((item) => (
              <li key={item.key} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <VegIndicator vegetarian={item.vegetarian} />
                    <p className="truncate text-sm font-medium text-charcoal-900">
                      {item.name}
                    </p>
                  </div>
                  <span className="mt-1 inline-block rounded-full bg-maroon-50 px-2 py-0.5 text-xs font-medium text-maroon-700">
                    🌶 {item.spiceLevel}
                  </span>
                  <div className="mt-1.5">
                    <QuantityStepper
                      value={item.quantity}
                      onIncrement={() => increment(item.key)}
                      onDecrement={() => decrement(item.key)}
                      label={`${item.name} (${item.spiceLevel})`}
                      size="sm"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-charcoal-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.key)}
                    className="mt-1 text-xs text-charcoal-400 hover:text-maroon-700"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <ExtrasPicker className="mt-6 border-t border-charcoal-100 pt-5" />

          <TotalsBlock
            subtotal={subtotal}
            deliveryFee={totals.deliveryFee}
            total={totals.total}
            orderType={orderType}
          />
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-charcoal-500">{label}</dt>
      <dd className="text-right font-medium text-charcoal-900">{value}</dd>
    </div>
  );
}

function TotalsBlock({
  subtotal,
  deliveryFee,
  total,
  orderType,
}: {
  subtotal: number;
  deliveryFee: number;
  total: number;
  orderType: OrderType;
}) {
  return (
    <div className="mt-5 space-y-2 border-t border-charcoal-100 pt-4 text-sm">
      <div className="flex justify-between text-charcoal-600">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      {orderType === "delivery" && restaurant.deliveryFee > 0 && (
        <div className="flex justify-between text-charcoal-600">
          <span>Delivery fee</span>
          <span>{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</span>
        </div>
      )}
      <div className="flex justify-between border-t border-charcoal-100 pt-2 text-base font-bold text-charcoal-900">
        <span>Total</span>
        <span className="font-display">{formatPrice(total)}</span>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-charcoal-700">
        {label} {required && <span className="text-maroon-700">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs font-medium text-maroon-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function inputCls(hasError: boolean): string {
  return `w-full rounded-xl border bg-white px-4 py-3 text-sm text-charcoal-900 outline-none transition placeholder:text-charcoal-400 focus:ring-2 ${
    hasError
      ? "border-maroon-400 focus:border-maroon-500 focus:ring-maroon-200"
      : "border-charcoal-200 focus:border-maroon-400 focus:ring-maroon-200"
  }`;
}

function WhatsAppGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.8-.6-3-1.3-5-4.4-5.1-4.6-.2-.2-1.3-1.7-1.3-3.2 0-1.5.8-2.3 1-2.6.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5l.9 2.1c.1.2.1.4 0 .6l-.4.6c-.2.2-.4.4-.2.7.2.3.9 1.4 1.9 2.3 1.3 1.1 2.3 1.5 2.6 1.6.3.1.5.1.7-.1l.9-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.4.1.1.1.7-.1 1.3Z" />
    </svg>
  );
}
