# The Durga Biryani House

A production-ready website for **The Durga Biryani House**, a premium biryani
restaurant in Kharadi, Pune. Built with Next.js (App Router), TypeScript and
Tailwind CSS. Orders are placed through WhatsApp — no payment gateway or backend
is required to go live.

> **Tagline:** *Authentic Taste. Dum-Packed Love.*

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Other commands:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint
npx tsc --noEmit   # type check
```

Node 20+ recommended.

---

## Tech stack

- **Next.js 16** (App Router, static rendering)
- **React 19** + **TypeScript 5**
- **Tailwind CSS v4** (CSS-based `@theme`, no `tailwind.config.js`)
- `next/font` (Playfair Display + Inter), `next/image`
- React Context for cart + toasts (with `localStorage` persistence)

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, opening offer, signature biryanis, why-choose-us, reviews, location |
| `/menu` | Full menu with search, veg/non-veg/bestseller filters, add-to-cart |
| `/about` | Brand story and philosophy |
| `/offers` | Current offers (opening offer featured) |
| `/gallery` | Masonry gallery with lightbox |
| `/reviews` | Customer reviews (currently demo placeholders) |
| `/contact` | Address, hours, map, contact form, call/WhatsApp/directions |
| `/faq` | Accordion FAQ (with FAQ structured data) |
| `/checkout` | Cart review, customer details, WhatsApp order handoff |
| `/terms`, `/privacy` | Editable legal templates |
| `*` | Branded 404 |

---

## How ordering works

1. Customer adds items on `/menu` — the cart persists in `localStorage`.
2. On `/checkout` they enter name, mobile, pickup/delivery (address required for
   delivery) and any special instructions. The form validates before continuing.
3. On confirm, the app builds a formatted WhatsApp message (items, quantities,
   totals, delivery fee) and opens `wa.me/<number>` with it pre-filled.
4. The restaurant confirms availability and final price on WhatsApp.

**Important:** pricing shown on the site is indicative — the totals in the
WhatsApp message are for convenience only. There is no server-side payment, so
final price is always confirmed by the restaurant. Do not treat client-side
totals as authoritative for payment.

---

## Where to change things

Everything an owner needs to edit is data/config — **no UI code changes needed.**

| What | File |
|------|------|
| Name, address, phone, email, hours, socials, delivery fee, site URL | `src/config/restaurant.ts` |
| Navigation links | `src/config/navigation.ts` |
| Menu items & categories | `src/data/menu.ts` |
| Reviews | `src/data/reviews.ts` |
| Gallery images | `src/data/gallery.ts` |
| Offers | `src/data/offers.ts` |
| FAQ | `src/data/faq.ts` |

Images currently point at Unsplash URLs (see `img()` in `src/data/menu.ts` and
`src/data/gallery.ts`). Replace with your own photos and update
`next.config.ts` `images.remotePatterns` if you host them elsewhere.

Brand colours and fonts live in `src/app/globals.css` (`@theme`) and
`src/app/layout.tsx`.

---

## Environment variables

All optional — the site runs without any. Copy `.env.example` to `.env.local`.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Public URL for metadata, canonical, sitemap, OG. No trailing slash. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID (`G-XXXXXXXXXX`). Blank disables analytics. |

No secrets or API keys are committed.

---

## SEO & PWA

- Per-page metadata, canonical URLs, Open Graph + Twitter cards (`src/lib/seo.ts`)
- Structured data: Restaurant, WebSite, FAQPage, Breadcrumbs (`src/lib/structured-data.ts`)
- `sitemap.xml`, `robots.txt` (checkout disallowed), web app manifest — all generated
- App icon (`icon.svg`), Apple icon and Open Graph image are generated dynamically

---

## Remaining placeholders (replace before launch)

The site ships honest placeholders instead of invented facts. While
`usingPlaceholders` is `true` in `src/config/restaurant.ts`, a small notice
banner appears at the top of every page.

- **Phone / WhatsApp / email** — placeholder values in `src/config/restaurant.ts`.
  Set the real ones and flip `usingPlaceholders` to `false` to hide the banner.
- **Social links** — all `null`, so social icons are hidden (not linked to fake
  accounts). Add real URLs in `restaurant.ts` to show them.
- **Reviews** — `src/data/reviews.ts` are clearly marked demo entries. Replace
  with real reviews; the `/reviews` page shows a notice while demo data is present.
- **Geo coordinates** — intentionally omitted from structured data until known.
- **Map embed** — `mapEmbedSrc` uses a query-based Google Maps embed; swap for a
  precise place embed once available.
- **Legal pages** — `/terms` and `/privacy` are editable templates and are
  **not** lawyer-reviewed. Have them reviewed before relying on them.
- **Contact form** — validates and shows success but is **not** wired to a
  backend. See the `INTEGRATION POINT` comment in
  `src/components/contact/ContactForm.tsx`.

---

## Project structure

```
src/
  app/            # routes, layout, sitemap/robots/manifest, icons, OG image
  components/     # ui/, layout/, home/, menu/, cart/, checkout/, gallery/, etc.
  config/         # restaurant.ts, navigation.ts  <- owner-editable
  context/        # CartContext, ToastContext
  data/           # menu, reviews, gallery, offers, faq  <- owner-editable
  lib/            # utils, whatsapp, seo, structured-data, analytics
  types/          # shared TypeScript types
```
