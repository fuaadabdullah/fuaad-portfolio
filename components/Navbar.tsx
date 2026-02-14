"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import clsx from "clsx";
import Container from "@/components/layout/Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "Lore" },
  { href: "/resume", label: "Resume" },
] as const;

const cta = { href: "/services", label: "Let's Work" } as const;

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function DesktopLinks({ pathname }: { pathname: string }) {
  return (
    <ul className="hidden md:flex items-center gap-1 text-sm">
      {links.map((l) => {
        const active = isActivePath(pathname, l.href);
        return (
          <li key={l.href}>
            <Link
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={clsx(
                "rounded-full px-3 py-1.5 transition-colors",
                active
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              )}
            >
              {l.label}
            </Link>
          </li>
        );
      })}
      <li className="ml-2">
        <Link
          href={cta.href}
          className={clsx(
            "inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-medium transition-colors",
            "bg-[color:var(--color-accent)] text-black hover:bg-[color:var(--color-accent)]/90"
          )}
        >
          {cta.label}
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </li>
    </ul>
  );
}

function MobileMenu({
  open,
  menuId,
  pathname,
  onClose,
}: {
  open: boolean;
  menuId: string;
  pathname: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label="Close menu overlay"
      />

      <div
        id={menuId}
        className="absolute right-0 top-0 h-full w-[min(22rem,88vw)] bg-[color:var(--color-ink)] border-l border-white/10"
      >
        <div className="h-14 px-4 flex items-center justify-between border-b border-white/10">
          <span className="text-sm font-medium text-white/80">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full p-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-2">
          {links.map((l) => {
            const active = isActivePath(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                onClick={onClose}
                className={clsx(
                  "rounded-xl px-4 py-3 text-base font-medium transition-colors",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                )}
              >
                {l.label}
              </Link>
            );
          })}

          <div className="pt-2">
            <Link
              href={cta.href}
              onClick={onClose}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--color-accent)] px-4 py-3 font-semibold text-black hover:bg-[color:var(--color-accent)]/90 transition-colors"
            >
              {cta.label}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[color:var(--color-ink)]/70 border-b border-white/10">
      <nav aria-label="Main navigation">
        <Container className="h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-semibold tracking-tight hover:text-white"
            aria-label="Fuaad Abdullah - Home"
          >
            Hey I'm Fuaad
          </Link>

          <DesktopLinks pathname={pathname} />

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls={menuId}
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </Container>
      </nav>

      <MobileMenu
        open={open}
        menuId={menuId}
        pathname={pathname}
        onClose={() => setOpen(false)}
      />
    </header>
  );
}
