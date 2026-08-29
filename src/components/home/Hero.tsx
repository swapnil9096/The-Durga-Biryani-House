import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { DirectionsButton } from "@/components/ui/ActionButtons";
import { restaurant } from "@/config/restaurant";
import { featuredOffer } from "@/data/offers";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-charcoal-950">
      {/* Background image */}
      <div className="absolute inset-0">
        <SmartImage
          src="/images/menu/hero-biryani.jpg"
          alt="Aromatic dum biryani platter garnished with lime and saffron rice"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-charcoal-950/95 via-charcoal-950/80 to-charcoal-950/40"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="container-px relative mx-auto flex min-h-[86vh] max-w-7xl flex-col justify-center py-20 lg:min-h-[90vh]">
        <div className="max-w-2xl">
          <span className="inline-flex animate-slide-down items-center gap-2 rounded-full bg-maroon-700/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cream-50 ring-1 ring-gold-400/40">
            🔥 {featuredOffer.highlight}
          </span>

          <h1 className="mt-6 animate-slide-up font-display text-4xl font-extrabold leading-[1.05] text-cream-50 text-balance sm:text-5xl lg:text-6xl">
            {restaurant.name}
          </h1>

          <p
            className="mt-4 animate-slide-up font-display text-xl italic text-gold-300 sm:text-2xl"
            style={{ animationDelay: "80ms" }}
          >
            {restaurant.tagline}
          </p>

          <p
            className="mt-5 max-w-xl animate-slide-up text-base leading-relaxed text-cream-100/85 sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {restaurant.description}
          </p>

          <div
            className="mt-8 flex animate-slide-up flex-wrap items-center gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Button href="/menu" size="lg" variant="gold">
              Order Now
            </Button>
            <Button
              href="/menu"
              size="lg"
              variant="outline"
              className="border-cream-100 text-cream-50 hover:bg-cream-50 hover:text-charcoal-900"
            >
              View Menu
            </Button>
            <DirectionsButton
              size="lg"
              variant="ghost"
              className="text-cream-100 hover:bg-white/10"
            />
          </div>

          {/* Trust strip */}
          <ul
            className="mt-10 flex animate-fade-in flex-wrap gap-x-6 gap-y-2 text-sm text-cream-100/80"
            style={{ animationDelay: "320ms" }}
          >
            <li className="flex items-center gap-2">
              <Dot /> Dum-cooked fresh daily
            </li>
            <li className="flex items-center gap-2">
              <Dot /> Premium basmati rice
            </li>
            <li className="flex items-center gap-2">
              <Dot /> Hygienic kitchen
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden="true" />;
}
