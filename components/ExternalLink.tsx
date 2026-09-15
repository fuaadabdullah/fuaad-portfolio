import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ExternalLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> {
  href: string;
  children: ReactNode;
  /**
   * Optional short label describing the destination. When provided it is used
   * as the base of the accessible name (e.g. "GitHub (opens in a new tab)").
   * When omitted, the link text content is used instead.
   */
  accessibleName?: string;
}

/**
 * External anchor that opens in a new tab with safe `rel` attributes and an
 * accessible name that announces "(opens in a new tab)" to assistive tech.
 */
export default function ExternalLink({
  href,
  children,
  accessibleName,
  className,
  ...rest
}: ExternalLinkProps) {
  const baseName = accessibleName ?? null;
  const ariaLabel = baseName ? `${baseName} (opens in a new tab)` : undefined;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
      {ariaLabel ? null : (
        <span className="sr-only">
          {"\u00a0"}(opens in a new tab)
        </span>
      )}
    </a>
  );
}
