import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: `${siteConfig.name} | Business Operations & AI Automation`,
  description: siteConfig.headline,
  openGraph: {
    title: `${siteConfig.name} | Resume & AI Assistant`,
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
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased text-slate-900 dark:text-slate-100`}>
        {children}
      </body>
    </html>
  );
}
