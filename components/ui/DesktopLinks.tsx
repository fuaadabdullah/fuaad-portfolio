import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import type { NavLink } from "@/types/navigation";
import { isActivePath } from "@/lib/navigation";

interface DesktopLinksProps {
  pathname: string;
  links: NavLink[];
  cta: NavLink;
}

export function DesktopLinks({ pathname, links, cta }: DesktopLinksProps) {
  return (
    <ul className="hidden lg:flex items-center gap-1 text-sm">
      {links.map((l) => {
        const active = isActivePath(pathname, l.href);
        return (
          <li key={l.href}>
            <Link
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={clsx(
                "relative rounded-full px-4 py-2 transition-all duration-200 ease-out",
                "text-white/70 hover:text-white hover:bg-white/5",
                active && "text-white bg-white/10"
              )}
            >
              {l.label}
              {active && (
                <span className="absolute inset-x-4 -bottom-0.5 h-0.5 bg-[color:var(--color-accent)] rounded-full" />
              )}
            </Link>
          </li>
        );
      })}
      <li className="ml-2">
        <Link
          href={cta.href}
          className={clsx(
            "inline-flex items-center gap-2 rounded-full px-5 py-2 font-medium",
            "bg-[color:var(--color-accent)] text-black",
            "hover:bg-[color:var(--color-accent-warm)]",
            "transition-all duration-200 ease-out",
            "hover:scale-105 hover:shadow-lg hover:shadow-[color:var(--color-accent)]/20",
            "active:scale-95"
          )}
        >
          {cta.label}
          <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </li>
    </ul>
  );
}
