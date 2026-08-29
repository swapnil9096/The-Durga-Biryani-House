import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

import { restaurant } from "@/config/restaurant";
import { siteUrl } from "@/lib/seo";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { PlaceholderNotice } from "@/components/layout/PlaceholderNotice";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FloatingCartButton } from "@/components/cart/FloatingCartButton";
import { BackToTop } from "@/components/ui/BackToTop";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { restaurantJsonLd, websiteJsonLd } from "@/lib/structured-data";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${restaurant.name} — Biryani in Kharadi, Pune`,
    template: `%s · ${restaurant.name}`,
  },
  description: restaurant.description,
  applicationName: restaurant.name,
  keywords: [
    "The Durga Biryani House",
    "biryani in Kharadi",
    "best biryani in Kharadi",
    "biryani near Dhole Patil College",
    "biryani restaurant Kharadi Pune",
    "chicken biryani Pune",
    "veg biryani Kharadi",
    "egg biryani Kharadi",
    "paneer biryani Kharadi",
  ],
  authors: [{ name: restaurant.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: restaurant.name,
    locale: "en_IN",
    url: siteUrl,
    title: `${restaurant.name} — Authentic Dum Biryani in Kharadi`,
    description: restaurant.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${restaurant.name} — Biryani in Kharadi, Pune`,
    description: restaurant.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#7a1f1d",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-cream-50 antialiased">
        <JsonLd data={restaurantJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <GoogleAnalytics />
        <ToastProvider>
          <CartProvider>
            <PlaceholderNotice />
            <Header />
            <main id="main" className="flex-1 pb-16 lg:pb-0">
              {children}
            </main>
            <Footer />
            <MobileBottomNav />
            <CartDrawer />
            <FloatingCartButton />
            <BackToTop />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
