import React from "react";
import { clsx } from "@/lib/utils";
import { colors } from "../tokens";
import * as LucideIcons from "lucide-react";

export type IconName = keyof typeof LucideIcons;
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
}

const sizeClasses: Record<IconSize, string> = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
};

export const Icon: React.FC<IconProps> = ({ name, size = "md", className }) => {
  const IconComponent = LucideIcons[name] as React.ComponentType<{ className?: string }>;
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Lucide icons`);
    return null;
  }
  return (
    <IconComponent
      className={clsx(
        sizeClasses[size],
        `text-[${colors.secondary}]`,
        className
      )}
    />
  );
};