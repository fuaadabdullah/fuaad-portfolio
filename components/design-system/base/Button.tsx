import React from "react";
import { clsx } from "@/lib/utils";
import { colors, spacing, fontSizes, radii } from "../tokens";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseClasses = `inline-flex items-center gap-2 rounded-2xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed`;

const variantClasses: Record<ButtonVariant, string> = {
  primary: `bg-[${colors.primary}] text-[${colors.secondary}] hover:bg-[${colors.primary}]/90`,
  secondary: `bg-[${colors.secondary}]/10 text-[${colors.secondary}] hover:bg-[${colors.secondary}]/15`,
  ghost: `bg-transparent text-[${colors.secondary}] hover:bg-[${colors.secondary}]/10 border border-[${colors.border}]`,
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