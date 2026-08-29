import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { restaurant } from "@/config/restaurant";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description: `Terms and conditions for using the ${restaurant.name} website and placing orders.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      crumbs={[{ name: "Terms", path: "/terms" }]}
      lastUpdated="August 2026"
      intro={`These terms govern your use of the ${restaurant.name} website and any orders you place through it. By using this site, you agree to these terms.`}
      sections={[
        {
          heading: "Orders",
          body: [
            "Orders placed through this website are submitted to us via WhatsApp and are confirmed by us before they are accepted. Availability of items and final pricing are confirmed at that stage.",
            "We may decline or cancel an order where an item is unavailable, where delivery is outside our service area, or where details provided are incomplete.",
          ],
        },
        {
          heading: "Pricing",
          body: [
            "Prices shown on the website are indicative and may change without notice. The price confirmed by us at order acceptance is the price that applies.",
            "Any offer prices are subject to the specific terms of that offer.",
          ],
        },
        {
          heading: "Offers",
          body: [
            "Promotional offers, including any opening offer, are limited-time and subject to their stated terms. We reserve the right to modify or withdraw an offer at any time.",
          ],
        },
        {
          heading: "Delivery & pickup",
          body: [
            "Delivery availability, timing and any fees are confirmed with your order. Pickup orders should be collected from our address during opening hours.",
          ],
        },
        {
          heading: "Liability",
          body: [
            "We take care to prepare food safely and to describe items accurately. If you have allergies or dietary requirements, please tell us before ordering.",
          ],
        },
        {
          heading: "Contact",
          body: [
            `For any questions about these terms, contact us using the details on our Contact page.`,
          ],
        },
      ]}
    />
  );
}
