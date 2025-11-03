import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext"; // ✅ Import the context provider
import Script from "next/script"; // ✅ Import Script for Google Identity

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mipi | Everything You Need in One Place",
  description:
    "Shop electronics, fashion, beauty, and home essentials at Mipi — your all-in-one shopping platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Wrap entire app inside ShopProvider */}
        <ShopProvider>{children}</ShopProvider>

        {/* ✅ Load Google Identity Services script */}
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
