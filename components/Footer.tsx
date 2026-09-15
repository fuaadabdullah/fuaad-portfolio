import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ExternalLink from "./ExternalLink";

export default function Footer() {
  return (
    <footer
      className="border-t border-[var(--color-border)]"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
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
          <nav aria-label="Footer navigation">
            <h2 className="eyebrow mb-4">Explore</h2>
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
          </nav>
          <nav aria-label="Social links">
            <h2 className="eyebrow mb-4">Elsewhere</h2>
            <div className="flex flex-col items-start gap-3 text-sm">
              {[
                ["https://github.com/fuaadabdullah", "GitHub"],
                ["https://www.linkedin.com/in/fuaadabdullah", "LinkedIn"],
                ["https://instagram.com/fuaadabdullah", "Instagram"],
              ].map(([href, label]) => (
                <ExternalLink
                  key={href}
                  href={href}
                  accessibleName={label}
                  className="text-link"
                >
                  {label}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </ExternalLink>
              ))}
            </div>
          </nav>
        </div>
        <p className="mt-12 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-muted)]">
          © {new Date().getFullYear()} Fuaad Abdullah.
        </p>
      </div>
    </footer>
  );
}
