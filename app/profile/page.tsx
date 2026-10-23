import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, GraduationCap, Layers3 } from "lucide-react";
import { professionalEmail, professionalEmailHref } from "@/data/contact";

export const metadata: Metadata = {
  title: "Professional Profile | Fuaad Abdullah",
  description:
    "Fuaad Abdullah is a software builder and Georgia State University undergraduate student. Explore his work, client services, résumé, and academic interests.",
  alternates: { canonical: "/profile" },
  openGraph: {
    title: "Fuaad Abdullah | Professional Profile",
    description:
      "One introduction for customers, employers, and academic contacts, with selected software projects and clear next steps.",
    images: ["/og-default.png"],
  },
};

const audiences = [
  { id: "customers", label: "Customers", detail: "Websites, software, and practical automation" },
  { id: "employers", label: "Employers", detail: "Engineering skills, case studies, and résumé" },
  { id: "schools", label: "Schools", detail: "Current studies, technical work, and academic interests" },
] as const;

export default function ProfilePage() {
  return (
    <div className="page-shell space-y-20">
      <section className="grid items-center gap-9 lg:grid-cols-[minmax(0,1fr)_300px]" aria-labelledby="professional-name">
        <div className="space-y-6">
          <p className="eyebrow">Professional & academic profile</p>
          <div className="space-y-4">
            <h1 id="professional-name" className="hero-title">Fuaad Abdullah</h1>
            <p className="max-w-[52ch] text-2xl font-medium leading-snug text-[var(--color-sand)] md:text-3xl">
              Software builder. Problem solver. Georgia State University undergraduate.
            </p>
          </div>
          <p className="max-w-[66ch] text-lg leading-relaxed text-[var(--color-muted)]">
            I develop web applications, AI-powered tools, and financial decision systems. My work connects
            real-world workflows with clear software interfaces, measurable outcomes, and practical engineering.
            I am based in the Atlanta area and currently studying at Georgia State University.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/portfolio" className="button button-primary">
              Explore engineering projects <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/contact" className="button button-secondary">
              Contact me <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[300px] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-coal)]">
          <Image
            src="/fuaad-headshot.png"
            alt="Professional portrait of Fuaad Abdullah"
            width={600}
            height={600}
            priority
            className="aspect-square w-full object-cover"
          />
          <p className="border-t border-[var(--color-border)] px-5 py-4 text-sm text-[var(--color-muted)]">
            Atlanta area · Software & quantitative problem-solving
          </p>
        </div>
      </section>

      <nav aria-label="Choose your professional profile path" className="grid gap-3 md:grid-cols-3">
        {audiences.map((audience, index) => (
          <a
            key={audience.id}
            href={`#${audience.id}`}
            aria-label={`${audience.label}, go to section`}
            className="group surface flex items-start justify-between gap-4 p-5 transition-colors hover:border-[var(--color-accent)]"
          >
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
                0{index + 1} / {audience.label}
              </p>
              <p className="text-base leading-snug text-[var(--color-sand)]">{audience.detail}</p>
            </div>
            <ArrowRight size={19} className="mt-1 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
          </a>
        ))}
      </nav>

      <section id="customers" className="scroll-mt-28 border-t border-[var(--color-border)] pt-9" aria-labelledby="customer-heading">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <div className="space-y-4">
            <Layers3 size={30} className="text-[var(--color-accent)]" aria-hidden="true" />
            <p className="eyebrow">01 / Client work</p>
            <h2 id="customer-heading" className="section-title">For customers</h2>
          </div>
          <div className="space-y-5">
            <p className="intro-text">I build useful digital experiences that help organizations get work done.</p>
            <p className="max-w-[70ch] leading-relaxed text-[var(--color-muted)]">
              My project work includes responsive websites, dashboards, software prototypes, and automation.
              I focus on defining the problem, building a maintainable solution, and making the result easy to use.
              You can review client-facing work and discuss a scoped project through the site.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/services" className="button button-secondary">See client services</Link>
              <Link href="/contact" className="button button-primary">Discuss a project <ArrowRight size={17} aria-hidden="true" /></Link>
            </div>
            <p className="text-sm text-[var(--color-muted)]">
              Example: <Link className="text-link" href="/portfolio/elbey-projects">Customer website case study</Link>
            </p>
          </div>
        </div>
      </section>

      <section id="employers" className="scroll-mt-28 border-t border-[var(--color-border)] pt-9" aria-labelledby="employer-heading">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <div className="space-y-4">
            <BriefcaseBusiness size={30} className="text-[var(--color-accent)]" aria-hidden="true" />
            <p className="eyebrow">02 / Career</p>
            <h2 id="employer-heading" className="section-title">For employers</h2>
          </div>
          <div className="space-y-5">
            <p className="intro-text">I bring hands-on development experience and a quantitative approach to technical work.</p>
            <p className="max-w-[70ch] leading-relaxed text-[var(--color-muted)]">
              I work with TypeScript, React, Next.js, Python, APIs, SQL, Docker, and deployment tools.
              My portfolio documents product decisions and engineering tradeoffs. I am interested in
              software engineering roles, internships, and teams building reliable user-facing systems.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/resume" className="button button-primary">Read my résumé <ArrowRight size={17} aria-hidden="true" /></Link>
              <Link href="/portfolio" className="button button-secondary">Explore project case studies</Link>
            </div>
            <p className="text-sm text-[var(--color-muted)]">
              Technical example: <Link className="text-link" href="/portfolio/goblin-assistant">AI orchestration case study</Link>
            </p>
          </div>
        </div>
      </section>

      <section id="schools" className="scroll-mt-28 border-t border-[var(--color-border)] pt-9" aria-labelledby="school-heading">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <div className="space-y-4">
            <GraduationCap size={30} className="text-[var(--color-accent)]" aria-hidden="true" />
            <p className="eyebrow">03 / Education</p>
            <h2 id="school-heading" className="section-title">For schools</h2>
          </div>
          <div className="space-y-5">
            <p className="intro-text">I am an undergraduate student at Georgia State University, exploring how quantitative ideas translate into practical systems.</p>
            <p className="max-w-[70ch] leading-relaxed text-[var(--color-muted)]">
              My academic interests include statistics, economics, data analysis, and decision-making.
              I apply these interests in independent software projects and welcome conversations about
              academic opportunities, collaboration, and relevant programs. My degree remains in progress.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/cv" className="button button-primary">Review academic profile <ArrowRight size={17} aria-hidden="true" /></Link>
              <Link href="/contact" className="button button-secondary">Contact for academic opportunities</Link>
            </div>
            <p className="text-sm text-[var(--color-muted)]">
              Applied project: <Link className="text-link" href="/portfolio/gradem8">GradeM8</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="surface flex flex-col gap-6 p-7 md:flex-row md:items-center md:justify-between md:p-10" aria-labelledby="next-step-heading">
        <div className="space-y-2">
          <p className="eyebrow">One point of contact</p>
          <h2 id="next-step-heading" className="text-2xl font-semibold">Have a project, role, or academic opportunity in mind?</h2>
          <p className="text-[var(--color-muted)]">Reach me through the contact page or the dedicated AyahOS professional inbox.</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link href="/contact" className="button button-primary">Get in touch <ArrowUpRight size={17} aria-hidden="true" /></Link>
          <a href={professionalEmailHref} aria-label="Email AyahOS professional account" className="button button-secondary">{professionalEmail}</a>
        </div>
      </section>
    </div>
  );
}
