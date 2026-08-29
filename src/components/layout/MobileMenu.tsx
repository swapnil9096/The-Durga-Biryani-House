"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { primaryNav, footerLegal } from "@/config/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { restaurant } from "@/config/restaurant";
import { track } from "@/lib/analytics";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[75] lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
      inert={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-charcoal-950/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-cream-50 shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-charcoal-200 px-5 py-4">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal-700 hover:bg-charcoal-100"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-maroon-50 text-maroon-700"
                      : "text-charcoal-700 hover:bg-charcoal-100"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 px-4">
            {footerLegal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="text-sm text-charcoal-500 hover:text-maroon-700"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="space-y-2 border-t border-charcoal-200 px-5 py-4">
          <Button href="/menu" onClick={onClose} className="w-full" size="lg">
            Order Now
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button
              href={`tel:${restaurant.contact.phone}`}
              external
              variant="outline"
              size="sm"
              onClick={() => track("call_clicked")}
            >
              Call
            </Button>
            <Button
              href={restaurant.maps.directionsUrl}
              external
              variant="outline"
              size="sm"
              onClick={() => track("directions_clicked")}
            >
              Directions
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
