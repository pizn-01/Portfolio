import { site } from "@/lib/content/site"

export default function FooterSection() {
  const socials = [
    { label: "GitHub", href: site.links.github },
    { label: "LinkedIn", href: site.links.linkedin },
    { label: "Twitter", href: site.links.twitter },
    { label: "Instagram", href: site.links.instagram },
  ]

  return (
    <footer
      className="border-t border-cadet-lift"
      style={{
        paddingLeft: "var(--gutter)",
        paddingRight: "var(--gutter)",
      }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-sm text-antique">{site.name}</p>
          <p className="meta mt-1">
            {site.role} · {site.location}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-label text-muted transition-colors hover:text-periwinkle"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <p className="meta">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
