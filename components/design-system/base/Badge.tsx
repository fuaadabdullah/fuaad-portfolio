import React from "react";
import { clsx } from "@/lib/utils";

export type BadgeVariant = "default" | "success" | "outline";

export interface BadgeProps {
  className?: string;
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const baseClasses = `inline-flex items-center rounded-md text-xs px-2 py-1`;

const variantClasses: Record<BadgeVariant, string> = {
  default: `bg-[var(--color-sand)]/10 text-[var(--color-sand)]`,
  success: `bg-[var(--color-accent)]/20 text-[var(--color-accent)]`,
  outline: `border border-[var(--color-border)] text-[var(--color-sand)]`,
};

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  children,
}) => {
  return (
    <span className={clsx(baseClasses, variantClasses[variant], className)}>
      {children}
    </span>
  );
};