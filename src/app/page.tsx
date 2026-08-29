import { AssemblyScene } from "@/components/home/AssemblyScene";
import { Hero } from "@/components/home/Hero";
import { OfferBanner } from "@/components/home/OfferBanner";
import { SignatureBiryanis } from "@/components/home/SignatureBiryanis";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { LocationSection } from "@/components/home/LocationSection";

export default function HomePage() {
  return (
    <>
      {/* Fixed live wallpaper: the biryani assembles across the whole page scroll. */}
      <AssemblyScene />
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
