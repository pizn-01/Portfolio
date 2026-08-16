import type { Metadata } from "next"
import type { ReactNode } from "react"

/**
 * Its own document, not a toggled state — so it can be linked directly,
 * indexed on its own terms, and found by someone searching for delivery
 * rather than engineering.
 */
export const metadata: Metadata = {
  title: "Engineering Leadership",
  description:
    "Co-founder running engineering across two companies — technical direction, hiring, standards and delivery. Open to Head of Development, CTO and Head of Operations roles.",
  keywords: [
    "Head of Development",
    "CTO",
    "Head of Operations",
    "Development Manager",
    "Engineering Leadership",
  ],
  alternates: { canonical: "/operator" },
  openGraph: {
    type: "profile",
    url: "/operator",
    title: "M. Airaf Adil — Engineering Leadership",
    description:
      "I own the architecture and the org chart. Co-founder running engineering across two companies.",
  },
}

export default function OperatorLayout({ children }: { children: ReactNode }) {
  // `.operator` swaps the design tokens for the whole subtree — see globals.css.
  //
  // Lenis lives in the root layout so a single instance spans both routes.
  return <div className="operator min-h-screen">{children}</div>
}
