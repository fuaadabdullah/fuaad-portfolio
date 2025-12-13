import React from "react";
import { clsx } from "@/lib/utils";
import { fontSizes, fontWeights, colors } from "../tokens";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

export interface HeadingProps {
  level?: HeadingLevel;
  size?: HeadingSize;
  weight?: keyof typeof fontWeights;
  className?: string;
  children: React.ReactNode;
}

const sizeClasses: Record<HeadingSize, string> = {
  xs: `text-[${fontSizes.xs}]`,
  sm: `text-[${fontSizes.sm}]`,
  md: `text-[${fontSizes.md}]`,
  lg: `text-[${fontSizes.lg}]`,
  xl: `text-[${fontSizes.xl}]`,
  '2xl': `text-[${fontSizes['2xl']}]`,
  '3xl': `text-[${fontSizes['3xl']}]`,
};

const weightClasses: Record<keyof typeof fontWeights, string> = {
  normal: `font-normal`,
  medium: `font-medium`,
  semibold: `font-semibold`,
  bold: `font-bold`,
};

export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  size = "xl",
  weight = "bold",
  className,
  children,
}) => {
  const Component = `h${level}` as keyof React.JSX.IntrinsicElements;
  return (
    <Component
      className={clsx(
        `text-[${colors.secondary}]`,
        sizeClasses[size],
        weightClasses[weight],
        className
      )}
    >
      {children}
    </Component>
  );
};