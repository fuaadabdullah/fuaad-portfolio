import React from "react";
import { clsx } from "@/lib/utils";
import { fontWeights } from "../tokens";

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl";
export type TextVariant = "body" | "muted" | "accent";

export interface TextProps {
  size?: TextSize;
  weight?: keyof typeof fontWeights;
  variant?: TextVariant;
  as?: "p" | "span" | "div";
  className?: string;
  children: React.ReactNode;
}

const sizeClasses: Record<TextSize, string> = {
  xs: `text-[0.75rem]`,
  sm: `text-[0.875rem]`,
  md: `text-[1rem]`,
  lg: `text-[1.125rem]`,
  xl: `text-[1.25rem]`,
};

const weightClasses: Record<keyof typeof fontWeights, string> = {
  normal: `font-normal`,
  medium: `font-medium`,
  semibold: `font-semibold`,
  bold: `font-bold`,
};

const variantClasses: Record<TextVariant, string> = {
  body: `text-[var(--color-sand)]`,
  muted: `text-[var(--color-muted)]`,
  accent: `text-[var(--color-accent)]`,
};

export const Text: React.FC<TextProps> = ({
  size = "md",
  weight = "normal",
  variant = "body",
  as = "p",
  className,
  children,
}) => {
  const Component = as;
  return (
    <Component
      className={clsx(
        sizeClasses[size],
        weightClasses[weight],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </Component>
  );
};