import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import {
  CallButton,
  WhatsAppButton,
  DirectionsButton,
} from "@/components/ui/ActionButtons";
import { restaurant, fullAddress, mapEmbedSrc } from "@/config/restaurant";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Location",
  description:
    "Contact The Durga Biryani House in Kharadi, Pune. Address, phone, WhatsApp, opening hours and directions near Dhole Patil College.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="We'd love to hear from you. Call, WhatsApp, or drop by."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <div className="container-px mx-auto max-w-7xl py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left: details */}
          <div>
            <h2 className="font-display text-2xl font-bold text-charcoal-900">
              Visit or reach out
            </h2>

            <address className="mt-6 space-y-5 not-italic">
              <InfoRow icon="📍" label="Address">
                {fullAddress}
              </InfoRow>
              <InfoRow icon="📞" label="Phone">
                <a href={`tel:${restaurant.contact.phone}`} className="hover:text-maroon-700">
                  {restaurant.contact.phoneDisplay}
                </a>
              </InfoRow>
              <InfoRow icon="✉️" label="Email">
                <a href={`mailto:${restaurant.contact.email}`} className="hover:text-maroon-700">
                  {restaurant.contact.email}
                </a>
              </InfoRow>
            </address>

            {/* Hours */}
            <div className="mt-8">
              <h3 className="font-display text-lg font-bold text-charcoal-900">
                Opening hours
              </h3>
              <dl className="mt-3 divide-y divide-charcoal-100 rounded-xl border border-charcoal-100 bg-white">
                {restaurant.openingHours.map((h) => (
                  <div key={h.day} className="flex justify-between px-4 py-2.5 text-sm">
                    <dt className="font-medium text-charcoal-700">{h.day}</dt>
                    <dd className="text-charcoal-500">
                      {h.closed ? "Closed" : h.hours}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <CallButton />
              <WhatsAppButton />
              <DirectionsButton variant="outline" label="Directions" />
            </div>
          </div>

          {/* Right: form + map */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-charcoal-100 bg-white p-6 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-charcoal-900">
                Send us a message
              </h2>
              <p className="mt-1 text-sm text-charcoal-500">
                For orders, please use the menu &amp; WhatsApp checkout — it&apos;s fastest.
              </p>
              <div className="mt-5">
                <ContactForm />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-charcoal-100 shadow-sm">
              <iframe
                src={mapEmbedSrc}
                title={`Map showing ${restaurant.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-lg text-maroon-700" aria-hidden="true">
        {icon}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-400">
          {label}
        </p>
        <p className="text-charcoal-700">{children}</p>
      </div>
    </div>
  );
}
