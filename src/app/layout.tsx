import type { Metadata } from "next";
import { Audiowide, Geist, Geist_Mono } from "next/font/google";

import { AppShell } from "@/components/app-shell";
import { getSiteUrl } from "@/lib/env";

import "./globals.css";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Apineer",
    template: "%s | Apineer",
  },
  description:
    "Discover, evaluate, and compare fintech API providers across African markets.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Apineer",
    title: "Apineer",
    description:
      "Discover, evaluate, and compare fintech API providers across African markets.",
  },
  twitter: {
    card: "summary",
    title: "Apineer",
    description:
      "Discover, evaluate, and compare fintech API providers across African markets.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${audiowide.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
