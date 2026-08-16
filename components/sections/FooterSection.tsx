"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import Parallax from "@/components/motion/Parallax"
import { site, navItems } from "@/lib/content/site"

/**
 * The footer is the page's last word, not a utility strip.
 *
 * It closes the Spine: the wordmark is set in outline (the hero's ghost type,
 * returning), and a live Karachi clock states the one practical fact a
 * prospective client actually needs — what time it is where the work happens.
 */
export default function FooterSection({
  onNavigate,
}: {
  onNavigate: (id: string) => void
}) {
  const [time, setTime] = useState<string | null>(null)

  // Rendered only after mount: the server has no idea what time it is in
  // Karachi relative to the visitor, and guessing produces a hydration
  // mismatch on the first paint.
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Karachi",
        }).format(new Date()),
      )
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  const socials = [
    { label: "GitHub", href: site.links.github },
    { label: "LinkedIn", href: site.links.linkedin },
    { label: "Upwork", href: site.links.upwork },
    { label: "Twitter", href: site.links.twitter },
  ]

  return (
    <footer
      className="relative overflow-hidden border-t border-cadet-lift bg-ink"
      style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter)" }}
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* ── Status row ─────────────────────────────────────── */}
        <div className="flex flex-wrap items-start justify-between gap-8 pt-16">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-periwinkle opacity-70 motion-safe:animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-periwinkle" />
              </span>
              <span className="layer-label">Available for work</span>
            </div>
            <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-muted">
              Taking on select full-stack projects. The fastest route is the
              form above — or email me directly.
            </p>
          </div>

          <dl className="flex gap-10">
            <div>
              <dt className="meta">Karachi</dt>
              <dd className="mt-1 font-mono text-sm tabular-nums text-antique">
                {time ?? "—:—"}{" "}
                <span className="text-muted-deep">PKT</span>
              </dd>
            </div>
            <div>
              <dt className="meta">Reply time</dt>
              <dd className="mt-1 font-mono text-sm text-antique">
                Within a day
              </dd>
            </div>
          </dl>
        </div>

        {/* ── Link columns ───────────────────────────────────── */}
        <nav className="mt-16 grid gap-10 border-t border-cadet-lift pt-10 sm:grid-cols-3">
          <div>
            <p className="meta">Sections</p>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="font-mono text-sm text-muted transition-colors duration-500 ease-spine hover:text-periwinkle"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="meta">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-muted transition-colors duration-500 ease-spine hover:text-periwinkle"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="meta">Direct</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="font-mono text-sm text-muted transition-colors duration-500 ease-spine hover:text-periwinkle"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="font-mono text-sm text-muted transition-colors duration-500 ease-spine hover:text-periwinkle"
                >
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* ── Wordmark — the hero's ghost type, returning ────── */}
        {/* Fades into the ground rather than stopping at a hard edge, so it
            reads as the page trailing off instead of a headline that got cut. */}
        <Parallax depth={-0.08} className="relative mt-16 flex justify-center">
          <span
            aria-hidden="true"
            className="display type-outline select-none whitespace-nowrap text-[13vw] leading-[0.8]"
            style={{
              maskImage:
                "linear-gradient(to bottom, #000 0%, #000 42%, transparent 92%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 0%, #000 42%, transparent 92%)",
            }}
          >
            AIRAF ADIL
          </span>
        </Parallax>

        {/* ── Colophon ───────────────────────────────────────── */}
        <div className="relative flex flex-wrap items-center justify-end gap-6 border-t border-cadet-lift py-8">
          <div className="flex items-center gap-8">
            <p className="meta">© {new Date().getFullYear()} {site.name}</p>
            <button
              onClick={() => onNavigate("home")}
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-muted transition-colors duration-500 ease-spine hover:text-periwinkle"
            >
              Top
              <ArrowUp
                size={12}
                className="transition-transform duration-500 ease-spine group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
