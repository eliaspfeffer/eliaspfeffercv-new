import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://www.eliaspfeffer.de";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Elias Pfeffer - Mechatronics Engineer & Entrepreneur",
    template: "%s | Elias Pfeffer",
  },
  description:
    "Elias Pfeffer is a mechatronics engineer, full-stack developer, and serial builder from Germany. Explore his public projects in Bitcoin research, embodied AI, electric vehicles, and software development.",
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
    title: "Elias Pfeffer - Mechatronics Engineer & Entrepreneur",
    description:
      "Mechatronics engineer & full-stack developer from Germany. Bitcoin research, embodied AI, electric vehicles, and software projects.",
    url: BASE_URL,
    siteName: "Elias Pfeffer Portfolio",
    images: [
      {
        url: "/liquid-glass-social-preview.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Elias Pfeffer - Mechatronics Engineer & Entrepreneur",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elias Pfeffer - Mechatronics Engineer & Entrepreneur",
    description:
      "Mechatronics engineer & full-stack developer from Germany. Bitcoin research, embodied AI, electric vehicles, and software projects.",
    images: ["/liquid-glass-social-preview.jpg"],
    creator: "@elias_pfeffer",
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
        "https://x.com/elias_pfeffer",
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
      name: "Public Projects by Elias Pfeffer",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Mesh Research — Bitcoin Trading Research",
          url: "https://meshresearch.xyz",
          description:
            "Bitcoin trading research with historical strategy backtests and benchmark comparisons.",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "BitChat — Bitcoin Messaging & Wallet",
          url: "https://bit-chat.me",
          description:
            "Software for buying, selling, and sending money / bitcoin / stablecoins by simply writing a text message.",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Built an Embodied World Model Architecture",
          url: "https://dontkillmy.computer",
          description:
            "Built a self-thinking consciousness / embodied world model architecture for humanoid robots (not a LLM or GPT wrapper or similar).",
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
          name: "Songs",
          url: "https://songs.eliaspfeffer.de/",
          description: "My own Spotify-style music player.",
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "PixelHUD",
          url: "https://pixelhud.eliaspfeffer.de/",
          description:
            "Minecraft-style HUD overlay for Mac and Windows showing system info.",
        },
        {
          "@type": "ListItem",
          position: 7,
          name: "Athlet",
          url: "https://athlet.eliaspfeffer.de/",
          description: "Training planning, nutrition and personal health logs in one app.",
        },
        {
          "@type": "ListItem",
          position: 8,
          name: "Calendar365",
          url: "https://calendar365.app/",
          description: "A year-at-a-glance planner with sticky notes, optional Google Calendar sync, and calendar sharing.",
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
        <script
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
