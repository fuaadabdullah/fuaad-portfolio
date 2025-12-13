
import React from "react";
import { clsx } from "@/lib/utils";

export type CardVariant = "default" | "compact" | "featured";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  variant?: CardVariant;
}

export default function Card({
  className,
  children,
  variant = "default",
}: CardProps) {
  return (
    <article
      className={clsx(
        "rounded-2xl border border-white/10 p-6 transition-shadow",
        variant === "compact" && "p-3 text-sm",
        variant === "featured" && "shadow-2xl border-white/20 bg-white/5",
        className
      )}
    >
      {children}
    </article>
  );
}
