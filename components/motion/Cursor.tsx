"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion"

/**
 * A tan ring that trails the pointer and tightens over interactive elements.
 * Pointer-only — bails out entirely on touch, where it would be dead weight.
 */
export default function Cursor() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 380, damping: 30, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 380, damping: 30, mass: 0.4 })

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia("(pointer: fine)").matches) return
    setEnabled(true)

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target as HTMLElement | null
      setActive(!!el?.closest("a, button, [data-cursor]"))
    }

    window.addEventListener("pointermove", move, { passive: true })
    return () => window.removeEventListener("pointermove", move)
  }, [reduced, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="rounded-full border border-tan"
        animate={{
          width: active ? 44 : 22,
          height: active ? 44 : 22,
          opacity: active ? 0.9 : 0.45,
          x: active ? -22 : -11,
          y: active ? -22 : -11,
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  )
}
