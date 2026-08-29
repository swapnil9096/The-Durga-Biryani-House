import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import {
  CallButton,
  WhatsAppButton,
  DirectionsButton,
} from "@/components/ui/ActionButtons";
import { restaurant, fullAddress, mapEmbedSrc } from "@/config/restaurant";

export function LocationSection() {
  return (
    <section aria-labelledby="location-heading" className="container-px mx-auto max-w-7xl py-16 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="rounded-3xl border border-cream-100/15 bg-charcoal-950/45 p-6 backdrop-blur-md sm:p-8">
          <SectionHeading
            eyebrow="Find us in Kharadi"
            title="Visit The Durga Biryani House"
            align="left"
            tone="dark"
          />
          <address className="mt-6 space-y-4 not-italic">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-gold-300" aria-hidden="true">
                📍
              </span>
              <p className="text-cream-100/85">{fullAddress}</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-gold-300" aria-hidden="true">
                🕑
              </span>
              <p className="text-cream-100/85">
                Open daily · 11:00 AM – 11:00 PM{" "}
                <span className="text-cream-100/60">(till 11:30 PM Fri–Sun)</span>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-gold-300" aria-hidden="true">
                📞
              </span>
              <a
                href={`tel:${restaurant.contact.phone}`}
                className="text-cream-100/85 hover:text-gold-300"
              >
                {restaurant.contact.phoneDisplay}
              </a>
            </div>
          </address>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/menu" size="md">
              Order Now
            </Button>
            <DirectionsButton variant="outline" label="Directions" />
            <CallButton variant="outline" />
            <WhatsAppButton variant="outline" />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-charcoal-100 shadow-sm">
          <iframe
            src={mapEmbedSrc}
            title={`Map showing ${restaurant.name} location`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[320px] w-full border-0 sm:h-[400px]"
          />
        </div>
      </div>
    </section>
  );
}
