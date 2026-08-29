import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Checkout",
    description: "Review your order and send it to The Durga Biryani House over WhatsApp.",
    path: "/checkout",
  }),
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <>
      <PageHeader
        title="Checkout"
        crumbs={[
          { name: "Menu", path: "/menu" },
          { name: "Checkout", path: "/checkout" },
        ]}
      />
      <div className="container-px mx-auto max-w-5xl py-10">
        <CheckoutForm />
      </div>
    </>
  );
}
