"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { featuredOffer } from "@/data/offers";
import { track } from "@/lib/analytics";

export function OfferBanner() {
  const [showTerms, setShowTerms] = useState(false);
  const offer = featuredOffer;

  return (
    <section aria-labelledby="offer-heading" className="container-px mx-auto max-w-7xl py-14 sm:py-20">
      <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-maroon-800 via-maroon-700 to-maroon-900 px-6 py-10 shadow-xl sm:px-12 sm:py-14">
        {/* Decorative accent */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-400/20 blur-2xl"
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-300 px-3 py-1 text-xs font-bold uppercase tracking-wider text-charcoal-950">
              {offer.title}
            </span>
            <h2
              id="offer-heading"
              className="mt-4 font-display text-3xl font-extrabold text-cream-50 sm:text-5xl"
            >
              {offer.highlight}
            </h2>
            <p className="mt-3 text-cream-100/85">{offer.description}</p>
            <p className="mt-2 text-sm font-medium text-gold-300">
              {offer.validity}
            </p>

            <button
              type="button"
              onClick={() => setShowTerms((v) => !v)}
              aria-expanded={showTerms}
              className="mt-3 text-sm font-medium text-cream-100/70 underline underline-offset-2 hover:text-cream-50"
            >
              {showTerms ? "Hide terms" : "Terms & conditions"}
            </button>
            {showTerms && (
              <ul className="mt-3 animate-slide-down list-disc space-y-1 pl-5 text-sm text-cream-100/70">
                {offer.terms.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex shrink-0 flex-col gap-3">
            <Button
              href={offer.ctaHref}
              size="lg"
              variant="gold"
              onClick={() => track("offer_clicked", { offer_id: offer.id })}
            >
              {offer.ctaLabel}
            </Button>
            <Link
              href="/offers"
              className="text-center text-sm font-medium text-cream-100/80 hover:text-cream-50"
            >
              See all offers →
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
