import React from "react";
import { clsx } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseClasses = `inline-flex items-center gap-2 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed`;

const variantClasses: Record<ButtonVariant, string> = {
  primary: `bg-[var(--color-accent)] text-[var(--color-ink)] hover:bg-[var(--color-accent)]/90`,
  secondary: `bg-[var(--color-sand)]/10 text-[var(--color-sand)] hover:bg-[var(--color-sand)]/15`,
  ghost: `bg-transparent text-[var(--color-sand)] hover:bg-[var(--color-sand)]/10 border border-[var(--color-border)]`,
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: `px-3 py-1.5 text-sm rounded-lg`,
  md: `px-5 py-3`,
  lg: `px-6 py-3 text-lg`,
};

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = "secondary",
  size = "md",
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};