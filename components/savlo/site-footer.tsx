import Link from "next/link"

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] =
  [
    {
      heading: "Product",
      links: [
        { label: "Daily check-in", href: "#features" },
        { label: "Sinking funds (fondos)", href: "#" },
        { label: "AI micro-plans", href: "#" },
        { label: "Weekly insights", href: "#product" },
        { label: "Excel import", href: "#features" },
      ],
    },
    {
      heading: "Philosophy",
      links: [
        { label: "Behavioral finance", href: "#philosophy" },
        { label: "Why no streaks", href: "#philosophy" },
        { label: "Dark mode only", href: "#" },
        { label: "Design principles", href: "#" },
      ],
    },
    {
      heading: "Learn",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Guides", href: "#" },
        { label: "Changelog", href: "#" },
        { label: "Research", href: "#" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Security", href: "#trust" },
        { label: "Responsible disclosure", href: "#" },
      ],
    },
  ]

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/70 bg-background">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-20 sm:pt-24">
        {/* Main grid: logo column + 5 link columns */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M4 15c3-7 6-7 8-4s5 3 8-4" />
                </svg>
              </span>
              <span className="font-serif text-xl tracking-tight">Savlo</span>
            </Link>
            <p className="mt-4 max-w-[220px] text-[13px] leading-relaxed text-muted-foreground">
              Behavioral finance wellness. Designed for anxious minds, not power
              users.
            </p>
            <p className="mt-3 max-w-[220px] font-serif text-[13px] italic leading-relaxed text-muted-foreground/80">
              &ldquo;Lo que se siente, no se ve.&rdquo;
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-sm font-medium text-foreground">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="link-underline text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Download / CTA badges — mirrors Monarch's app badges block */}
        <div className="mt-14 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-end">
          <Link
            href="#cta"
            className="btn-calm inline-flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-2.5 text-left"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-foreground"
              fill="currentColor"
              aria-hidden
            >
              <path d="M17.05 13.02c-.03-2.46 2.01-3.64 2.1-3.7-1.15-1.68-2.94-1.91-3.57-1.94-1.52-.15-2.96.89-3.73.89-.78 0-1.96-.87-3.22-.84-1.65.02-3.18.96-4.03 2.44-1.72 2.98-.44 7.39 1.24 9.8.82 1.18 1.8 2.5 3.07 2.45 1.23-.05 1.7-.8 3.19-.8 1.49 0 1.9.8 3.2.77 1.32-.02 2.16-1.2 2.97-2.38.94-1.36 1.32-2.68 1.34-2.75-.03-.01-2.56-.98-2.59-3.89ZM14.51 5.3c.66-.8 1.1-1.92.98-3.03-.95.04-2.09.63-2.77 1.43-.6.71-1.14 1.84-1 2.93 1.05.08 2.13-.53 2.79-1.33Z" />
            </svg>
            <span className="flex flex-col leading-tight">
              <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Coming soon to
              </span>
              <span className="text-sm text-foreground">iOS</span>
            </span>
          </Link>
          <Link
            href="#cta"
            className="btn-calm inline-flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-2.5 text-left"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-foreground"
              fill="currentColor"
              aria-hidden
            >
              <path d="M3.6 1.8c-.38.38-.6.97-.6 1.74v16.92c0 .77.22 1.36.6 1.74l.1.09 9.48-9.48v-.22L3.7 1.71l-.1.09Zm12.74 12.64-3.16-3.16v-.56l3.16-3.16.07.04 3.74 2.13c1.07.6 1.07 1.6 0 2.21l-3.74 2.13-.07.07Zm-.8.8L5.85 25.15l.24.24c.35.32.88.36 1.48.02l10.99-6.25-2.29-2.23Zm0-10.56 2.29-2.23L7.56 1.44c-.6-.34-1.13-.3-1.48.02L5.84 1.7l10.7 10.97Z" />
            </svg>
            <span className="flex flex-col leading-tight">
              <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Coming soon to
              </span>
              <span className="text-sm text-foreground">Android</span>
            </span>
          </Link>
        </div>

        {/* Bottom bar: social + copyright */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <SocialLink href="#" label="X">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
              </svg>
            </SocialLink>
            <SocialLink href="#" label="LinkedIn">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.04c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.5v6.24ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0Z" />
              </svg>
            </SocialLink>
            <SocialLink href="#" label="YouTube">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.4-1.8.5-3.8.5-5.8s-.1-4-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
              </svg>
            </SocialLink>
            <SocialLink href="#" label="GitHub">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.3.1 2 1.3 2 1.3 1.1 1.9 2.9 1.4 3.7 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.3-.1-.3-.6-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.9 1.3 2 1.3 3.3 0 4.7-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.3v3.4c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
              </svg>
            </SocialLink>
          </div>

          <div className="flex flex-col items-start gap-2 text-[12px] text-muted-foreground sm:flex-row sm:items-center sm:gap-6">
            <p className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              No ads. No data selling. Ever.
            </p>
            <p>© {new Date().getFullYear()} Savlo, Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
    >
      {children}
    </Link>
  )
}
