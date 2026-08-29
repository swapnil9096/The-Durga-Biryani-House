"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

/**
 * Sticky bottom navigation on mobile: Home, Menu, Cart, Order.
 * Hidden on the checkout page to avoid covering the submit button.
 */
export function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  if (pathname.startsWith("/checkout")) return null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkCls = (active: boolean) =>
    cn(
      "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium transition-colors",
      active ? "text-maroon-700" : "text-charcoal-500"
    );

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-charcoal-200 bg-cream-50/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <div className="mx-auto flex max-w-lg items-stretch">
        <Link href="/" className={linkCls(isActive("/"))} aria-current={isActive("/") ? "page" : undefined}>
          <HomeIcon />
          Home
        </Link>
        <Link
          href="/menu"
          className={linkCls(isActive("/menu"))}
          aria-current={isActive("/menu") ? "page" : undefined}
        >
          <MenuIcon />
          Menu
        </Link>
        <button type="button" onClick={openCart} className={linkCls(false)} aria-label={`Cart, ${itemCount} items`}>
          <span className="relative">
            <CartIcon />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-maroon-700 px-1 text-[10px] font-bold text-cream-50">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </span>
          Cart
        </button>
        <Link
          href="/menu"
          className="m-1.5 flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl bg-maroon-700 py-1.5 text-[11px] font-semibold text-cream-50"
        >
          <OrderIcon />
          Order
        </Link>
      </div>
    </nav>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 11l9-8 9 8M5 10v10h14V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6h15l-1.5 9h-12L5 3H2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="20" r="1.3" fill="currentColor" />
      <circle cx="18" cy="20" r="1.3" fill="currentColor" />
    </svg>
  );
}
function OrderIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 3h14v18l-7-3-7 3V3z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
