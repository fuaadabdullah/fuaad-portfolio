import ServiceCard from "@/components/ServiceCard";
import { servicesJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "Let's Work — Fuaad Abdullah",
  description: "Founder-friendly packages for traders, students, and small teams: UX/UI polish, portfolio sites, trading tools, and MVP bootstrap. Clear scope. Clear price. Clear handoff.",
  openGraph: {
    title: "Let's Work — Fuaad Abdullah",
    description: "Focused packages for traders, students, and small teams. UX polish, portfolio sites, trading calculators, and full-stack MVP development.",
    images: ["/og-default.png"]
  }
};

const services = [
  { slug: "ux-polish", title: "UX/UI Polish Sprint", price: "$300", description: "One-week design pass on your existing app: spacing, colors, typography, and basic accessibility. Before/after screenshots + a simple checklist." },
  { slug: "portfolio-sites", title: "Portfolio & Personal Brand Sites", price: "$400+", description: "Clean, fast portfolio sites for students, traders, and early-career devs. Custom layout, mobile-first, contact form wired, and basic SEO setup." },
  { slug: "trading-tools", title: "Risk & Trading Tools", price: "$199+", description: "Calculators, trade journals, or mini dashboards similar to RIZZK: numbers-first tools that enforce discipline instead of vibes." },
  { slug: "mvp-bootstrap", title: "MVP Bootstrap (Next.js + FastAPI)", price: "$1,500+", description: "Two-week sprint: auth, CRUD, basic charts, deployment, and a handover call so you're not lost once I'm gone." }
];

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <JsonLd data={servicesJsonLd(services)} />
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Let's Work</h1>
      <p className="text-white/80 mt-3">Focused, founder-friendly packages for traders, students, and small teams. Clear scope. Clear price. Clear handoff.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {services.map(s => <ServiceCard key={s.slug} service={s} />)}
      </div>

      {/* Contact Section */}
      <section className="mt-16 border-t border-white/10 pt-16" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="text-2xl md:text-4xl font-semibold tracking-tight">Get in Touch</h2>
        <p className="text-white/80 mt-2 mb-6">
          Interested in working together? Drop me a message and I'll get back to you soon.
        </p>
        <form
          action="https://formspree.io/f/xzzjjqoj"
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
              className="w-full rounded-lg bg-white/10 border border-white/20 p-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:border-transparent"
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
              className="w-full rounded-lg bg-white/10 border border-white/20 p-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:border-transparent resize-none"
              placeholder="What do you need help with?"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-[#16a34a] text-black px-6 py-3 font-medium hover:bg-[#16a34a]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:ring-offset-2 focus:ring-offset-[#0b0f13]"
          >
            Send Message
          </button>
        </form>
      </section>
    </section>
  );
}
