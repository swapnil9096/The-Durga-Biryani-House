import { Button } from "@/components/ui/Button";
import { DirectionsButton } from "@/components/ui/ActionButtons";
import { restaurant } from "@/config/restaurant";
import { featuredOffer } from "@/data/offers";
import { LiveHeroBackground } from "./LiveHeroBackground";
import { HeroAssemble } from "./HeroAssemble";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-charcoal-950">
      <LiveHeroBackground />

      <div className="container-px relative mx-auto flex min-h-[86vh] max-w-7xl flex-col justify-center py-20 lg:min-h-[90vh]">
        <div className="max-w-2xl">
          <HeroAssemble as="span" x="-24px" delay={0} className="inline-flex items-center gap-2 rounded-full bg-maroon-700/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cream-50 ring-1 ring-gold-400/40">
            🔥 {featuredOffer.highlight}
          </HeroAssemble>

          <HeroAssemble as="h1" y="48px" scale={0.92} delay={100} className="mt-6 font-display text-4xl font-extrabold leading-[1.05] text-cream-50 text-balance sm:text-5xl lg:text-6xl">
            {restaurant.name}
          </HeroAssemble>

          <HeroAssemble as="p" x="32px" delay={220} className="mt-4 font-display text-xl italic text-gold-300 sm:text-2xl">
            {restaurant.tagline}
          </HeroAssemble>

          <HeroAssemble as="p" y="32px" delay={320} className="mt-5 max-w-xl text-base leading-relaxed text-cream-100/85 sm:text-lg">
            {restaurant.description}
          </HeroAssemble>

          <HeroAssemble as="div" y="40px" scale={0.94} delay={440} className="mt-8 flex flex-wrap items-center gap-3">
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
          </HeroAssemble>

          {/* Trust strip */}
          <HeroAssemble as="ul" y="24px" delay={560} className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream-100/80">
            <li className="flex items-center gap-2">
              <Dot /> Dum-cooked fresh daily
            </li>
            <li className="flex items-center gap-2">
              <Dot /> Premium basmati rice
            </li>
            <li className="flex items-center gap-2">
              <Dot /> Hygienic kitchen
            </li>
          </HeroAssemble>
        </div>
      </div>
    </section>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden="true" />;
}
