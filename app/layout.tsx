import type { Metadata, Viewport } from "next"
import { Archivo, Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import PivotOverlay from "@/components/mode/PivotOverlay"
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

/**
 * Operator mode's faces. Loaded here rather than in the route so both
 * personas are available during the pivot transition — a font swapping
 * mid-animation is exactly the flicker the transition exists to avoid.
 *
 * Archivo at 700/800 is declarative and industrial where Fraunces is
 * considered and luxurious. Deliberately not Space Grotesk, which is the
 * default pairing on half the portfolios in this category.
 */
const opDisplay = Archivo({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-op-display",
  display: "swap",
})

const opBody = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-op-body",
  display: "swap",
})

// JetBrains Mono is shared by both modes on purpose: it is the thread that
// says this is one person, and it is the right face for the numbers the
// operator side is built on.
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
      className={`${display.variable} ${GeistSans.variable} ${mono.variable} ${opDisplay.variable} ${opBody.variable}`}
    >
      <body>
        {children}
        {/* Mounted here, above the route, so the transition survives the
            document swap it is covering. */}
        <PivotOverlay />
      </body>
    </html>
  )
}
