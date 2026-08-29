"use client";

import { useState } from "react";
import type { Offer } from "@/types";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

export function OfferCard({ offer }: { offer: Offer }) {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <article
      className={`overflow-hidden rounded-2xl border shadow-sm ${
        offer.featured
          ? "border-maroon-200 bg-gradient-to-br from-maroon-700 to-maroon-900 text-cream-50"
          : "border-charcoal-100 bg-white text-charcoal-900"
      }`}
    >
      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="max-w-xl">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
              offer.featured
                ? "bg-gold-300 text-charcoal-950"
                : "bg-maroon-50 text-maroon-700"
            }`}
          >
            {offer.title}
          </span>
          <h2 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">
            {offer.highlight}
          </h2>
          <p className={offer.featured ? "mt-2 text-cream-100/85" : "mt-2 text-charcoal-600"}>
            {offer.description}
          </p>
          <p
            className={`mt-2 text-sm font-medium ${
              offer.featured ? "text-gold-300" : "text-maroon-700"
            }`}
          >
            {offer.validity}
          </p>

          <button
            type="button"
            onClick={() => setShowTerms((v) => !v)}
            aria-expanded={showTerms}
            className={`mt-3 text-sm underline underline-offset-2 ${
              offer.featured ? "text-cream-100/70 hover:text-cream-50" : "text-charcoal-500 hover:text-maroon-700"
            }`}
          >
            {showTerms ? "Hide terms" : "Terms & conditions"}
          </button>
          {showTerms && (
            <ul
              className={`mt-3 animate-slide-down list-disc space-y-1 pl-5 text-sm ${
                offer.featured ? "text-cream-100/70" : "text-charcoal-500"
              }`}
            >
              {offer.terms.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="shrink-0">
          <Button
            href={offer.ctaHref}
            variant={offer.featured ? "gold" : "primary"}
            size="lg"
            onClick={() => track("offer_clicked", { offer_id: offer.id })}
          >
            {offer.ctaLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}
