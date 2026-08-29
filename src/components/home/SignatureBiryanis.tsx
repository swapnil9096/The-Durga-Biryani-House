import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { MenuCard } from "@/components/menu/MenuCard";
import { signatureBiryanis } from "@/data/menu";

export function SignatureBiryanis() {
  if (signatureBiryanis.length === 0) return null;

  return (
    <section aria-labelledby="signature-heading" className="py-16 sm:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Crafted with care"
          title="Our Signature Biryanis"
          description="Slow-cooked on dum with aromatic spices and premium basmati — these are the dishes our guests come back for."
          tone="dark"
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {signatureBiryanis.map((item, i) => (
            <Reveal key={item.id} delay={i * 80}>
              <MenuCard item={item} />
            </Reveal>
          ))}
        </div>

        <div className="mt-6 text-center sm:mt-8">
          <Button href="/menu" variant="primary" size="lg">
            Explore Full Menu
          </Button>
        </div>
      </div>
    </section>
  );
}
