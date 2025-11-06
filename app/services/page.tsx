import { servicesJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "Let's Work - Fuaad Abdullah",
  description: "Custom web development for students, creatives, and small teams: UX/UI polish ($450), launch-ready sites ($950), and full-stack MVPs ($2,400+). Clear scope. Clear price. Clear handoff.",
  openGraph: {
    title: "Let's Work - Fuaad Abdullah",
    description: "Custom web development: UX polish, launch-ready sites, and full-stack MVPs. Built with Next.js, deployed properly, handed off clearly.",
    images: ["/og-default.png"]
  }
};

const services = [
  { slug: "ux-polish", title: "UX/UI Polish Sprint", price: "$450" },
  { slug: "portfolio-sites", title: "Website Launch Package", price: "$950" },
  { slug: "trading-tools", title: "Mini Tools", price: "$199+" },
  { slug: "mvp-bootstrap", title: "MVP Bootstrap", price: "$2,400+" }
];

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <JsonLd data={servicesJsonLd(services)} />
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Let's Work</h1>
      <p className="text-white/80 mt-3 mb-12">Custom web development for students, creatives, and small teams. Clear scope. Clear price. Clear handoff.</p>

      {/* Service 1: UX/UI Polish Sprint */}
      <article className="mb-16 pb-16 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">UX/UI Polish Sprint</h2>
          <span className="text-[color:var(--color-accent)] text-xl font-semibold mt-2 md:mt-0">$450</span>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white/90 mb-2">What you get</h3>
            <ul className="text-white/70 space-y-1 list-disc list-inside">
              <li>One-week design pass on your existing app</li>
              <li>Spacing, colors, typography, and basic accessibility improvements</li>
              <li>Before/after screenshots</li>
              <li>Simple checklist of changes made</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white/90 mb-2">Why it matters</h3>
            <p className="text-white/70">Your app works, but it doesn't look polished. This sprint fixes the visual rough edges so it feels professional instead of "I built this in a weekend." Clean UI = more trust from users.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white/90 mb-2">How it works</h3>
            <ol className="text-white/70 space-y-1 list-decimal list-inside">
              <li>You send me the link + areas you want improved</li>
              <li>I audit and document the issues</li>
              <li>Polish pass: spacing, colors, typography, accessibility</li>
              <li>You get before/after screenshots + a checklist</li>
            </ol>
          </div>
        </div>
      </article>

      {/* Service 2: Website Launch Package */}
      <article className="mb-16 pb-16 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">Website Launch Package</h2>
          <span className="text-[color:var(--color-accent)] text-xl font-semibold mt-2 md:mt-0">$950</span>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white/90 mb-2">What you get</h3>
            <ul className="text-white/70 space-y-1 list-disc list-inside">
              <li>Custom design (no template clone) tailored to your niche</li>
              <li>1-3 core pages (home, about, contact/services) in Next.js + Tailwind</li>
              <li>Responsive layout for mobile, tablet, desktop</li>
              <li>Basic SEO: meta tags, OG images, sitemap, clean URLs</li>
              <li>Analytics wired (so you can see who's visiting)</li>
              <li>Deployed to Vercel with your own domain + DNS set up</li>
              <li>Loom walkthrough so you know how to use/update it</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white/90 mb-2">Why it matters</h3>
            <p className="text-white/70">Feels like a real brand, not a class project. Loads fast, doesn't look sketchy, doesn't scare off recruiters or clients. Gives you a clean link you can drop on LinkedIn, resumes, applications, or DMs. Built to be extended later if you want a blog, case studies, or dashboards.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white/90 mb-2">How it works</h3>
            <ol className="text-white/70 space-y-1 list-decimal list-inside">
              <li>30-45 min call: goals, examples you like, constraints</li>
              <li>Wireframe & color direction (you sign off)</li>
              <li>Build phase (you get a staging link to preview)</li>
              <li>Polish pass (accessibility, spacing, performance)</li>
              <li>Launch + Loom walkthrough + small fixes</li>
            </ol>
          </div>
        </div>
      </article>

      {/* Service 3: Mini Tools */}
      <article className="mb-16 pb-16 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">Mini Tools</h2>
          <span className="text-[color:var(--color-accent)] text-xl font-semibold mt-2 md:mt-0">$199+</span>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white/90 mb-2">What you get</h3>
            <ul className="text-white/70 space-y-1 list-disc list-inside">
              <li>Number's based tools such as calculators, trade journals, or mini dashboards</li>
              <li>Clean UI with real-time calculations or data updates</li>
              <li>Mobile-friendly and responsive</li>
              <li>Basic deployment (can be standalone or integrated into your site)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white/90 mb-2">Why it matters</h3>
            <p className="text-white/70">Numbers-first tools that enforce discipline instead of vibes. Perfect for traders, students, or small teams who need focused utilities without the bloat of a full app.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white/90 mb-2">How it works</h3>
            <ol className="text-white/70 space-y-1 list-decimal list-inside">
              <li>You describe the tool and what it needs to calculate/display</li>
              <li>I scope it out and confirm price based on complexity</li>
              <li>Build + test with sample data</li>
              <li>Deploy and hand off with basic documentation</li>
            </ol>
          </div>
        </div>
      </article>

      {/* Service 4: MVP Bootstrap */}
      <article className="mb-16 pb-16 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">MVP Bootstrap</h2>
          <span className="text-[color:var(--color-accent)] text-xl font-semibold mt-2 md:mt-0">$2,400+</span>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white/90 mb-2">What you get</h3>
            <ul className="text-white/70 space-y-1 list-disc list-inside">
              <li>Full-stack: auth, real database, API, charts</li>
              <li>Deployment to production environment</li>
              <li>Documentation so it doesn't break the second you try to use it with real people</li>
              <li>Handover call to walk through the codebase and deployment</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white/90 mb-2">Why it matters</h3>
            <p className="text-white/70">You need more than a landing page - you need auth, CRUD, a dashboard, and real data flow. This gets you a working foundation you can actually build on, not just pretty screens that don't do anything. You're not just paying for code. You're paying for less headache later.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white/90 mb-2">How it works</h3>
            <ol className="text-white/70 space-y-1 list-decimal list-inside">
              <li>Discovery call: what you're building, who it's for, what's the MVP scope</li>
              <li>Tech stack + architecture plan (you approve before I start)</li>
              <li>Two-week sprint: auth, CRUD, basic charts, deployment</li>
              <li>Code walkthrough + documentation</li>
              <li>Handoff call so you're not lost once I'm gone</li>
            </ol>
          </div>
        </div>
      </article>

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
      </section>
    </section>
  );
}
