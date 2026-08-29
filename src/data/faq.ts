import type { FaqItem } from "@/types";
import { restaurant, fullAddress } from "@/config/restaurant";

/**
 * FAQ
 * ----
 * Editable question/answer pairs. Also used to generate FAQ structured data.
 */

export const faqs: FaqItem[] = [
  {
    id: "location",
    question: "Where is The Durga Biryani House located?",
    answer: `We are located at ${fullAddress}. We're easy to find near Dhole Patil College in Kharadi, Pune.`,
  },
  {
    id: "order",
    question: "How do I place an order?",
    answer:
      "Browse our menu, add items to your cart, and check out. Your order is sent to us over WhatsApp for confirmation — you can choose pickup or delivery.",
  },
  {
    id: "delivery",
    question: "Do you offer delivery?",
    answer:
      "Yes. Choose “Delivery” at checkout and share your address. Delivery availability may depend on your distance from our Kharadi kitchen.",
  },
  {
    id: "offer",
    question: "Is the ₹99 biryani offer still available?",
    answer:
      "The ₹99 biryani is a limited-time opening offer. Check our Offers page for current promotions and terms, as availability may change.",
  },
  {
    id: "veg",
    question: "Do you have vegetarian options?",
    answer:
      "Absolutely. We serve Veg Dum Biryani and Paneer Biryani. Use the “Veg only” filter on the menu.",
  },
  {
    id: "hours",
    question: "What are your opening hours?",
    answer: `We are open ${restaurant.openingHours[0].hours} on most days. See the Contact page for full weekly hours.`,
  },
  {
    id: "hygiene",
    question: "How do you ensure food hygiene?",
    answer:
      "Our kitchen follows strict cleanliness routines, fresh daily preparation and careful handling from cooking to packaging.",
  },
  {
    id: "payment",
    question: "What payment methods do you accept?",
    answer:
      "Payment options are confirmed with your order over WhatsApp. Please contact us directly for the latest accepted methods.",
  },
];
