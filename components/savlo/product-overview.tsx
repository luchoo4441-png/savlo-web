import { AnimatedNumber } from "./animated-number"
import { Reveal } from "./reveal"

export function ProductOverview() {
  return (
    <section id="product" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-primary/80">
            Your week, gently summarized
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight text-balance sm:text-4xl">
            Not a dashboard.{" "}
            <em className="font-normal italic text-primary/90">
              A reflection.
            </em>
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
            Savlo reads your week and returns it to you softly — spending shape,
            fondos progress, a category or two worth noticing. Observed, never
            judged.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Net worth card */}
          <Reveal delay={80} className="md:col-span-1">
            <article className="card-calm group relative h-full overflow-hidden rounded-2xl border border-border bg-surface/70 p-6">
              <header className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Net worth
                </p>
                <span className="text-[11px] text-muted-foreground">12m</span>
              </header>
              <p className="mt-4 font-serif text-4xl tracking-tight">
                <AnimatedNumber value={184320} prefix="$" duration={1800} />
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                <span className="text-primary">+11.4%</span> over the year
              </p>

              <MiniWave className="mt-8" />

              <p className="mt-6 text-sm text-muted-foreground">
                A single, honest line. No green-arrow theatrics — just the shape
                of your progress.
              </p>
            </article>
          </Reveal>

          {/* Cash flow timeline */}
          <Reveal delay={160} className="md:col-span-2">
            <article className="card-calm relative h-full overflow-hidden rounded-2xl border border-border bg-surface/70 p-6">
              <header className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Cash flow · last 8 weeks
                  </p>
                  <p className="mt-1 font-serif text-2xl tracking-tight">
                    $2,510 <span className="text-muted-foreground">net</span>
                  </p>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <LegendDot color="primary" label="In" />
                  <LegendDot color="accent" label="Out" />
                </div>
              </header>

              <CashFlowBars className="mt-6" />

              <footer className="mt-5 grid grid-cols-3 gap-4 border-t border-border/60 pt-4 text-sm">
                <FooterStat label="Income" value="$6,820" tone="primary" />
                <FooterStat label="Spending" value="$4,310" tone="accent" />
                <FooterStat label="Saved" value="$2,510" tone="muted" />
              </footer>
            </article>
          </Reveal>

          {/* Categories */}
          <Reveal delay={240} className="md:col-span-3">
            <article className="card-calm relative h-full overflow-hidden rounded-2xl border border-border bg-surface/70 p-6">
              <header className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Budget categories
                  </p>
                  <p className="mt-1 font-serif text-2xl tracking-tight">
                    Where it actually went
                  </p>
                </div>
                <span className="rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground">
                  October · observed, not judged
                </span>
              </header>

              <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((c) => (
                  <li
                    key={c.name}
                    className="rounded-xl border border-border/70 bg-surface-2/50 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground/90">
                        {c.name}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {c.pct}%
                      </span>
                    </div>
                    <p className="mt-2 font-serif text-xl tracking-tight">
                      <AnimatedNumber
                        value={c.amount}
                        prefix="$"
                        duration={1400}
                      />
                    </p>
                    <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border/60">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${c.pct}%`,
                          background: c.warm
                            ? "color-mix(in oklch, var(--accent) 80%, transparent)"
                            : "color-mix(in oklch, var(--primary) 85%, transparent)",
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function FooterStat({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: "primary" | "accent" | "muted"
}) {
  const color =
    tone === "primary"
      ? "text-primary"
      : tone === "accent"
        ? "text-accent"
        : "text-foreground"
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className={`mt-1 font-serif text-lg ${color}`}>{value}</p>
    </div>
  )
}

function LegendDot({
  color,
  label,
}: {
  color: "primary" | "accent"
  label: string
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          color === "primary" ? "bg-primary" : "bg-accent"
        }`}
      />
      {label}
    </span>
  )
}

function MiniWave({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 80"
      className={`h-20 w-full ${className ?? ""}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="mini-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,58 C40,52 70,62 110,48 C150,34 180,42 220,30 C260,18 300,24 320,14 L320,80 L0,80 Z"
        fill="url(#mini-fill)"
        opacity="0.7"
      />
      <path
        d="M0,58 C40,52 70,62 110,48 C150,34 180,42 220,30 C260,18 300,24 320,14"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          strokeDasharray: 700,
          strokeDashoffset: 700,
          animation:
            "drawLine 1600ms cubic-bezier(0.22,1,0.36,1) 300ms forwards",
          ["--dash" as string]: "700",
        }}
      />
    </svg>
  )
}

function CashFlowBars({ className }: { className?: string }) {
  return (
    <div className={`flex items-end gap-2 h-28 ${className ?? ""}`}>
      {bars.map((b, i) => (
        <div key={i} className="flex flex-1 flex-col items-stretch gap-1.5">
          <div
            className="rounded-sm"
            style={{
              height: `${b.in}%`,
              background:
                "color-mix(in oklch, var(--primary) 70%, transparent)",
              opacity: 0.55 + (i / bars.length) * 0.4,
            }}
          />
          <div
            className="rounded-sm"
            style={{
              height: `${b.out}%`,
              background:
                "color-mix(in oklch, var(--accent) 72%, transparent)",
              opacity: 0.5 + (i / bars.length) * 0.4,
            }}
          />
        </div>
      ))}
    </div>
  )
}

const bars = [
  { in: 38, out: 22 },
  { in: 44, out: 28 },
  { in: 32, out: 20 },
  { in: 52, out: 30 },
  { in: 46, out: 26 },
  { in: 60, out: 34 },
  { in: 54, out: 30 },
  { in: 66, out: 36 },
]

const categories = [
  { name: "Housing", amount: 1840, pct: 42 },
  { name: "Food & dining", amount: 612, pct: 14, warm: true },
  { name: "Transport", amount: 284, pct: 7 },
  { name: "Wellness", amount: 196, pct: 5 },
]
