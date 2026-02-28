import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { NavLink } from "@/types/navigation";
import { type RefObject, useEffect, useRef } from "react";
import clsx from "clsx";
import { isActivePath } from "@/lib/navigation";

interface MobileMenuProps {
  open: boolean;
  menuId: string;
  menuTitleId: string;
  pathname: string;
  links: NavLink[];
  cta: NavLink;
  onClose: () => void;
  triggerRef?: RefObject<HTMLButtonElement | null>;
}

export function MobileMenu({
  open,
  menuId,
  menuTitleId,
  pathname,
  links,
  cta,
  onClose,
  triggerRef,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable && focusable.length > 0) {
      focusable[0].focus();
    } else {
      closeButtonRef.current?.focus();
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      const currentPanel = panelRef.current;
      if (!currentPanel) return;

      const elements = currentPanel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (elements.length === 0) {
        e.preventDefault();
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
        return;
      }

      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = prevOverflow;

      if (triggerRef?.current) {
        triggerRef.current.focus();
        return;
      }

      if (previousFocus && document.contains(previousFocus)) {
        previousFocus.focus();
      }
    };
  }, [open, onClose, triggerRef]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby={menuTitleId}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-none"
        aria-label="Close menu overlay"
      />

      <div
        id={menuId}
        ref={panelRef}
        className="absolute right-0 top-0 h-full w-[min(22rem,88vw)] bg-[color:var(--color-ink)] border-l border-white/10 animate-slide-in-right pointer-events-auto"
      >
        <div className="h-14 px-4 flex items-center justify-between border-b border-white/10">
          <h2 id={menuTitleId} className="text-sm font-medium text-white/80">
            Menu
          </h2>
          <button
            type="button"
            ref={closeButtonRef}
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full p-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="flex flex-col gap-2">
            {links.map((l, i) => {
              const active = isActivePath(pathname, l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    onClick={onClose}
                    style={{ animationDelay: `${i * 50}ms` }}
                    className={clsx(
                      "rounded-xl px-4 py-3 text-base font-medium transition-all duration-200",
                      "animate-fade-in-up opacity-0 block",
                      active
                        ? "bg-white/10 text-white"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="pt-4 animate-fade-in-up delay-200 opacity-0">
            <Link
              href={cta.href}
              onClick={onClose}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--color-accent)] px-4 py-3 font-semibold text-black hover:bg-[color:var(--color-accent-warm)] transition-all duration-200 hover:scale-[1.02]"
            >
              {cta.label}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
