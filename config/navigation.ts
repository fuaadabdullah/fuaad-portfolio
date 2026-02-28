import type { NavLink } from "@/types/navigation";

export const links: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "Lore" },
  { href: "/resume", label: "Resume" },
];

export const cta: NavLink = { href: "/services", label: "Let's Work" };