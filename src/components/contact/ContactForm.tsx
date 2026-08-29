"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";

/**
 * Contact form — INTEGRATION-READY, not yet wired to a backend.
 * On submit it validates client-side and shows a clear notice that no message
 * is actually delivered until an email/API integration is added.
 *
 * To make it live: POST the payload to your endpoint (e.g. /api/contact or a
 * form service like Formspree/Resend) inside handleSubmit where indicated.
 */
export function ContactForm() {
  const { toast } = useToast();
  const [values, setValues] = useState({ name: "", contact: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const validate = () => {
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.contact.trim()) next.contact = "Please enter a mobile number or email.";
    if (!values.message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast("Please complete the required fields.", "error");
      return;
    }

    // ── INTEGRATION POINT ──────────────────────────────────
    // Replace the block below with a real request, e.g.:
    //   await fetch("/api/contact", { method: "POST", body: JSON.stringify(values) })
    // ───────────────────────────────────────────────────────
    setSubmitted(true);
    toast("Thanks! We've noted your message.", "success");
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl">
          ✓
        </div>
        <h3 className="mt-3 font-display text-lg font-bold text-charcoal-900">
          Message received
        </h3>
        <p className="mt-1 text-sm text-charcoal-600">
          Thanks, {values.name.split(" ")[0] || "there"}! For anything urgent,
          please call or WhatsApp us directly — that&apos;s the fastest way to reach us.
        </p>
        <p className="mt-3 text-xs text-charcoal-400">
          Note: this demo form isn&apos;t connected to email yet. See the code
          comment in ContactForm for how to wire it up.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium text-charcoal-700">
          Name <span className="text-maroon-700">*</span>
        </label>
        <input
          id="c-name"
          type="text"
          value={values.name}
          onChange={update("name")}
          aria-invalid={!!errors.name}
          className={cls(!!errors.name)}
          placeholder="Your name"
        />
        {errors.name && <p className="mt-1 text-xs text-maroon-700" role="alert">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="c-contact" className="mb-1.5 block text-sm font-medium text-charcoal-700">
          Mobile or email <span className="text-maroon-700">*</span>
        </label>
        <input
          id="c-contact"
          type="text"
          value={values.contact}
          onChange={update("contact")}
          aria-invalid={!!errors.contact}
          className={cls(!!errors.contact)}
          placeholder="So we can reply"
        />
        {errors.contact && <p className="mt-1 text-xs text-maroon-700" role="alert">{errors.contact}</p>}
      </div>

      <div>
        <label htmlFor="c-message" className="mb-1.5 block text-sm font-medium text-charcoal-700">
          Message <span className="text-maroon-700">*</span>
        </label>
        <textarea
          id="c-message"
          rows={4}
          value={values.message}
          onChange={update("message")}
          aria-invalid={!!errors.message}
          className={cls(!!errors.message)}
          placeholder="How can we help?"
        />
        {errors.message && <p className="mt-1 text-xs text-maroon-700" role="alert">{errors.message}</p>}
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Send Message
      </Button>
    </form>
  );
}

function cls(hasError: boolean) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-sm text-charcoal-900 outline-none transition placeholder:text-charcoal-400 focus:ring-2 ${
    hasError
      ? "border-maroon-400 focus:ring-maroon-200"
      : "border-charcoal-200 focus:border-maroon-400 focus:ring-maroon-200"
  }`;
}
