import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { restaurant } from "@/config/restaurant";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${restaurant.name} handles the information you share when you contact us or place an order.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      crumbs={[{ name: "Privacy", path: "/privacy" }]}
      lastUpdated="August 2026"
      intro={`This policy explains what information ${restaurant.name} collects when you use this website, and how we use it. We keep it simple and collect only what we need to serve you.`}
      sections={[
        {
          heading: "What we collect",
          body: [
            "When you place an order, you share your name, mobile number, order type (pickup or delivery) and, for delivery, your address. This information is sent to us via WhatsApp so we can prepare and fulfil your order.",
            "If you use the contact form, we receive the name, contact details and message you provide.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "We use your details only to process and deliver your order, to respond to your enquiry, and to contact you about your order if needed.",
            "We do not sell your personal information.",
          ],
        },
        {
          heading: "Storage in your browser",
          body: [
            "Your cart is saved in your browser's local storage so it is still there if you return. This stays on your device and is not sent anywhere until you place an order.",
          ],
        },
        {
          heading: "Analytics",
          body: [
            "If analytics is enabled, we may collect anonymous usage data (such as pages visited) to help improve the site. This does not identify you personally.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            "You can clear your cart at any time from the cart drawer. You can ask us to update or delete order information we hold about you by contacting us.",
          ],
        },
        {
          heading: "Contact",
          body: [
            "For any questions about this policy, contact us using the details on our Contact page.",
          ],
        },
      ]}
    />
  );
}
