import { Reveal } from "./reveal"

type Tenet = {
  caption: string
  title: string
  body: string
  Motif: React.ComponentType
}

const tenets: Tenet[] = [
  {
    caption: "NO STREAKS",
    title: "No streaks. No guilt.",
    body:
      "No fire emojis. No red numbers designed to make you anxious. Your money deserves a steadier tone.",
    Motif: EmberMotif,
  },
  {
    caption: "OBSERVE FIRST",
    title: "Observe, then decide.",
    body:
      "Savlo surfaces patterns the way a good notebook would — quietly, and only when you open it.",
    Motif: RippleMotif,
  },
  {
    caption: "COMPOUND SLOWLY",
    title: "Small changes, compounded.",
    body:
      "We celebrate consistency, not willpower. A single mindful swap is worth more than a month of restriction.",
    Motif: SpiralMotif,
  },
  {
    caption: "YOU DECIDE",
    title: "You stay in charge.",
    body:
      "Your categories, your thresholds, your definitions. Savlo is a mirror, not a coach.",
    Motif: ReticleMotif,
  },
]

export function BehavioralSection() {
  return (
    <section id="philosophy" className="relative py-24 sm:py-32">
      {/* ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-[360px] max-w-4xl -translate-y-1/2 opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(500px 240px at 50% 50%, color-mix(in oklch, var(--primary) 16%, transparent), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex items-baseline gap-3">
            <span className="h-px w-10 bg-primary/60" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-primary/80">
              Our philosophy
            </span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]">
            We don&apos;t judge your spending.
            <br />
            <span className="text-primary/90 italic">
              We help you understand it.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Most money apps treat every dollar as a test you&apos;re failing.
            Savlo is built on behavioral finance research: awareness, not
            pressure, is what creates lasting change. So we show you the shape
            of your habits — and then we step back.
          </p>
        </Reveal>

        {/* Bracket-framed motif row */}
        <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
          {tenets.map((t, i) => (
            <Reveal key={t.title} delay={220 + i * 80}>
              <TenetFrame tenet={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function TenetFrame({ tenet }: { tenet: Tenet }) {
  const { Motif, caption, title, body } = tenet
  return (
    <figure className="flex flex-col items-center text-center">
      {/* Bracket-framed motif */}
      <div className="relative w-full max-w-[260px] aspect-square">
        <CornerBrackets />
        <div className="absolute inset-4 flex items-center justify-center">
          <Motif />
        </div>
      </div>

      {/* Monospace caption */}
      <figcaption className="mt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
        {caption}
      </figcaption>

      {/* Thin divider */}
      <span
        aria-hidden
        className="mt-5 block h-px w-12 bg-border"
      />

      {/* Body */}
      <h3 className="mt-5 font-serif text-lg leading-snug tracking-tight text-foreground text-pretty">
        {title}
      </h3>
      <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-muted-foreground text-pretty">
        {body}
      </p>
    </figure>
  )
}

/* -------------------------------------------------------------------------- */
/*                            L-shaped crop brackets                          */
/* -------------------------------------------------------------------------- */

function CornerBrackets() {
  const stroke = "color-mix(in oklch, var(--muted-foreground) 70%, transparent)"
  const common = "absolute h-5 w-5 border-[color:var(--bracket)]"
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ ["--bracket" as string]: stroke }}
    >
      <span className={`${common} left-0 top-0 border-l border-t`} />
      <span className={`${common} right-0 top-0 border-r border-t`} />
      <span className={`${common} left-0 bottom-0 border-l border-b`} />
      <span className={`${common} right-0 bottom-0 border-r border-b`} />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 Motifs                                     */
/* -------------------------------------------------------------------------- */

function MotifSvg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      role="img"
      aria-hidden
    >
      {children}
    </svg>
  )
}

/* "No streaks. No guilt." — a single calm ember with a very soft halo.
   Intentionally NOT a flame. */
function EmberMotif() {
  return (
    <MotifSvg>
      <defs>
        <radialGradient id="ember-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.55" />
          <stop offset="45%" stopColor="var(--primary)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#ember-halo)" />
      {/* faint crossed-out marks suggesting "no" */}
      <g
        stroke="color-mix(in oklch, var(--muted-foreground) 40%, transparent)"
        strokeWidth="1"
        strokeLinecap="round"
      >
        <path d="M 42 100 L 58 100" />
        <path d="M 142 100 L 158 100" />
      </g>
      <circle
        cx="100"
        cy="100"
        r="6"
        fill="var(--primary)"
        opacity="0.9"
      />
      <circle
        cx="100"
        cy="100"
        r="16"
        fill="none"
        stroke="color-mix(in oklch, var(--primary) 50%, transparent)"
        strokeWidth="1"
      />
    </MotifSvg>
  )
}

/* "Observe, then decide." — concentric ripples. */
function RippleMotif() {
  return (
    <MotifSvg>
      {[12, 28, 48, 70, 90].map((r, i) => (
        <circle
          key={r}
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="color-mix(in oklch, var(--primary) 55%, transparent)"
          strokeWidth="1"
          opacity={0.85 - i * 0.15}
        />
      ))}
      <circle cx="100" cy="100" r="4" fill="var(--primary)" />
      {/* subtle horizon line */}
      <line
        x1="10"
        x2="190"
        y1="100"
        y2="100"
        stroke="color-mix(in oklch, var(--border) 70%, transparent)"
        strokeWidth="1"
        strokeDasharray="2 5"
      />
    </MotifSvg>
  )
}

/* "Small changes, compounded." — a logarithmic spiral of growing dots. */
function SpiralMotif() {
  const dots: { cx: number; cy: number; r: number; o: number }[] = []
  const cx = 100
  const cy = 100
  const turns = 2.2
  const total = 18
  for (let i = 0; i < total; i++) {
    const t = i / total
    const angle = t * turns * Math.PI * 2
    const radius = 6 + t * 72
    const x = cx + Math.cos(angle) * radius
    const y = cy + Math.sin(angle) * radius
    dots.push({
      cx: x,
      cy: y,
      r: 1.2 + t * 3.8,
      o: 0.25 + t * 0.75,
    })
  }
  return (
    <MotifSvg>
      {/* spiral trail */}
      <path
        d={(() => {
          let d = ""
          for (let i = 0; i < 120; i++) {
            const t = i / 120
            const angle = t * turns * Math.PI * 2
            const radius = 6 + t * 72
            const x = cx + Math.cos(angle) * radius
            const y = cy + Math.sin(angle) * radius
            d += (i === 0 ? "M " : "L ") + x.toFixed(2) + " " + y.toFixed(2) + " "
          }
          return d
        })()}
        fill="none"
        stroke="color-mix(in oklch, var(--primary) 30%, transparent)"
        strokeWidth="0.8"
      />
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.cx}
          cy={d.cy}
          r={d.r}
          fill="var(--primary)"
          opacity={d.o}
        />
      ))}
    </MotifSvg>
  )
}

/* "You stay in charge." — lens / reticle, Savlo is a mirror. */
function ReticleMotif() {
  return (
    <MotifSvg>
      <circle
        cx="100"
        cy="100"
        r="72"
        fill="none"
        stroke="color-mix(in oklch, var(--primary) 60%, transparent)"
        strokeWidth="1"
      />
      <circle
        cx="100"
        cy="100"
        r="48"
        fill="none"
        stroke="color-mix(in oklch, var(--primary) 40%, transparent)"
        strokeWidth="1"
        strokeDasharray="3 5"
      />
      <circle
        cx="100"
        cy="100"
        r="10"
        fill="color-mix(in oklch, var(--primary) 20%, transparent)"
        stroke="var(--primary)"
        strokeWidth="1"
      />
      {/* cross */}
      <line
        x1="100"
        x2="100"
        y1="16"
        y2="40"
        stroke="color-mix(in oklch, var(--muted-foreground) 80%, transparent)"
        strokeWidth="1"
      />
      <line
        x1="100"
        x2="100"
        y1="160"
        y2="184"
        stroke="color-mix(in oklch, var(--muted-foreground) 80%, transparent)"
        strokeWidth="1"
      />
      <line
        x1="16"
        x2="40"
        y1="100"
        y2="100"
        stroke="color-mix(in oklch, var(--muted-foreground) 80%, transparent)"
        strokeWidth="1"
      />
      <line
        x1="160"
        x2="184"
        y1="100"
        y2="100"
        stroke="color-mix(in oklch, var(--muted-foreground) 80%, transparent)"
        strokeWidth="1"
      />
      {/* center dot */}
      <circle cx="100" cy="100" r="2.5" fill="var(--primary)" />
    </MotifSvg>
  )
}
