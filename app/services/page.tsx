import { servicesJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { services, servicesContact, type Service } from "@/data/services";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Let's Work - Fuaad Abdullah",
  description: "Custom web development for students, creatives, and small teams: UX/UI polish ($450), launch-ready sites ($950), and full-stack MVPs ($2,400+). Clear scope. Clear price. Clear handoff.",
  openGraph: {
    title: "Let's Work - Fuaad Abdullah",
    description: "Custom web development: UX polish, launch-ready sites, and full-stack MVPs. Built with Next.js, deployed properly, handed off clearly.",
    images: ["/og-default.png"]
  }
};

function ServiceBlock({
  service,
  showDivider,
}: {
  service: Service;
  showDivider: boolean;
}) {
  return (
    <article className={showDivider ? "mb-16 pb-16 border-b border-white/10" : "mb-16"}>
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold">{service.title}</h2>
        <span className="text-[color:var(--color-accent)] text-xl font-semibold mt-2 md:mt-0">
          {service.price}
        </span>
      </div>

      <div className="space-y-6">
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
      </div>
    </article>
  );
}

function ContactForm() {
  return (
    <form
      action={servicesContact.formAction}
      method="POST"
      className="max-w-xl space-y-4"
      aria-label="Contact form"
    >
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
          Email <span className="text-red-400" aria-label="required">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          aria-required="true"
          className="w-full rounded-lg bg-white/10 border border-white/20 p-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)] focus:border-transparent"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
          Message <span className="text-red-400" aria-label="required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          aria-required="true"
          rows={5}
          className="w-full rounded-lg bg-white/10 border border-white/20 p-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)] focus:border-transparent resize-none"
          placeholder="What do you need help with?"
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-[color:var(--color-accent)] text-black px-6 py-3 font-medium hover:bg-[color:var(--color-accent)]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--color-ink)]"
      >
        Send Message
      </button>
    </form>
  );
}

export default function ServicesPage() {
  return (
    <Container className="py-16">
      <JsonLd data={servicesJsonLd(services)} />
      <PageHeader
        title="Let's Work"
        description="Custom web development for students, creatives, and small teams. Clear scope. Clear price. Clear handoff."
      />

      <div className="mt-12">
        {services.map((svc, idx) => (
        <ServiceBlock
          key={svc.slug}
          service={svc}
          showDivider={idx < services.length - 1}
        />
        ))}
      </div>

      <section
        className="mt-16 border-t border-white/10 pt-16"
        aria-labelledby="contact-heading"
      >
        <h2
          id="contact-heading"
          className="text-2xl md:text-4xl font-semibold tracking-tight"
        >
          {servicesContact.heading}
        </h2>
        <p className="text-white/80 mt-2 mb-6">{servicesContact.intro}</p>
        <ContactForm />
      </section>
    </Container>
  );
}
