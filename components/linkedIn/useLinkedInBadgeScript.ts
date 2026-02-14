"use client";

import { useEffect } from "react";

export function useLinkedInBadgeScript() {
  useEffect(() => {
    const src = "https://platform.linkedin.com/badges/js/profile.js";

    // Avoid injecting duplicates if the user navigates back/forward in-app.
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`
    );
    if (existing) {
      window.IN?.parse?.();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.IN?.parse?.();
    };

    document.body.appendChild(script);
  }, []);
}

