"use client";

import Script from "next/script";

/**
 * Credly digital badge embed.
 *
 * Renders the container div consumed by Credly's embed script. The
 * data-* attributes must match the share badge issued by Credly so the
 * script can hydrate the iframe in place.
 */
export default function CredlyBadge() {
  return (
    <>
      <div
        data-testid="credly-badge"
        data-iframe-width="150"
        data-iframe-height="270"
        data-share-badge-id="b30f9c34-c3ef-4bf8-b168-2d979ef42a83"
        data-share-badge-host="https://www.credly.com"
      />
      <Script
        src="https://cdn.credly.com/assets/utilities/embed.js"
        strategy="lazyOnload"
      />
    </>
  );
}
