import type { ReactNode } from "react";
import clsx from "clsx";

type Size = "default" | "narrow" | "wide";

const sizes: Record<Size, string> = {
  default: "max-w-5xl",
  narrow: "max-w-3xl",
  wide: "max-w-6xl",
};

export default function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: Size;
}) {
  return (
    <div className={clsx("mx-auto w-full px-4 sm:px-6", sizes[size], className)}>
      {children}
    </div>
  );
}
