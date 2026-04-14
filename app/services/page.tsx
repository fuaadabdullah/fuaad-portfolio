import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { servicesJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { services } from "@/data/services";
import projects from "@/data/projects";
import ContactForm from "@/components/ContactForm";
import { bookingCta, bookingLink, testimonials } from "@/data/contact";

export const metadata: Metadata = {
  title: "Let's Work - Fuaad Abdullah",
  description: "Custom web development for students, creatives, and small teams: UX/UI polish ($450), launch-ready sites ($950), and full-stack MVPs ($2,400+). Clear scope. Clear price. Clear handoff.",
  openGraph: {
    title: "Let's Work - Fuaad Abdullah",
    description: "Custom web development: UX polish, launch-ready sites, and full-stack MVPs. Built with Next.js, deployed properly, handed off clearly.",
    images: ["/og-default.png"]
  }
};

export default function ServicesPage() {
  const elbeyProject = projects.find((project) => project.slug === "elbey-projects");
  const rizzkProject = projects.find((project) => project.slug === "rizzk-calculator");
  const testimonial = testimonials[0];

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <JsonLd data={servicesJsonLd(services)} />
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Let's Work</h1>
      <p className="text-white/80 mt-3">Custom web development for students, creatives, and small teams. Clear scope. Clear price. Clear handoff.</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={bookingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-2xl bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-black transition-colors hover:bg-[color:var(--color-accent)]/90"
        >
          {bookingCta.shortLabel}
        </a>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-2xl bg-white/10 px-5 py-3 text-white transition-colors hover:bg-white/15"
        >
          Get a quote
        </Link>
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-2" aria-label="Delivery speed proof">
        {elbeyProject ? (
          <article className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5">
            <p className="text-xs uppercase tracking-[0.15em] text-emerald-100">Recent client launch</p>
            <h2 className="mt-2 text-xl font-semibold text-white">{elbeyProject.title}</h2>
            <p className="mt-2 text-3xl font-semibold text-white">{elbeyProject.timeline}</p>
            <p className="mt-2 text-sm text-white/75">Built and shipped a multi-page lead-gen site with booking paths and handoff-ready deployment.</p>
          </article>
        ) : null}

        {rizzkProject ? (
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.15em] text-white/55">Production build</p>
            <h2 className="mt-2 text-xl font-semibold text-white">{rizzkProject.title}</h2>
            <p className="mt-2 text-3xl font-semibold text-white">{rizzkProject.timeline}</p>
            <p className="mt-2 text-sm text-white/75">A focused calculator shipped from build to production with responsive UI and deployment included.</p>
          </article>
        ) : null}
      </section>

      {testimonial ? (
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6" aria-labelledby="testimonial-heading">
          <p id="testimonial-heading" className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-accent)]">
            Client feedback
          </p>
          <blockquote className="mt-3 text-xl font-medium text-white">
            "{testimonial.quote}"
          </blockquote>
          <p className="mt-3 text-sm text-white/65">
            {testimonial.client} · {testimonial.context}
          </p>
        </section>
      ) : null}

      {services.map((service) => (
        <article key={service.slug} className="mb-16 pb-16 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">{service.title}</h2>
              {service.turnaround ? (
                <p className="mt-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80">
                  {service.turnaround}
                </p>
              ) : null}
            </div>
            <span className="text-[color:var(--color-accent)] text-xl font-semibold mt-2 md:mt-0">{service.price}</span>
          </div>

          <div className="space-y-6">
            <p className="text-white/75">{service.summary}</p>

            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-2">What you get</h3>
              <ul className="text-white/70 space-y-1 list-disc list-inside">
                {service.whatYouGet.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-2">Why it matters</h3>
              <p className="text-white/70">{service.whyItMatters}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-2">How it works</h3>
              <ol className="text-white/70 space-y-1 list-decimal list-inside">
                {service.howItWorks.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            {service.caseStudy && (
              <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-accent)]">
                      Shipped example
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {service.caseStudy.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-white/70">
                      {service.caseStudy.summary}
                    </p>
                    {elbeyProject ? (
                      <div className="mt-4 flex flex-wrap gap-2 text-sm text-white/85">
                        <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1">
                          Built in {elbeyProject.timeline}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                          7 customer-facing pages shipped
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={service.caseStudy.href}
                      className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/15"
                    >
                      View case study
                    </Link>
                    {service.caseStudy.liveHref && (
                      <a
                        href={service.caseStudy.liveHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-[color:var(--color-accent)] px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-[color:var(--color-accent)]/90"
                      >
                        View live site
                      </a>
                    )}
                  </div>
                </div>

                {testimonial ? (
                  <blockquote className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4 text-white/85">
                    "{testimonial.quote}"
                    <span className="mt-2 block text-sm text-white/55">{testimonial.client}</span>
                  </blockquote>
                ) : null}

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {service.caseStudy.images.map((image) => (
                    <figure
                      key={image.src}
                      className="overflow-hidden rounded-xl border border-white/10 bg-black/20"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        className="aspect-[4/3] h-full w-full object-cover"
                      />
                    </figure>
                  ))}
                </div>
              </section>
            )}
          </div>
        </article>
      ))}

      {/* Contact Section */}
      <section className="mt-16 border-t border-white/10 pt-16" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="text-2xl md:text-4xl font-semibold tracking-tight">Get in Touch</h2>
        <p className="text-white/80 mt-2 mb-6">
          Interested in working together? Book the call if you&apos;re ready to start, or send a quick question if you want to talk scope first.
        </p>
        <div className="mb-6 flex flex-wrap gap-3">
          <a
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-2xl bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-black transition-colors hover:bg-[color:var(--color-accent)]/90"
          >
            {bookingCta.shortLabel}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-2xl bg-white/10 px-5 py-3 text-white transition-colors hover:bg-white/15"
          >
            Open contact page
          </Link>
        </div>
        <ContactForm />
      </section>
    </section>
  );
}
