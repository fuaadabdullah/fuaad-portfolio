import React from "react";
import { clsx } from "@/lib/utils";
import { colors } from "../tokens";

export type BadgeVariant = "default" | "success" | "outline";

export interface BadgeProps {
  className?: string;
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const baseClasses = `inline-flex items-center rounded-full text-xs px-2 py-1`;

const variantClasses: Record<BadgeVariant, string> = {
  default: `bg-[${colors.secondary}]/10 text-[${colors.secondary}]`,
  success: `bg-[${colors.primary}]/20 text-[${colors.primary}]`,
  outline: `border border-[${colors.border}] text-[${colors.secondary}]`,
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