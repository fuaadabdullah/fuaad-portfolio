import React from "react";
import { clsx } from "@/lib/utils";
import { fontSizes, fontWeights, colors } from "../tokens";

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
  xs: `text-[${fontSizes.xs}]`,
  sm: `text-[${fontSizes.sm}]`,
  md: `text-[${fontSizes.md}]`,
  lg: `text-[${fontSizes.lg}]`,
  xl: `text-[${fontSizes.xl}]`,
};

const weightClasses: Record<keyof typeof fontWeights, string> = {
  normal: `font-normal`,
  medium: `font-medium`,
  semibold: `font-semibold`,
  bold: `font-bold`,
};

const variantClasses: Record<TextVariant, string> = {
  body: `text-[${colors.secondary}]`,
  muted: `text-[${colors.muted}]`,
  accent: `text-[${colors.primary}]`,
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