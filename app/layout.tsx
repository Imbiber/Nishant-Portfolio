'use client';

import type React from "react";
import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import { Inter } from "next/font/google";
import Script from 'next/script';
import { useEffect } from 'react';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nishant Gaurav - Software Devloper & Full Stack Developer",
  description:
    "Software Devloper at Broadridge | B.Tech CSIT Student at SOA University with 9.17 CGPA | Specializing in Node.js, PostgreSQL, Docker | Open Source Contributor",
  keywords:
    "Software Devloper, full stack developer, node.js, postgresql, docker, broadridge, open source, nishant gaurav",
  authors: [{ name: "Nishant Gaurav" }],
  creator: "Nishant Gaurav",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nishantgaurav.dev",
    title: "Nishant Gaurav - Software Devloper & Full Stack Developer",
    description: "Software Devloper at Broadridge specializing in scalable solutions with Node.js and PostgreSQL",
    siteName: "Nishant Gaurav Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nishant Gaurav - Software Devloper & Full Stack Developer",
    description: "Software Devloper at Broadridge specializing in scalable solutions with Node.js and PostgreSQL",
    creator: "@nishantgaurav19",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: 'v0.dev'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      window.OneSignalDeferred.push(function (OneSignal: any) {
        OneSignal.init({
          appId: '6631c98b-2bd8-4ffa-87b8-19446254c665', // ✅ Replace with your actual OneSignal App ID
          notifyButton: {
            enable: true,
          },
        });
      });
    }
  }, []);

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        {/* OneSignal SDK */}
        <Script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          strategy="beforeInteractive"
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
