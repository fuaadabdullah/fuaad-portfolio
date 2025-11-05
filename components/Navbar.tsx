"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/resume", label: "Resume" },
  { href: "/services", label: "Services" },
];
export default function Navbar(){
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[#0b0f13]/70 border-b border-white/10">
      <nav className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">Fuaad Abdullah</Link>
        <ul className="flex gap-5 text-sm">
          {links.map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={
                  "hover:text-white " + (pathname === l.href ? "text-white" : "text-white/60")
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
