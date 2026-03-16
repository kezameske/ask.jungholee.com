import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: `Jungho Lee | PM for Streaming, CTV & AI Products`,
  description: siteConfig.headline,
  other: {
    "theme-color": "#0c0a09",
  },
  openGraph: {
    title: `Jungho Lee | PM for Streaming, CTV & AI Products`,
    description: siteConfig.headline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={`${outfit.variable} ${cormorantGaramond.variable} antialiased`}
        style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
      >
        <div className="grain-overlay" />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
