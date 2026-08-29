"use client";

import { Button, type ButtonProps } from "./Button";
import { restaurant } from "@/config/restaurant";
import { track } from "@/lib/analytics";

type SharedProps = Pick<ButtonProps, "size" | "variant" | "className">;

export function CallButton(props: SharedProps) {
  return (
    <Button
      href={`tel:${restaurant.contact.phone}`}
      external
      onClick={() => track("call_clicked")}
      aria-label="Call the restaurant"
      {...props}
    >
      <PhoneIcon /> Call
    </Button>
  );
}

export function WhatsAppButton({
  label = "WhatsApp",
  message,
  ...props
}: SharedProps & { label?: string; message?: string }) {
  const href = `https://wa.me/${restaurant.contact.whatsapp}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;
  return (
    <Button
      href={href}
      external
      onClick={() => track("whatsapp_order_clicked")}
      aria-label="Message us on WhatsApp"
      {...props}
    >
      <WhatsAppIcon /> {label}
    </Button>
  );
}

export function DirectionsButton({
  label = "Get Directions",
  ...props
}: SharedProps & { label?: string }) {
  return (
    <Button
      href={restaurant.maps.directionsUrl}
      external
      onClick={() => track("directions_clicked")}
      aria-label="Get directions to the restaurant"
      {...props}
    >
      <PinIcon /> {label}
    </Button>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.3 1l-2.1 2.3Z"
        fill="currentColor"
      />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.8-.6-3-1.3-5-4.4-5.1-4.6-.2-.2-1.3-1.7-1.3-3.2 0-1.5.8-2.3 1-2.6.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5l.9 2.1c.1.2.1.4 0 .6l-.4.6c-.2.2-.4.4-.2.7.2.3.9 1.4 1.9 2.3 1.3 1.1 2.3 1.5 2.6 1.6.3.1.5.1.7-.1l.9-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.4.1.1.1.7-.1 1.3Z" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
