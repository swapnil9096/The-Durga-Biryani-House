import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { primaryNav, footerLegal } from "@/config/navigation";
import { restaurant, fullAddress, mapEmbedSrc } from "@/config/restaurant";

export function Footer() {
  const year = 2026;

  return (
    <footer className="mt-auto border-t border-charcoal-800 bg-charcoal-950 text-cream-100">
      <div className="container-px mx-auto max-w-7xl py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo variant="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-200/70">
              {restaurant.description}
            </p>
            <p className="mt-4 font-display text-sm italic text-gold-300">
              {restaurant.tagline}
            </p>
            <SocialLinks className="mt-5" heading="Follow us on Instagram for the latest updates" />
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gold-300">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream-200/80 transition-colors hover:text-gold-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gold-300">
              Visit Us
            </h2>
            <address className="mt-4 space-y-3 text-sm not-italic text-cream-200/80">
              <p className="leading-relaxed">{fullAddress}</p>
              <p>
                <a
                  href={`tel:${restaurant.contact.phone}`}
                  className="transition-colors hover:text-gold-300"
                >
                  {restaurant.contact.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${restaurant.contact.email}`}
                  className="transition-colors hover:text-gold-300"
                >
                  {restaurant.contact.email}
                </a>
              </p>
              <p className="text-cream-200/60">
                Open daily · {restaurant.openingHours[0].hours}
              </p>
            </address>
            <div className="mt-5">
              <Button href="/menu" variant="gold" size="sm">
                Order Now
              </Button>
            </div>
          </div>

          {/* Map */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gold-300">
              Find Us
            </h2>
            <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-charcoal-800">
              <iframe
                src={mapEmbedSrc}
                title={`Map to ${restaurant.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-40 w-full border-0"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-charcoal-800 pt-6 text-sm text-cream-200/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {restaurant.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLegal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-gold-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
