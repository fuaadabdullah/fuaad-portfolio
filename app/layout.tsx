import "./globals.css";
import type { Metadata } from "next";
import { Manrope, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveals from "@/components/ScrollReveals";
import LazyChatBox from "@/components/chat/LazyChatBox";
import JsonLd from '@/components/JsonLd';
import { personJsonLd } from '@/lib/seo';

const siteUrl = "https://heyimfuaad.me";
const siteTitle = "Fuaad Abdullah | Software Developer & Georgia State Undergraduate";
const siteDescription = "Software projects, AI tools, client services, and current undergraduate studies. Explore the professional portfolio of Fuaad Abdullah.";
const headingFont = Manrope({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const bodyFont = Source_Sans_3({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  applicationName: "Fuaad Abdullah",
  authors: [{ name: "Fuaad Abdullah", url: "/profile" }],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: "Fuaad Abdullah",
    type: "website",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fuaad Abdullah professional portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/twitter-image"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
        <a
          href="#main-content"
          className="skip-to-main"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <ScrollReveals />
        <JsonLd data={personJsonLd} />
        <LazyChatBox />
        <Analytics />
      </body>
    </html>
  );
}
