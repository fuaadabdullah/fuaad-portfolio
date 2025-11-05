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
  description: "Portfolio, resume, and services by Fuaad Abdullah.",
  // Domain will be set later; use env with sensible local fallback for now
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Fuaad Abdullah — Portfolio",
    description: "Projects, resume, and services.",
    siteName: "Fuaad Abdullah",
    images: [{ url: "/og-default.png" }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Fuaad Abdullah — Portfolio",
    description: "Projects, resume, and services.",
    images: ["/og-default.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <JsonLd data={personJsonLd} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
