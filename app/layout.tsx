import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { personJsonLd } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Fuaad Abdullah — Builder, Trader, Student",
  description: "Finance student at GSU building RIZZK, a risk calculator for day traders. I ship focused, numbers-first web apps and offer consulting for student projects.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Fuaad Abdullah — Portfolio",
    description: "Finance student building disciplined tools for traders and students. Check out my projects, resume, and consulting services.",
    siteName: "Fuaad Abdullah",
    url: siteUrl,
    images: [{ 
      url: "/og-default.png",
      width: 1200,
      height: 630,
      alt: "Fuaad Abdullah - Building disciplined tools for traders and students"
    }],
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "Fuaad Abdullah — Portfolio",
    description: "Finance student building disciplined tools for traders and students. Check out my projects, resume, and consulting services.",
    images: [{
      url: "/og-default.png",
      alt: "Fuaad Abdullah - Building disciplined tools for traders and students"
    }],
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
        <Analytics />
      </body>
    </html>
  );
}