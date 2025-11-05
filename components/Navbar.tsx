"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/services", label: "Services" },
];
export default function Navbar(){
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[#0b0f13]/70 border-b border-white/10">
      <nav className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="font-semibold" aria-label="Fuaad Abdullah - Home">
          Fuaad Abdullah
        </Link>
        <ul className="flex gap-5 text-sm">
          {links.map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className={
                  "hover:text-white transition-colors " + (pathname === l.href ? "text-white" : "text-white/60")
                }
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
