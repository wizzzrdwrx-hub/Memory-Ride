import type { Metadata } from "next";
import { Inter, Playfair_Display, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-story",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Memory Ride MVP • Project Opal",
  description: "An interactive, path-based storytelling map of Charleston road trips.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-900">{children}</body>
    </html>
  );
}
