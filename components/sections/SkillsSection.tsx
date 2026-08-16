import Section from "@/components/Section"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal"
import Parallax from "@/components/motion/Parallax"
import MaskedHeading from "@/components/motion/MaskedHeading"
import { skillGroups } from "@/lib/content/skills"

/**
 * Grouped by stack layer rather than by "languages / frameworks / tools",
 * so the shape of the list says something about how the work is structured.
 * Core items are marked — depth reads as expertise where a flat dump doesn't.
 */
export default function SkillsSection() {
  return (
    <Section id="skills" layer="Interface">
      <Reveal>
        <MaskedHeading
          lines={["The tools,", "by layer."]}
          accent={1}
          className="display-lg text-antique"
        />
        <p className="mt-8 max-w-lg text-pretty text-muted">
          Filled marks are what I reach for by default. The rest I&apos;ve
          shipped with and would pick up again without ceremony.
        </p>
      </Reveal>

      <div className="mt-20 space-y-px border-y border-cadet-lift">
        {skillGroups.map((group, gi) => (
          <Reveal
            key={group.layer}
            delay={gi * 0.06}
            className="grid gap-6 border-t border-cadet-lift py-10 first:border-t-0 md:grid-cols-12 md:gap-10"
          >
            {/* The layer name hangs back a little as the chips scroll past,
                so the list reads as sitting in front of its heading. */}
            <Parallax depth={-0.05} className="md:col-span-4">
              <h3 className="display-sm text-antique">{group.layer}</h3>
              <p className="meta mt-2">{group.note}</p>
            </Parallax>

            <RevealGroup className="flex flex-wrap gap-x-3 gap-y-3 md:col-span-8 md:pt-2">
              {group.items.map((item) => (
                <RevealItem key={item.name}>
                  <span
                    className={
                      item.core
                        ? "inline-flex items-center gap-2 border border-periwinkle/40 bg-periwinkle-ghost px-3.5 py-2 font-mono text-xs text-periwinkle"
                        : "inline-flex items-center gap-2 border border-cadet-lift px-3.5 py-2 font-mono text-xs text-muted"
                    }
                  >
                    <span
                      aria-hidden="true"
                      className={
                        item.core
                          ? "h-1 w-1 rounded-full bg-periwinkle"
                          : "h-1 w-1 rounded-full border border-muted-deep"
                      }
                    />
                    {item.name}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
