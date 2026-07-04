import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type React from "react";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://eliaspfeffer.de";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Elias Pfeffer — Builder, Developer & Entrepreneur",
    template: "%s | Elias Pfeffer",
  },
  description:
    "Elias Pfeffer is a mechatronics engineer, full-stack developer, and serial builder from Germany. Explore his portfolio: Bitcoin trading algorithms, AI consciousness models, electric vehicles, and 20+ software projects.",
  keywords: [
    "Elias Pfeffer",
    "elias pfeffer developer",
    "elias pfeffer portfolio",
    "indie developer portfolio",
    "startup founder portfolio",
    "full stack developer germany",
    "mechatronics engineer",
    "bitcoin developer",
    "AI developer",
    "software engineer germany",
    "entrepreneur developer",
    "personal portfolio",
    "eliaspfeffer.de",
    "trading algorithm developer",
    "electric vehicle builder",
  ],
  authors: [{ name: "Elias Pfeffer", url: BASE_URL }],
  creator: "Elias Pfeffer",
  publisher: "Elias Pfeffer",
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
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Elias Pfeffer — Builder, Developer & Entrepreneur",
    description:
      "Mechatronics engineer & full-stack developer from Germany. Bitcoin trading algorithms, AI models, electric vehicles, and 20+ software projects.",
    url: BASE_URL,
    siteName: "Elias Pfeffer Portfolio",
    images: [
      {
        url: "/elias.png",
        width: 800,
        height: 800,
        alt: "Elias Pfeffer — Builder, Developer & Entrepreneur",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elias Pfeffer — Builder, Developer & Entrepreneur",
    description:
      "Mechatronics engineer & full-stack developer from Germany. Bitcoin trading algorithms, AI models, electric vehicles, and 20+ software projects.",
    images: ["/elias.png"],
    creator: "@eliaspfeffer",
  },
  icons: {
    icon: "/icon.jpeg",
    apple: "/icon.jpeg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Elias Pfeffer",
      url: BASE_URL,
      image: `${BASE_URL}/elias.png`,
      jobTitle: "Mechatronics Engineer, Full-Stack Developer & Entrepreneur",
      description:
        "Elias Pfeffer is a mechatronics engineer and full-stack developer from Germany who builds Bitcoin trading algorithms, AI consciousness models, electric vehicles, and software products.",
      knowsAbout: [
        "Bitcoin",
        "Trading Algorithms",
        "Artificial Intelligence",
        "Full-Stack Development",
        "Mechatronics Engineering",
        "Electric Vehicles",
        "Python",
        "Next.js",
        "TypeScript",
      ],
      sameAs: [
        "https://github.com/eliaspfeffer",
        "https://www.linkedin.com/in/eliaspfeffer/",
        "https://twitter.com/eliaspfeffer",
      ],
      email: "eliaspfeffer@gmail.com",
      nationality: "German",
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Elias Pfeffer Portfolio",
      description: "Personal portfolio and CV of Elias Pfeffer",
      author: { "@id": `${BASE_URL}/#person` },
      inLanguage: "en-US",
    },
    {
      "@type": "ItemList",
      "@id": `${BASE_URL}/#projects`,
      name: "Featured Projects by Elias Pfeffer",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Mesh Research — Profitable Bitcoin Trading Algorithm",
          url: "https://meshresearch.xyz",
          description:
            "A trading algorithm that outperforms DCA, HODL, and Lump Sum strategies.",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "BitChat — Bitcoin Messaging & Wallet",
          url: "https://bit-chat.me",
          description:
            "Software for buying, selling, and sending Bitcoin with integrated messaging.",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Built Embodied World Model Architecture",
          url: "https://dontkillmy.computer",
          description:
            "A self-thinking consciousness model — not an LLM wrapper — that mimics the systematic behavior of a human mind.",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Electric ATV — 60 kW Custom Build",
          url: "https://endless-sphere.com/sphere/threads/my-60kw-electric-atv-quad-built.122397/",
          description:
            "Custom-built electric ATV: 0–100 km/h in ~3.6 s, 60 kW, 6 kWh battery.",
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "AI-CTO Service",
          url: "https://cto.eliaspfeffer.de/",
          description:
            "Hire a complete AI-powered technical department with Claude Code as CTO.",
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "Minecraft HUD",
          url: "https://minecrafthud.vercel.app",
          description:
            "Minecraft-style HUD overlay for Mac and Windows showing system info.",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          id="json-ld-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.className} bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50`}
      >
        {children}
      </body>
    </html>
  );
}
