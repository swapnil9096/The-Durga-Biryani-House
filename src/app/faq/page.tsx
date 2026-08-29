import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: "FAQ — Frequently Asked Questions",
  description:
    "Answers to common questions about ordering, delivery, offers and vegetarian options at The Durga Biryani House, Kharadi.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <PageHeader
        title="Frequently Asked Questions"
        description="Everything you might want to know before you order."
        crumbs={[{ name: "FAQ", path: "/faq" }]}
      />
      <div className="container-px mx-auto max-w-3xl py-12">
        <FaqAccordion />
        <div className="mt-10 rounded-2xl bg-cream-100/70 p-6 text-center">
          <h2 className="font-display text-xl font-bold text-charcoal-900">
            Still have a question?
          </h2>
          <p className="mt-1 text-sm text-charcoal-600">
            We&apos;re happy to help — reach out any time.
          </p>
          <div className="mt-4">
            <Button href="/contact" size="md">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
