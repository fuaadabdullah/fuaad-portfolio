import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="site-container pb-28 pt-12">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link href="/" className="font-display text-xl font-semibold">
              Fuaad Abdullah
              <span className="text-[var(--color-accent)]">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-[var(--color-muted)]">
              Software for markets, automation, and AI.
              <br />
              Built with intention in Atlanta.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-4">Explore</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {[
                ["/portfolio", "Portfolio"],
                ["/resume", "Résumé"],
                ["/about", "About"],
                ["/cv", "CV"],
                ["/blog", "Blog"],
                ["/services", "Services"],
                ["/contact", "Contact"],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-[var(--color-muted)] hover:text-[var(--color-accent)]"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow mb-4">Elsewhere</p>
            <div className="flex flex-col items-start gap-3 text-sm">
              {[
                ["https://github.com/fuaadabdullah", "GitHub"],
                ["https://www.linkedin.com/in/fuaadabdullah", "LinkedIn"],
                ["https://instagram.com/fuaadabdullah", "Instagram"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  {label}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-12 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-muted)]">
          © {new Date().getFullYear()} Fuaad Abdullah.
        </p>
      </div>
    </footer>
  );
}
