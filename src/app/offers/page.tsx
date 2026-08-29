import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { OfferCard } from "@/components/offers/OfferCard";
import { offers } from "@/data/offers";

export const metadata: Metadata = pageMetadata({
  title: "Offers — Any Biryani @ ₹99 & More",
  description:
    "Current offers at The Durga Biryani House, Kharadi — including our limited-time opening offer: any biryani at ₹99. Terms apply.",
  path: "/offers",
});

export default function OffersPage() {
  return (
    <>
      <PageHeader
        title="Offers"
        description="Great biryani, even better value. Check what's on right now."
        crumbs={[{ name: "Offers", path: "/offers" }]}
      />
      <div className="container-px mx-auto max-w-5xl py-12">
        <div className="grid gap-6">
          {offers.map((offer, i) => (
            <Reveal key={offer.id} delay={i * 80}>
              <OfferCard offer={offer} />
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-charcoal-400">
          Offers are limited-time and subject to change. The restaurant reserves
          the right to modify or withdraw any offer.
        </p>
      </div>
    </>
  );
}
