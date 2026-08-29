import { Hero } from "@/components/home/Hero";
import { OfferBanner } from "@/components/home/OfferBanner";
import { SignatureBiryanis } from "@/components/home/SignatureBiryanis";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { LocationSection } from "@/components/home/LocationSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <OfferBanner />
      <SignatureBiryanis />
      <WhyChooseUs />
      <ReviewsSection />
      <LocationSection />
    </>
  );
}
