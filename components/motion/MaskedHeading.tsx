"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"

/**
 * Proposal 04 — line-mask headings.
 *
 * Each line sits in an overflow-hidden box and rises out of it, rather than
 * fading in. Two reasons this is the right treatment here and not just a
 * different one:
 *
 *  - Both display faces are set heavy or high-contrast at these sizes.
 *    Animating opacity on them makes the thin strokes shimmer as they cross
 *    the low-alpha range; moving the whole letterform keeps it crisp.
 *  - The hero on both routes already does exactly this. Extending it to the
 *    section headings means the page has one way of introducing a title
 *    instead of two.
 *
 * `accent` marks the line that carries the emphasis treatment — italic tan on
 * the engineer route, a vermilion bar on the operator route. Both come from
 * `.display-accent`, which each theme defines for itself.
 */

const EASE = [0.22, 1, 0.36, 1] as const

export default function MaskedHeading({
  lines,
  /** Index of the line that takes the accent. Omit for none. */
  accent,
  className = "display-lg",
  as: Tag = "h2",
}: {
  lines: string[]
  accent?: number
  className?: string
  as?: "h1" | "h2" | "h3"
}) {
  const reduced = useReducedMotion()

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
  }

  // `y` as a percentage string rather than `yPercent`: Framer's Variant type
  // only knows CSS-shaped properties, where yPercent is a GSAP concept.
  const line: Variants = {
    hidden: reduced ? { opacity: 0, y: "0%" } : { opacity: 1, y: "108%" },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.85, ease: EASE },
    },
  }

  return (
    <Tag className={className}>
      <motion.span
        className="block"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-12% 0px" }}
      >
        {lines.map((text, i) => (
          // The mask is the outer box; the inner span is what moves.
          <span key={text} className="block overflow-hidden py-[0.04em]">
            <motion.span className="block" variants={line}>
              {i === accent ? (
                <span className="display-accent">{text}</span>
              ) : (
                text
              )}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
