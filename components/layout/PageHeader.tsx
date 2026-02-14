import type { ReactNode } from "react";
import clsx from "clsx";

export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <header className={clsx("space-y-4", className)}>
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.24em] text-white/50">
          {eyebrow}
        </p>
      ) : null}

      <div className="space-y-3">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
          {title}
        </h1>
        {description ? (
          <p className="text-white/80 max-w-2xl leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>

      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </header>
  );
}

