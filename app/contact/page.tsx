import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import {
  bookingCta,
  bookingLink,
  contactEmail,
  contactEmailHref,
  testimonials,
} from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact - Fuaad Abdullah",
  description:
    "Get in touch about software engineering roles, internships, or a project.",
  openGraph: {
    title: "Contact - Fuaad Abdullah",
    description:
      "Get in touch about software engineering roles, internships, or a project.",
    images: ["/og-default.png"],
  },
};

export default function ContactPage() {
  const testimonial = testimonials[0];

  return (
    <section className="page-shell">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Contact
            </p>
            <h1 className="page-heading">
              Good work starts with a conversation.
            </h1>
            <p className="max-w-2xl text-white/80">
              Hiring for an engineering role or internship? I?d love to hear
              about your team. For a project inquiry, tell me what you?re
              building and where you need a hand.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
              aria-label={`${bookingCta.shortLabel} (opens in a new tab)`}
            >
              {bookingCta.shortLabel}
            </a>
            <a href={contactEmailHref} className="button button-secondary">
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

        <div className="surface contact-panel h-fit p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Get in touch
          </h2>
          <p className="mt-2 text-white/75">
            Share the role, team, or project you have in mind. I?ll reply with
            next steps.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
