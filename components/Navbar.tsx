"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import SocialIcon from "./SocialIcon";

const links = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/resume", label: "Résumé" },
  { href: "/contact", label: "Contact" },
] as const;

function SocialLinks() {
  return (
    <div className="flex items-center gap-5">
      <SocialIcon
        type="github"
        href="https://github.com/fuaadabdullah"
        label="GitHub"
      />
      <SocialIcon
        type="linkedin"
        href="https://www.linkedin.com/in/fuaadabdullah"
        label="LinkedIn"
      />
    </div>
  );
}

function MobileMenu({
  id,
  pathname,
  onClose,
}: {
  id: string;
  pathname: string;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLButtonElement>("button")?.focus();
    const background = Array.from(document.body.children).filter(
      (node): node is HTMLElement =>
        node instanceof HTMLElement &&
        !node.contains(panel) &&
        node.tagName !== "SCRIPT",
    );
    const previousInert = background.map((node) => node.inert);
    background.forEach((node) => {
      node.inert = true;
    });
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key !== "Tab") return;
      const focusable = panel?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    const wide = window.matchMedia("(min-width: 768px)");
    const onResize = () => {
      if (wide.matches) onClose();
    };
    wide.addEventListener("change", onResize);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      background.forEach((node, index) => {
        node.inert = previousInert[index];
      });
      document.removeEventListener("keydown", onKeyDown);
      wide.removeEventListener("change", onResize);
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[220] md:hidden">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="absolute right-0 top-0 flex h-dvh w-[min(24rem,90vw)] flex-col border-l border-[var(--color-border)] bg-[var(--color-ink)] p-6"
      >
        <div className="flex items-center justify-between">
          <span className="eyebrow">Explore</span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center"
            aria-label="Close menu"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <div className="mt-10 flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
              className="flex items-center justify-between border-b border-[var(--color-border)] py-5 font-display text-2xl hover:text-[var(--color-accent)]"
            >
              {link.label}
              <ArrowUpRight size={22} aria-hidden="true" />
            </Link>
          ))}
        </div>
        <div className="mt-auto pb-8">
          <p className="mb-5 text-sm text-[var(--color-muted)]">
            Find me elsewhere
          </p>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-ink)]/95 backdrop-blur-md">
        <nav
          aria-label="Main navigation"
          className="site-container flex h-20 items-center justify-between gap-6"
        >
          <Link
            href="/"
            className="flex items-center gap-3 font-display text-base font-semibold tracking-tight"
            aria-label="Fuaad Abdullah - Home"
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-border)] text-sm text-[var(--color-accent)]"
              aria-hidden="true"
            >
              fa.
            </span>
            Hey I&apos;m Fuaad
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={
                  pathname.startsWith(link.href) ? "page" : undefined
                }
                className={
                  link.href === "/resume"
                    ? "button button-secondary !min-h-10 !px-4 !py-2"
                    : `text-sm transition-colors hover:text-[var(--color-accent)] ${pathname.startsWith(link.href) ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]"}`
                }
              >
                {link.label}
              </Link>
            ))}
            <div className="border-l border-[var(--color-border)] pl-8">
              <SocialLinks />
            </div>
          </div>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls={menuId}
          >
            <Menu size={23} aria-hidden="true" />
          </button>
        </nav>
      </header>
      {open && <MobileMenu id={menuId} pathname={pathname} onClose={close} />}
    </>
  );
}
