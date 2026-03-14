import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Header } from "@/app/_components/Header";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://standinghistory.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Standing History — Football Standings Archive",
    template: "%s | Standing History",
  },
  description:
    "Replay any matchweek from any football season across Europe's top leagues. Browse historical standings for Premier League, La Liga, Serie A, Bundesliga, Ligue 1, and more.",
  keywords: [
    "football standings",
    "soccer standings",
    "matchweek history",
    "Premier League history",
    "La Liga standings",
    "Serie A standings",
    "Bundesliga standings",
    "historical football data",
    "league table archive",
    "football statistics",
  ],
  authors: [{ name: "Standing History" }],
  creator: "Standing History",
  icons: { icon: "/logo.svg" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Standing History",
    title: "Standing History — Football Standings Archive",
    description:
      "Replay any matchweek from any football season across Europe's top leagues. Premier League, La Liga, Serie A, Bundesliga, Ligue 1, and more.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Standing History — Football Standings Archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Standing History — Football Standings Archive",
    description:
      "Replay any matchweek from any football season across Europe's top leagues.",
    images: ["/opengraph-image"],
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
};

export const viewport: Viewport = {
  themeColor: "#16a34a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <Header />
        <div className="flex min-h-[calc(100vh-3.5rem)] flex-1 flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
