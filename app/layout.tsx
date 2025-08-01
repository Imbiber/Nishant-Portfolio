import type React from "react";
import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import { Inter } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import OneSignalInit from "@/components/OneSignalInit"; // ⬅️ (Step 2)

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nishant Gaurav - Software Devloper & Full Stack Developer",
  description: "Software Devloper at Broadridge | ...",
  // ... your metadata stays unchanged
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <Script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          strategy="beforeInteractive"
        />
        <OneSignalInit /> {/* ⬅️ Renders OneSignal init logic on client only */}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
