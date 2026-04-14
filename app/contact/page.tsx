import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { bookingCta, bookingLink, contactEmail, contactEmailHref, testimonials } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact - Fuaad Abdullah",
  description: "Ask a quick question, request a quote, or book a call to start your project.",
  openGraph: {
    title: "Contact - Fuaad Abdullah",
    description: "Ask a quick question, request a quote, or book a call to start your project.",
    images: ["/og-default.png"],
  },
};

export default function ContactPage() {
  const testimonial = testimonials[0];

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">Contact</p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Ask a quick question or book the call.
            </h1>
            <p className="max-w-2xl text-white/80">
              If you already know you want to build, book the call. If you need to ask about scope, price, or timing first, send a message here.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-2xl bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-black transition-colors hover:bg-[color:var(--color-accent)]/90"
            >
              {bookingCta.shortLabel}
            </a>
            <a
              href={contactEmailHref}
              className="inline-flex items-center rounded-2xl bg-white/10 px-5 py-3 text-white transition-colors hover:bg-white/15"
            >
              {contactEmail}
            </a>
          </div>

          {testimonial ? (
            <figure className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <blockquote className="text-lg font-medium text-white">
                "{testimonial.quote}"
              </blockquote>
              <figcaption className="mt-3 text-sm text-white/65">
                {testimonial.client} · {testimonial.context}
              </figcaption>
            </figure>
          ) : null}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-2xl font-semibold tracking-tight">Get in touch</h2>
          <p className="mt-2 text-white/75">
            Send the basics and I&apos;ll reply with next steps, scope feedback, or a quote.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
