import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { restaurant } from "@/config/restaurant";

export const metadata: Metadata = pageMetadata({
  title: "About Us — Our Story & Philosophy",
  description:
    "Learn what makes biryani at The Durga Biryani House special — authentic dum cooking, premium ingredients, a hygienic kitchen and a customer-first approach in Kharadi, Pune.",
  path: "/about",
});

const pillars = [
  {
    title: "What Makes Our Biryani Special",
    body: "We layer marinated meat or vegetables with fragrant basmati and a house spice blend, then seal and slow-cook on dum so every grain carries the aroma.",
  },
  {
    title: "Premium Ingredients",
    body: "Long-grain basmati, fresh produce and carefully sourced spices. We keep the ingredient list honest and the flavour generous.",
  },
  {
    title: "Authentic Dum Cooking",
    body: "The dum method — cooking under a sealed lid on low heat — is at the heart of what we do. It takes time, and it is worth it.",
  },
  {
    title: "Quality & Hygiene",
    body: "Clean prep routines, fresh daily cooking and careful handling from the kitchen to your packaging.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Our Story"
        description="A neighbourhood biryani house built on flavour, freshness and a whole lot of love."
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <div className="container-px mx-auto max-w-7xl py-14">
        {/* Story */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
              <SmartImage
                src="https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=1000&q=70"
                alt="A generous plate of biryani garnished with fried onions and mint"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading
              eyebrow="Our story"
              title="Biryani, the way it should be"
              align="left"
            />
            <div className="mt-5 space-y-4 text-charcoal-600">
              <p>
                {restaurant.name} began with a simple idea: serve honest,
                aromatic biryani that people in Kharadi can enjoy any day of the
                week. No shortcuts, no compromise on flavour.
              </p>
              <p>
                Every pot is prepared fresh and cooked on dum, so the spices and
                rice come together the way they&apos;re meant to. We believe
                great biryani should be affordable, comforting and made with care
                — and that&apos;s exactly what we set out to do.
              </p>
              <p className="font-display text-lg italic text-maroon-700">
                {restaurant.tagline}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Philosophy pillars */}
        <div className="mt-20">
          <SectionHeading
            eyebrow="Our philosophy"
            title="Made Fresh, Served with Pride"
            description="A few things we care deeply about in every order."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div className="h-full rounded-2xl border border-charcoal-100 bg-white p-6 shadow-sm">
                  <h3 className="font-display text-xl font-bold text-charcoal-900">
                    {p.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-charcoal-600">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Customer first CTA */}
        <Reveal>
          <div className="mt-20 rounded-3xl bg-charcoal-950 px-6 py-12 text-center text-cream-50 sm:px-12">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Customer First, Always
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-cream-100/80">
              Your feedback shapes our kitchen. We&apos;re a growing local brand
              and we treat every order like it matters — because it does.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button href="/menu" variant="gold" size="lg">
                Order Now
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="border-cream-100 text-cream-50 hover:bg-cream-50 hover:text-charcoal-900"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
