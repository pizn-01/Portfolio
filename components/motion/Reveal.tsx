"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

/**
 * The single entrance primitive. Everything that fades in on this site
 * goes through here, so timing and easing stay consistent — scattered
 * one-off transitions are what make a page feel machine-assembled.
 */

const EASE = [0.22, 1, 0.36, 1] as const

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  /** Distance travelled, in px. 0 = pure fade. */
  distance?: number
  as?: "div" | "section" | "li" | "article"
}

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 28,
  as = "div",
}: Props) {
  const reduced = useReducedMotion()
  const Tag = motion[as]

  return (
    <Tag
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

/** Parent for staggered lists. Pair with <RevealItem/>. */
export function RevealGroup({
  children,
  className,
  stagger = 0.07,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
}) {
  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
  distance = 20,
}: {
  children: ReactNode
  className?: string
  distance?: number
}) {
  const reduced = useReducedMotion()

  const variants: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: EASE },
    },
  }

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}
