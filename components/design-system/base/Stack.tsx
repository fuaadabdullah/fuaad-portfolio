import React from "react";
import { clsx } from "@/lib/utils";
import { spacing } from "../tokens";

export type StackDirection = "row" | "column";
export type StackAlign = "start" | "center" | "end" | "stretch";
export type StackJustify = "start" | "center" | "end" | "between" | "around" | "evenly";
export type StackGap = keyof typeof spacing;

export interface StackProps {
  direction?: StackDirection;
  align?: StackAlign;
  justify?: StackJustify;
  gap?: StackGap;
  wrap?: boolean;
  className?: string;
  children: React.ReactNode;
}

const directionClasses: Record<StackDirection, string> = {
  row: "flex-row",
  column: "flex-col",
};

const alignClasses: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyClasses: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const gapClasses: Record<StackGap, string> = {
  xs: `gap-[${spacing.xs}]`,
  sm: `gap-[${spacing.sm}]`,
  md: `gap-[${spacing.md}]`,
  lg: `gap-[${spacing.lg}]`,
  xl: `gap-[${spacing.xl}]`,
  "2xl": `gap-[${spacing["2xl"]}]`,
};

export const Stack: React.FC<StackProps> = ({
  direction = "column",
  align = "stretch",
  justify = "start",
  gap = "md",
  wrap = false,
  className,
  children,
}) => {
  return (
    <div
      className={clsx(
        "flex",
        directionClasses[direction],
        alignClasses[align],
        justifyClasses[justify],
        gapClasses[gap],
        wrap && "flex-wrap",
        className
      )}
    >
      {children}
    </div>
  );
};