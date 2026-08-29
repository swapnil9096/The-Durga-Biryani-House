import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "🍲",
    title: "Authentic Flavour",
    description: "Time-honoured recipes and a spice blend that stays true to classic biryani.",
  },
  {
    icon: "🌾",
    title: "Premium Ingredients",
    description: "Long-grain basmati, fresh meat and hand-picked spices in every pot.",
  },
  {
    icon: "🔥",
    title: "Freshly Prepared",
    description: "Cooked fresh through the day — never reheated, always aromatic.",
  },
  {
    icon: "⏳",
    title: "Dum Cooked",
    description: "Sealed and slow-cooked on dum so every grain soaks up the flavour.",
  },
  {
    icon: "✨",
    title: "Hygienic Kitchen",
    description: "Clean routines and careful handling from prep to packaging.",
  },
  {
    icon: "💛",
    title: "Value for Money",
    description: "Generous portions and honest pricing — great biryani that fits your budget.",
  },
];

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-heading" className="container-px mx-auto max-w-7xl py-16 sm:py-24">
      <SectionHeading
        eyebrow="Why choose us"
        title="Biryani Worth Coming Back For"
        description="Every plate is built on the fundamentals that make biryani special."
        tone="dark"
      />

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 60}>
            <div className="flex h-full items-start gap-4 rounded-2xl border border-cream-100/15 bg-charcoal-950/45 p-6 backdrop-blur-md transition-colors hover:bg-charcoal-950/60">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-maroon-700/40 text-2xl ring-1 ring-gold-400/20"
                aria-hidden="true"
              >
                {f.icon}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-cream-50">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-cream-100/75">
                  {f.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
