import { Hero } from "@/components/home/Hero";
import { BiryaniAssembly } from "@/components/home/BiryaniAssembly";
import { OfferBanner } from "@/components/home/OfferBanner";
import { SignatureBiryanis } from "@/components/home/SignatureBiryanis";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { LocationSection } from "@/components/home/LocationSection";

export default function HomePage() {
  return (
    <>
      {/* Fixed live background: the biryani assembles into the handi across the
          whole home-page scroll, fully plated near the bottom. */}
      <BiryaniAssembly />
      <div className="relative z-10">
        <Hero />
        <OfferBanner />
        <SignatureBiryanis />
        <WhyChooseUs />
        <ReviewsSection />
        <LocationSection />
      </div>
    </>
  );
}
