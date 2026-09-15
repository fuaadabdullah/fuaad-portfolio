import type { ReactNode } from "react";

export default function PageHeader({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-12 max-w-3xl">
      <p className="eyebrow mb-5">{label}</p>
      <h1 className="page-heading">{title}</h1>
      {children && <div className="intro-text mt-6">{children}</div>}
    </header>
  );
}
