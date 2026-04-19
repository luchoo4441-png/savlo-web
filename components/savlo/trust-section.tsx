import { Reveal } from "./reveal"

const principles = [
  {
    title: "No ads. Not now, not ever.",
    body: "Savlo is funded by members, not advertisers. Your attention isn't a product we sell.",
  },
  {
    title: "We never sell your data.",
    body: "Your transactions stay yours. We don't broker, resell, or monetize your financial history — in any form.",
  },
  {
    title: "Bank-grade encryption.",
    body: "256-bit AES at rest. TLS 1.3 in transit. Read-only connections through trusted aggregators.",
  },
]

export function TrustSection() {
  return (
    <section id="trust" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.18em] text-primary/80">
              Trust, by default
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight text-balance sm:text-4xl">
              Built quietly, with the boring parts done right.
            </h2>
            <p className="mt-4 max-w-md text-pretty text-muted-foreground">
              A calm tone is only worth something if the plumbing is solid.
              Here&apos;s what we mean when we ask you to trust us.
            </p>

            <div className="mt-8 grid max-w-md grid-cols-3 gap-6 border-t border-border/60 pt-6 text-sm">
              <Metric label="Uptime" value="99.98%" />
              <Metric label="Audits" value="SOC 2 II" />
              <Metric label="Team" value="Ex‑Stripe" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 lg:col-span-7">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 120}>
                <article className="card-calm relative overflow-hidden rounded-2xl border border-border bg-surface/70 p-6">
                  <div className="flex items-start gap-4">
                    <ShieldGlyph />
                    <div>
                      <h3 className="font-serif text-xl tracking-tight">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-serif text-lg tracking-tight">{value}</p>
    </div>
  )
}

function ShieldGlyph() {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/70"
      style={{
        background:
          "linear-gradient(160deg, color-mix(in oklch, var(--primary) 22%, var(--surface-2)) 0%, var(--surface-2) 60%)",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    </span>
  )
}
