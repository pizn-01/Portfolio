import type { Metadata } from "next"
import type { ReactNode } from "react"
import SmoothScroll from "@/components/motion/SmoothScroll"

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
  // Lenis runs here too. Without it the engineer route scrolled with easing and
  // this one didn't, so crossing between them felt like landing on a different
  // site rather than turning the same one around.
  return (
    <SmoothScroll>
      <div className="operator min-h-screen">{children}</div>
    </SmoothScroll>
  )
}
