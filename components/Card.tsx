import React from "react";

function clsx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <article className={clsx("rounded-2xl border border-white/10 p-6", className)}>{children}</article>;
}
