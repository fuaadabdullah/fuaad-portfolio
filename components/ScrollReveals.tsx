"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Adds motion only after route content is rendered and measurable. */
export default function ScrollReveals() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = new Set<HTMLElement>();
    let frame = 0;
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -40px 0px" });

    function reset() {
      observer.disconnect();
      targets.forEach((element) => element.classList.remove("reveal-ready", "is-revealed"));
      targets.clear();
    }
    function scan() {
      if (preference.matches) return;
      document.querySelectorAll<HTMLElement>(".section-space, .project-entry, .case-study > section, .document-page > section").forEach((element) => {
        if (targets.has(element) || !element.getClientRects().length) return;
        targets.add(element);
        if (element.getBoundingClientRect().top < window.innerHeight) return;
        element.classList.add("reveal-ready");
        observer.observe(element);
      });
    }
    function schedule() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    }
    function changePreference() { reset(); schedule(); }
    // Streaming can move content out of hidden containers after layout hydration.
    const mutations = new MutationObserver(schedule);
    mutations.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden", "style"] });
    schedule();
    preference.addEventListener("change", changePreference);
    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      preference.removeEventListener("change", changePreference);
      reset();
    };
  }, [pathname]);
  return null;
}
