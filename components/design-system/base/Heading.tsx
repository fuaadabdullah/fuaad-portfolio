import React from "react";
import { clsx } from "@/lib/utils";
import { fontWeights } from "../tokens";

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
  xs: `text-[0.75rem]`,
  sm: `text-[0.875rem]`,
  md: `text-[1rem]`,
  lg: `text-[1.125rem]`,
  xl: `text-[1.25rem]`,
  '2xl': `text-[1.5rem]`,
  '3xl': `text-[2rem]`,
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
        `text-[var(--color-sand)]`,
        sizeClasses[size],
        weightClasses[weight],
        className
      )}
    >
      {children}
    </Component>
  );
};