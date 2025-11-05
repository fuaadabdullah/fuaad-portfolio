import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
export default function HomePage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
          Building disciplined tools for traders and students.
      </h1>
      <p className="mt-4 text-lg text-white/80 max-w-2xl">
          Finance at GSU; building RIZZK, a risk calculator for day traders; shipping focused, numbers-first web apps.
      </p>
      <div className="mt-8 flex gap-3 flex-wrap">
        <Link href="/portfolio" className="inline-flex items-center gap-2 rounded-2xl bg-[#16a34a] px-5 py-3 font-medium text-black hover:bg-[#16a34a]/90 transition-colors">
          See portfolio <ArrowRight size={18} aria-hidden="true" />
        </Link>
          <Link href="/Fuaad_Abdullah_Resume.pdf" className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 hover:bg-white/15 transition-colors">
            Résumé PDF <Download size={18} aria-hidden="true" />
          </Link>
        <Link href="/services" className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 hover:bg-white/15 transition-colors">
          Services <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-16 grid md:grid-cols-2 gap-6">
        <article className="rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold">RIZZK Calculator</h2>
          <p className="text-white/80 mt-2">Production-grade risk management web app for day traders.</p>
          <div className="mt-4 flex gap-3">
            <a className="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/15 transition-colors" href="https://rizzk-calculator-demo-eus2-f1.azurewebsites.net" target="_blank" rel="noopener noreferrer">
              Live demo
            </a>
            <a className="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/15 transition-colors" href="https://github.com/fuaadabdullah/rr-calculator" target="_blank" rel="noopener noreferrer">
              Source
            </a>
          </div>
        </article>
        <article className="rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold">Consulting</h2>
          <p className="text-white/80 mt-2">Frontend polish, Streamlit/Next.js builds, and DevOps basics for student projects and early MVPs.</p>
          <a className="mt-4 inline-block rounded-lg bg-[#16a34a] px-4 py-2 text-black hover:bg-[#16a34a]/90 transition-colors" href="/services">
            View services
          </a>
        </article>
      </div>
    </section>
  );
}
