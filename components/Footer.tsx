import Link from "next/link";
import SocialIcon from "./SocialIcon";
import { bookingCta, bookingLink } from "@/data/contact";

export default function Footer(){
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Fuaad Abdullah.
            <span className="block text-xs text-white/60 mt-1">Lighthouse mobile audit Aug 2026: SEO & best-practices 100/100 · perf 89/100 — built for speed & standards.</span>
          </p>
          <div className="flex flex-col items-center gap-4 md:items-end">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70 md:justify-end">
              <Link href="/portfolio" className="hover:text-white transition-colors">
                Portfolio
              </Link>
              <Link href="/resume" className="hover:text-white transition-colors">
                Résumé
              </Link>
              <Link href="/cv" className="hover:text-white transition-colors">
                CV
              </Link>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="/services" className="hover:text-white transition-colors">
                Services
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
              <a
                href={bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[color:var(--color-accent)] px-4 py-2 font-medium text-black transition-colors hover:bg-[color:var(--color-accent)]/90"
              >
                {bookingCta.shortLabel}
              </a>
            </div>
            <div className="flex gap-6">
              <SocialIcon type="linkedin" href="https://www.linkedin.com/in/fuaadabdullah" label="LinkedIn" />
              <SocialIcon type="instagram" href="https://instagram.com/fuaadabdullah" label="Instagram" />
              <SocialIcon type="github" href="https://github.com/fuaadabdullah" label="GitHub" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
