import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { existsSync } from 'fs';
import path from 'path';

export const metadata = {
  title: 'Case Studies - Fuaad Abdullah',
  description: 'Results-driven case studies in automation, web development, and tooling for traders and founders.',
};

export default function CaseStudiesPage() {
  const goblinosIconExists = existsSync(path.join(process.cwd(), 'apps', 'fuaad-portfolio', 'public', 'projects', 'goblinos-icon.png'));
  const goblinosIconSrc = goblinosIconExists ? '/projects/goblinos-icon.png' : '/projects/goblinos-plan.png';
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-white/50">Proven Results</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Case Studies</h1>
        <p className="text-white/80">A look at projects and measurable impact. Detailed case studies live on this page.</p>
      </header>

      <section className="mt-16 space-y-12">
        <article className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold">RIZZK — Position Sizing Calculator</h2>
            <p className="mt-2 text-white/90">Rapid, disciplined position sizing for traders; deployed as a public demo and designed for education only.</p>
            <p className="mt-3"><Link href="/about">Back to About</Link></p>
          </div>
          <div>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/10 bg-white/5">
              <Image src="/rizzk-desktop-screenshot.png" alt="RIZZK screenshot" fill className="object-cover" />
            </div>
          </div>
        </article>

        <article className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold">GoblinOS — Internal Tooling</h2>
            <p className="mt-2 text-white/90">GoblinOS is an internal automation and orchestration platform that unifies common developer and ops tasks. This case study highlights architecture and cost control features.</p>
            <p className="mt-3"><Link href="/services">Book a Build Session</Link></p>
          </div>
          <div>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/10 bg-white/5">
              <Image src={goblinosIconSrc} alt="GoblinOS visual" fill className="object-cover" />
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
