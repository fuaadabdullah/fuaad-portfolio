import React from "react";

function clsx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Variant = "default" | "success" | "outline";

const base = "inline-flex items-center rounded-full text-xs px-2 py-1";
const variants: Record<Variant, string> = {
  default: "bg-white/10 text-white",
  success: "bg-[#16a34a]/20 text-[#86efac]",
  outline: "border border-white/20 text-white",
};

export default function Badge({
  className,
  variant = "default",
  children,
}: {
  className?: string;
  variant?: Variant;
  children: React.ReactNode;
}) {
  return <span className={clsx(base, variants[variant], className)}>{children}</span>;
}
