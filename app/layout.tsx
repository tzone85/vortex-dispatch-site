import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";
import { company, homepageSeo } from "@/core";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const seo = homepageSeo(company);

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: seo.title,
    template: `%s · ${company.brandName}`,
  },
  description: seo.description,
  keywords: [
    "commercial software development",
    "custom software South Africa",
    "SaaS product engineering",
    "marketplace development",
    "Vortex Dispatch",
    "software studio",
    "B2B software",
  ],
  authors: [{ name: company.brandName }],
  creator: company.brandName,
  openGraph: {
    title: seo.openGraph.title,
    description: seo.openGraph.description,
    url: seo.openGraph.url,
    siteName: seo.openGraph.siteName,
    locale: seo.openGraph.locale,
    type: seo.openGraph.type,
  },
  twitter: {
    card: seo.twitter.card,
    title: seo.twitter.title,
    description: seo.twitter.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: seo.canonical,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-ZA"
      className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable}`}
    >
      <body className="site-atmosphere min-h-screen antialiased">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
