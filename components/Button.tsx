import React from "react";
import { clsx } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base = "inline-flex items-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed";
const variants: Record<Variant, string> = {
  primary: "bg-[color:var(--color-accent)] text-white hover:bg-[color:var(--color-accent)]/90 font-medium",
  secondary: "bg-white/10 text-white hover:bg-white/15",
  ghost: "bg-transparent text-white hover:bg-white/10 border border-white/10",
};
const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-3 rounded-2xl",
  lg: "px-6 py-3 text-lg rounded-2xl",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

/**
 * Generate button class names for use with Link or other elements
 */
export function buttonClasses(
  variant: Variant = "secondary",
  size: Size = "md",
  className?: string
): string {
  return clsx(base, variants[variant], sizes[size], className);
}

export default function Button({
  className,
  variant = "secondary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </button>
  );
}
