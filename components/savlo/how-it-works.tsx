import { Reveal } from "./reveal"

const steps = [
  {
    number: "01",
    title: "Track",
    body: "Connect your accounts once. Savlo quietly gathers every inflow and outflow, and organizes it into a single calm view.",
    icon: TrackIcon,
  },
  {
    number: "02",
    title: "Understand",
    body: "See the shape of your spending over weeks, not minutes. Patterns surface gently — no pop-ups, no nudges, no judgment.",
    icon: UnderstandIcon,
  },
  {
    number: "03",
    title: "Improve",
    body: "Make smaller, steadier changes. Savlo tracks the ones that stick and reflects your progress back without fanfare.",
    icon: ImproveIcon,
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-primary/80">
            How it works
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight text-balance sm:text-4xl">
            Three calm steps. No pressure to perform.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 140}>
              <article className="card-calm group relative h-full overflow-hidden rounded-2xl border border-border bg-surface/70 p-6">
                <div className="flex items-start justify-between">
                  <div className="animate-float-soft">
                    <step.icon />
                  </div>
                  <span className="font-mono text-[11px] tracking-wider text-muted-foreground">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-2xl tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------ Soft "clay" style icons (SVG) ------------ */

function IconShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-border/70"
      style={{
        background:
          "linear-gradient(160deg, color-mix(in oklch, var(--primary) 22%, var(--surface-2)) 0%, var(--surface-2) 60%)",
        boxShadow:
          "inset 0 1px 0 0 color-mix(in oklch, white 18%, transparent), inset 0 -10px 20px -10px color-mix(in oklch, black 40%, transparent)",
      }}
    >
      {children}
    </div>
  )
}

function TrackIcon() {
  return (
    <IconShell>
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3 2" />
      </svg>
    </IconShell>
  )
}

function UnderstandIcon() {
  return (
    <IconShell>
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M4 19V9" />
        <path d="M10 19V5" />
        <path d="M16 19v-7" />
        <path d="M22 19H3" />
      </svg>
    </IconShell>
  )
}

function ImproveIcon() {
  return (
    <IconShell>
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M4 17c3-6 5-6 8-2s5 2 8-6" />
        <path d="M14 9h6v6" />
      </svg>
    </IconShell>
  )
}
