"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Menu, X } from "lucide-react"
import ModeSwitch from "@/components/mode/ModeSwitch"
import { navItems, site } from "@/lib/content/site"

export default function Navigation({
  onNavigate,
}: {
  onNavigate: (id: string) => void
}) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>("")
  const reduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Track the section in view so the nav says where the reader is.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Lock the page behind the mobile sheet.
  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open)
    return () => document.documentElement.classList.remove("lenis-stopped")
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    onNavigate(id)
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-spine ${
          scrolled
            ? "border-b border-cadet-lift bg-ink/80 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
        style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter)" }}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between">
          <button
            onClick={() => go("home")}
            className="font-mono text-xs uppercase tracking-label text-antique"
          >
            {site.shortName}
            <span className="text-tan">.</span>
          </button>

          <nav className="hidden items-center gap-9 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`relative font-mono text-[11px] uppercase tracking-label transition-colors duration-500 ease-spine ${
                  active === item.id
                    ? "text-antique"
                    : "text-muted hover:text-antique"
                }`}
              >
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1.5 left-0 h-px w-full bg-tan"
                    transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ModeSwitch />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="text-antique md:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink md:hidden"
            style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter)" }}
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reduced ? 0 : 0.06 * i,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => go(item.id)}
                  className="display-md py-2 text-left text-antique"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
