"use client";

import { FormEvent, useRef, useState } from "react";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    setSubmitSuccess(null);
    setSubmitError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => null)) as
          | { error?: string; details?: Record<string, string> }
          | null;

        if (response.status === 429) {
          throw new Error("Too many submissions. Please try again later.");
        }

        const fieldMessage = errorData?.details
          ? Object.values(errorData.details).join(" ")
          : null;

        throw new Error(
          fieldMessage ||
            errorData?.error ||
            `Form submission failed with status ${response.status}`
        );
      }

      formRef.current?.reset();
      setSubmitSuccess("Thanks, I'll be in touch!");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong while sending your message. Please try again in a moment."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="max-w-xl space-y-4"
      aria-label="Contact form"
    >
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/90">
          Name <span className="text-red-400" aria-label="required">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          aria-required="true"
          maxLength={100}
          className="w-full rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/90">
          Email <span className="text-red-400" aria-label="required">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          aria-required="true"
          className="w-full rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-white/90">
          Message <span className="text-red-400" aria-label="required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          aria-required="true"
          rows={5}
          className="w-full resize-none rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]"
          placeholder="What do you need help with?"
        />
      </div>

      <div className="space-y-3" aria-live="polite">
        {submitSuccess ? (
          <p className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {submitSuccess}
          </p>
        ) : null}

        {submitError ? (
          <p
            role="alert"
            className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          >
            {submitError}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-[color:var(--color-accent)] px-6 py-3 font-medium text-black transition-colors hover:bg-[color:var(--color-accent)]/90 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
