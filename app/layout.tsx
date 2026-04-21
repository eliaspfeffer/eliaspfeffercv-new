import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type React from "react"; // Import React

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elias Pfeffer - Engineer & Developer",
  description: "Personal portfolio of Elias Pfeffer - Mechatronics Engineer",
  openGraph: {
    title: "Elias Pfeffer - Engineer & Developer",
    description: "Mechatronics Engineer",
    url: "https://eliaspfeffer.de",
    siteName: "Elias Pfeffer Portfolio",
    images: [
      {
        url: "/icon.jpeg",
        width: 800,
        height: 800,
        alt: "Elias Pfeffer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elias Pfeffer - Engineer & Developer",
    description: "Mechatronics Engineer",
    images: ["/icon.jpeg"],
    creator: "@eliaspfeffer",
  },
  icons: {
    icon: "/icon.jpeg",
    apple: "/icon.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50`}
      >
        {children}
      </body>
    </html>
  );
}
