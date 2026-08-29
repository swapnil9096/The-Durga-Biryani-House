"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { primaryNav } from "@/config/navigation";
import { restaurant } from "@/config/restaurant";
import { Logo } from "@/components/ui/Logo";
import { useCart } from "@/context/CartContext";
import { track } from "@/lib/analytics";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const instagram = restaurant.socials.find((s) => s.platform === "instagram");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-gold-400 focus:px-4 focus:py-2 focus:text-charcoal-950"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "sticky top-0 z-50 w-full overflow-hidden transition-shadow duration-300",
          scrolled ? "shadow-lg shadow-charcoal-950/40" : ""
        )}
      >
        {/* Dark base + biryani photo blended on the right */}
        <div className="absolute inset-0 -z-10 bg-charcoal-950" aria-hidden="true">
          <div
            className="absolute inset-y-0 right-0 w-2/3 bg-cover bg-center opacity-60"
            style={{ backgroundImage: "url(/images/menu/hero-biryani.jpg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-950/95 to-charcoal-950/40" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
        </div>

        <div className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 lg:h-20">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm font-semibold uppercase tracking-wide transition-colors",
                      isActive(link.href)
                        ? "text-gold-300"
                        : "text-cream-100/80 hover:text-gold-300"
                    )}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-gold-400" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Cart */}
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-cream-100 ring-1 ring-cream-100/20 transition-colors hover:bg-cream-100/10"
            >
              <CartIcon />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-400 px-1 text-[11px] font-bold text-charcoal-950">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>

            {/* Round social icon buttons (desktop) */}
            <div className="hidden items-center gap-2 lg:flex">
              <IconButton
                href={`tel:${restaurant.contact.phone}`}
                label="Call us"
                onClick={() => track("call_clicked")}
              >
                <PhoneIcon />
              </IconButton>
              <IconButton
                href={`https://wa.me/${restaurant.contact.whatsapp}`}
                label="Chat on WhatsApp"
                onClick={() => track("whatsapp_clicked")}
              >
                <WhatsAppIcon />
              </IconButton>
              {instagram?.url && (
                <IconButton
                  href={instagram.url}
                  label="Instagram"
                  onClick={() => track("instagram_clicked")}
                >
                  <InstagramIcon />
                </IconButton>
              )}
            </div>

            {/* Get Directions pill */}
            <a
              href={restaurant.maps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("directions_clicked")}
              className="hidden items-center gap-2 rounded-full bg-gold-300 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-charcoal-950 shadow-sm transition-colors hover:bg-gold-400 sm:inline-flex"
            >
              <PinIcon />
              Get Directions
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full text-cream-100 ring-1 ring-cream-100/20 transition-colors hover:bg-cream-100/10 lg:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function IconButton({
  href,
  label,
  onClick,
  children,
}: {
  href: string;
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-300 text-charcoal-950 shadow-sm transition-colors hover:bg-gold-400"
    >
      {children}
    </a>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6h15l-1.5 9h-12L5 3H2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.4" fill="currentColor" />
      <circle cx="18" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2a1 1 0 011-.24c1.1.37 2.3.57 3.5.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.2.2 2.4.57 3.5a1 1 0 01-.24 1l-2.23 2.3z"
        fill="currentColor"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.26A10 10 0 1012 2zm0 2a8 8 0 016.8 12.2 8 8 0 01-9.9 3l-.34-.2-2.85.75.76-2.77-.22-.36A8 8 0 0112 4zm-3 3.4c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.2.87 2.35 1 2.5.12.16 1.7 2.7 4.18 3.68 2.06.82 2.48.66 2.93.62.45-.04 1.45-.6 1.65-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.46-.28-.24-.12-1.45-.72-1.67-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.77.96-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.34-.74-1.83-.19-.46-.39-.4-.53-.4z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.4" fill="currentColor" />
    </svg>
  );
}
