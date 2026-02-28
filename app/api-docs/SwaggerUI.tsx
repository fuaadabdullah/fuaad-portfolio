"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    SwaggerUIBundle?: {
      presets?: { apis?: unknown };
      (options: Record<string, unknown>): void;
    };
  }
}

export default function SwaggerUI() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui-bundle.js";
    script.async = true;

    script.onload = () => {
      const SwaggerUIBundle = window.SwaggerUIBundle;
      if (!SwaggerUIBundle) return;

      SwaggerUIBundle({
        url: "/openapi.yaml",
        dom_id: "#swagger-ui",
        presets: SwaggerUIBundle.presets?.apis
          ? [SwaggerUIBundle.presets.apis]
          : undefined,
        layout: "BaseLayout",
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="swagger-ui" />;
}
