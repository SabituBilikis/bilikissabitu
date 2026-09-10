import type { Metadata } from "next";
import { Inter, Inter_Tight, Instrument_Serif, Fragment_Mono } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-inter-tight",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});
const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-fragment-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bilikis Sabitu — Product Designer & AI-Native Builder",
  description:
    "Bilikis Sabitu — product designer and AI-native builder in Lagos. I design and ship production apps end-to-end, from Figma to React Native to live. Selected work: Recall, a knowledge app built solo and heading to the Play Store; a 0→1 AI telehealth platform; and more.",
  openGraph: {
    title: "Bilikis Sabitu — Product Designer & AI-Native Builder",
    description:
      "I design and ship production apps end-to-end. I care about the states most teams skip: the empty screen, the failed payment, the moment the AI isn't sure.",
    type: "website",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bilikis Sabitu",
  jobTitle: "Product Designer & AI-Native Builder",
  email: "sabitubilikis96@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
  sameAs: ["https://www.linkedin.com/in/bilikis-sabitu"],
  knowsAbout: [
    "Product Design",
    "UI/UX Design",
    "Design Systems",
    "Accessibility",
    "React Native",
    "Next.js",
    "AI-Native Design",
  ],
};

import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable} ${instrumentSerif.variable} ${fragmentMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
