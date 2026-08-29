import { Button } from "@/components/ui/Button";
import { DirectionsButton } from "@/components/ui/ActionButtons";
import { restaurant } from "@/config/restaurant";
import { featuredOffer } from "@/data/offers";
import { HeroAssemble } from "./HeroAssemble";

/**
 * Hero copy only. The biryani imagery lives in <BiryaniAssembly />, a fixed
 * background that assembles across the whole page, so the hero is transparent
 * and simply lays its text over that scene.
 */
export function Hero() {
  return (
    <section className="relative">
      <div className="container-px relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center py-14 sm:py-16 lg:py-20">
        <div className="max-w-2xl">
          <HeroAssemble
            as="span"
            x="-24px"
            delay={0}
            className="inline-flex items-center gap-2 rounded-full bg-maroon-700/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cream-50 ring-1 ring-gold-400/40 backdrop-blur-sm"
          >
            {restaurant.name}
          </HeroAssemble>

          <HeroAssemble
            as="h1"
            y="48px"
            scale={0.92}
            delay={100}
            className="mt-6 font-display text-[clamp(1.75rem,8vw,2rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-cream-50 text-balance [text-shadow:0_2px_24px_rgba(0,0,0,0.6)] sm:text-5xl lg:text-[3.25rem] xl:text-6xl"
          >
            <span className="block">Authentic Taste.</span>
            <span className="block text-gold-300">Dum-Packed Love.</span>
          </HeroAssemble>

          <HeroAssemble
            as="p"
            y="32px"
            delay={260}
            className="mt-5 max-w-xl text-base leading-relaxed text-cream-100/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.6)] sm:text-lg"
          >
            Experience fragrant, flavorful biryani crafted with aromatic spices, premium
            basmati rice and slow dum cooking.
          </HeroAssemble>

          <HeroAssemble
            as="div"
            y="40px"
            scale={0.94}
            delay={400}
            className="mt-8 flex flex-wrap items-center gap-3"
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
          </HeroAssemble>

          {/* Trust strip */}
          <HeroAssemble
            as="ul"
            y="24px"
            delay={540}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream-100/85"
          >
            <li className="flex items-center gap-2 font-semibold text-gold-300">
              <Dot /> {featuredOffer.highlight}
            </li>
            <li className="flex items-center gap-2">
              <Dot /> Dum-cooked fresh daily
            </li>
            <li className="flex items-center gap-2">
              <Dot /> Premium basmati rice
            </li>
          </HeroAssemble>

          {/* Scroll cue — the assembly is scroll-driven, so invite the scroll. */}
          <HeroAssemble
            as="div"
            delay={720}
            className="mt-14 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-cream-100/60"
          >
            <span className="scroll-cue flex h-9 w-5 items-start justify-center rounded-full border border-cream-100/40 p-1">
              <span className="scroll-cue-dot h-1.5 w-1.5 rounded-full bg-gold-300" />
            </span>
            Scroll to plate the biryani
          </HeroAssemble>
        </div>
      </div>
    </section>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden="true" />;
}
