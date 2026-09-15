"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: server-rendered content remains visible without JavaScript. */
export default function ScrollReveals() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".section-space, .project-entry, .case-study > section, .document-page > section",
      ),
    );

    function reset() {
      observer?.disconnect();
      targets.forEach((element) =>
        element.classList.remove("reveal-ready", "is-revealed"),
      );
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

      targets.forEach((element) => {
        if (element.getBoundingClientRect().top < window.innerHeight) return;
        element.classList.add("reveal-ready");
        observer?.observe(element);
      });
    }

    observe();
    preference.addEventListener("change", observe);
    return () => {
      reset();
      preference.removeEventListener("change", observe);
    };
  }, [pathname]);

  return null;
}
