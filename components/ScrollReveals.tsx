"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const TARGET_SELECTOR =
  ".section-space, .project-entry, .case-study > section, .document-page > section";

/** Progressive enhancement: server-rendered content remains visible without JavaScript. */
export default function ScrollReveals() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tracked = new Set<HTMLElement>();
    let observer: IntersectionObserver | undefined;
    let frame = 0;

    function reset() {
      observer?.disconnect();
      observer = undefined;
      tracked.forEach((element) =>
        element.classList.remove("reveal-ready", "is-revealed"),
      );
      tracked.clear();
    }

    // Streaming moves content into place after hydration, so rescan on mutation
    // instead of querying once on mount and missing whatever arrives later.
    function scan() {
      if (!observer) return;
      document
        .querySelectorAll<HTMLElement>(TARGET_SELECTOR)
        .forEach((element) => {
          if (tracked.has(element) || !element.getClientRects().length) return;
          tracked.add(element);
          if (element.getBoundingClientRect().top < window.innerHeight) return;
          element.classList.add("reveal-ready");
          observer?.observe(element);
        });
    }

    function schedule() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    }

    function observe() {
      reset();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-revealed");
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0, rootMargin: "0px 0px -40px 0px" },
      );
      scan();
    }

    observe();
    // `class` is deliberately outside attributeFilter: scan() adds reveal-ready,
    // which would otherwise retrigger this observer in a loop.
    const mutations = new MutationObserver(schedule);
    mutations.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["hidden", "style"],
    });
    preference.addEventListener("change", observe);
    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      preference.removeEventListener("change", observe);
      reset();
    };
  }, [pathname]);

  return null;
}
