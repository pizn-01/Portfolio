import type { Metadata, Viewport } from "next"
import { Fraunces, JetBrains_Mono } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import "./globals.css"

// Display — variable serif. The WONK axis is loaded so `.display`
// can dial it in; see globals.css.
const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-display",
  display: "swap",
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})

const SITE = "https://airafadil.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "M. Airaf Adil — Lead Full Stack Engineer",
    template: "%s — M. Airaf Adil",
  },
  description:
    "Lead Full Stack Engineer in Karachi. Six years building production systems end to end — reservation platforms, AI assessment engines, and security analytics tooling.",
  keywords: [
    "Full Stack Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Supabase",
    "Postgres",
    "Karachi",
  ],
  authors: [{ name: "M. Airaf Adil", url: "https://github.com/pizn-01" }],
  creator: "M. Airaf Adil",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "M. Airaf Adil",
    title: "M. Airaf Adil — Lead Full Stack Engineer",
    description:
      "Six years building production systems end to end. Karachi, Pakistan.",
    // Card image comes from app/opengraph-image.tsx — Next wires it up.
  },
  twitter: {
    card: "summary_large_image",
    title: "M. Airaf Adil — Lead Full Stack Engineer",
    description:
      "Six years building production systems end to end. Karachi, Pakistan.",
    creator: "@pizn_01",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#0B1224",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${GeistSans.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
