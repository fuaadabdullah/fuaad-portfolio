import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className = "" }: ContainerProps) {
  const classes = ["site-container", className]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}
