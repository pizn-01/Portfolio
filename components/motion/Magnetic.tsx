"use client"

import { useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion"

/**
 * Pulls its child toward the cursor. Used sparingly — primary CTAs and the
 * social row only. Applied everywhere it becomes noise.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const config = { stiffness: 260, damping: 22, mass: 0.6 }
  const sx = useSpring(x, config)
  const sy = useSpring(y, config)

  if (reduced) return <div className={className}>{children}</div>

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
