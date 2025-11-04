import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
export default function HomePage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
        Building disciplined tools for traders and students
      </h1>
      <p className="mt-4 text-lg text-white/80 max-w-2xl">
        I’m Fuaad Abdullah — finance major, day-trader in training, and builder of clean, numbers-first tools.
      </p>
      <div className="mt-8 flex gap-3 flex-wrap">
        <Link href="/portfolio" className="inline-flex items-center gap-2 rounded-2xl bg-accent px-5 py-3 font-medium text-black">
          See portfolio <ArrowRight size={18} />
        </Link>
        <Link href="/resume" className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3">
          Resume <Download size={18} />
        </Link>
        <Link href="/services" className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3">
          Services <ArrowRight size={18} />
        </Link>
      </div>
      <div className="mt-16 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold">RIZZK Calculator</h3>
          <p className="text-white/80 mt-2">Production-grade risk management web app for day traders.</p>
          <div className="mt-4 flex gap-3">
            <a className="rounded-lg bg-white/10 px-4 py-2" href="https://rizzkcalcdemo.azurewebsites.net" target="_blank" rel="noreferrer">Live demo</a>
            <a className="rounded-lg bg-white/10 px-4 py-2" href="https://github.com/fuaadabdullah/rr-calculator" target="_blank" rel="noreferrer">Source</a>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold">Consulting</h3>
          <p className="text-white/80 mt-2">Frontend polish, Streamlit/Next.js builds, and DevOps basics for student projects and early MVPs.</p>
          <a className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-black" href="/services">View services</a>
        </div>
      </div>
    </section>
  );
}
