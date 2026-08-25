import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LazyChatBox from "@/components/chat/LazyChatBox";
import JsonLd from '@/components/JsonLd';
import { personJsonLd } from '@/lib/seo';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://heyimfuaad.me";

export const metadata: Metadata = {
  title: "Fuaad Abdullah — Software for Markets, Automation & AI",
  description: "Fintech and AI products built end to end — trading, automation, and AI tools from real market workflows. Recruiter-ready portfolio, resume, and shipped projects.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Fuaad Abdullah — Software for Markets, Automation & AI",
    description: "Finance x dev portfolio with shipped trading tools, quantified outcomes, and current availability for fintech SWE roles and internships.",
    siteName: "Fuaad Abdullah",
    url: siteUrl,
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "Fuaad Abdullah — Software for Markets, Automation & AI",
    description: "Finance x dev portfolio with shipped trading tools, quantified outcomes, and current availability for fintech SWE roles and internships.",
    creator: "@fuaadabdullah"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <JsonLd data={personJsonLd} />
        <LazyChatBox />
        <Analytics />
      </body>
    </html>
  );
}
