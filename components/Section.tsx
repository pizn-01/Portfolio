import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import SpineBranch from "@/components/motion/SpineBranch"

/**
 * Shared section frame. Owns the vertical rhythm and the gutter so no
 * section invents its own spacing — that drift is what makes long pages
 * feel assembled rather than designed.
 */
export default function Section({
  id,
  layer,
  children,
  className,
  inverted = false,
}: {
  id: string
  /** Stack layer shown as the eyebrow, e.g. "Interface". */
  layer: string
  children: ReactNode
  className?: string
  inverted?: boolean
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        inverted && "inverted",
        className,
      )}
      style={{
        paddingTop: "var(--section-y)",
        paddingBottom: "var(--section-y)",
        paddingLeft: "var(--gutter)",
        paddingRight: "var(--gutter)",
      }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <SpineBranch label={layer} />
        {children}
      </div>
    </section>
  )
}
