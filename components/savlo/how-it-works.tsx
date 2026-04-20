"use client"

import { useEffect, useRef } from "react"
import { Reveal } from "./reveal"

type Step = {
  number: string
  label: string
  eyebrow: string
  headline: string
  body: string
  Visual: React.ComponentType
}

const steps: Step[] = [
  {
    number: "01",
    label: "STEP 1",
    eyebrow: "CONNECT YOUR PAST",
    headline: "Drop your history in once.",
    body:
      "Savlo quietly reads your spreadsheet, reconciles duplicates and folds years of transactions into a calm timeline.",
    Visual: TrackVisual,
  },
  {
    number: "02",
    label: "STEP 2",
    eyebrow: "SEE THE SHAPE",
    headline: "Patterns surface on their own.",
    body:
      "No pop-ups, no nudges. Open the app and your week has already organised itself into something you can read.",
    Visual: UnderstandVisual,
  },
  {
    number: "03",
    label: "STEP 3",
    eyebrow: "MOVE ONE DIAL",
    headline: "Small changes. Compounded.",
    body:
      "Savlo tracks the swaps that stick and reflects the delta back to you — no streaks, no fire emojis, no guilt.",
    Visual: ImproveVisual,
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <div className="flex items-baseline gap-3">
            <span className="h-px w-10 bg-primary/60" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-primary/80">
              How it works
            </span>
          </div>
          <h2 className="mt-5 font-serif text-4xl font-light leading-[1.05] tracking-tight text-balance sm:text-5xl">
            Three calm steps.{" "}
            <em className="font-normal italic text-primary/90">
              No pressure to perform.
            </em>
          </h2>
        </Reveal>

        {/* 
          Each step uses scroll-driven scaling: the centered step scales up dramatically
          while neighbors shrink — inspired by Superpower's healthgap page.
          We skip Reveal here since it conflicts with ScrollScale's inline styles.
        */}
        <ol className="mt-20 flex flex-col gap-32 sm:gap-40">
          {steps.map((s, i) => (
            <li key={s.number}>
              <ScrollScale index={i}>
                <StepRow step={s} reverse={i === 1} />
              </ScrollScale>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function StepRow({ step, reverse }: { step: Step; reverse?: boolean }) {
  const { Visual, label, eyebrow, headline, body } = step
  return (
    <div
      className={[
        "grid grid-cols-1 items-center gap-8 lg:grid-cols-[110px_minmax(0,1fr)_260px]",
        reverse ? "lg:grid-cols-[260px_minmax(0,1fr)_110px]" : "",
      ].join(" ")}
    >
      {/* Left column — STEP pill (desktop) */}
      <div className={reverse ? "order-3 lg:order-3" : "order-1"}>
        <StepPill label={label} />
      </div>

      {/* Center — framed visual */}
      <div className="order-2">
        <VisualFrame>
          <Visual />
        </VisualFrame>
      </div>

      {/* Right — monospace eyebrow + line */}
      <div
        className={[
          "order-3 lg:order-none",
          reverse ? "lg:order-1 lg:text-left" : "lg:order-3",
        ].join(" ")}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
          {eyebrow}
        </p>
        <p className="mt-3 font-serif text-xl leading-snug tracking-tight text-foreground text-pretty">
          {headline}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
          {body}
        </p>
      </div>
    </div>
  )
}

function StepPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
      {label}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/*                          Framed visual container                           */
/* -------------------------------------------------------------------------- */

function VisualFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Soft ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklch, var(--primary) 10%, transparent), transparent 75%)",
        }}
      />
      {/* The frame */}
      <div
        className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-b from-surface/70 to-surface-2/40 backdrop-blur"
      >
        {children}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                Visuals                                     */
/* -------------------------------------------------------------------------- */

function TrackVisual() {
  return (
    <div className="relative h-full w-full">
      {/* soft grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in oklch, var(--border) 70%, transparent) 1px, transparent 1px)",
          backgroundSize: "100% 28px",
        }}
      />
      {/* spreadsheet → timeline morph */}
      <svg
        viewBox="0 0 640 360"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <linearGradient id="t-flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* left cluster — sheet rows */}
        {Array.from({ length: 7 }).map((_, i) => (
          <g key={i} opacity={0.5 + i * 0.05}>
            <rect
              x={60}
              y={70 + i * 28}
              width={140}
              height={16}
              rx={3}
              fill="color-mix(in oklch, var(--border) 80%, transparent)"
            />
            <rect
              x={210}
              y={70 + i * 28}
              width={60}
              height={16}
              rx={3}
              fill="color-mix(in oklch, var(--primary) 35%, transparent)"
              opacity={0.7 - i * 0.05}
            />
          </g>
        ))}
        {/* flow lines */}
        <path
          d="M 280 110 C 360 120, 380 210, 470 220"
          stroke="url(#t-flow)"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M 280 170 C 360 180, 380 190, 470 200"
          stroke="url(#t-flow)"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M 280 230 C 360 240, 380 230, 470 228"
          stroke="url(#t-flow)"
          strokeWidth="1.2"
          fill="none"
        />
        {/* right cluster — timeline dots */}
        {Array.from({ length: 5 }).map((_, i) => (
          <g key={i}>
            <line
              x1={490}
              y1={100 + i * 40}
              x2={560}
              y2={100 + i * 40}
              stroke="color-mix(in oklch, var(--primary) 55%, transparent)"
              strokeWidth="1.2"
            />
            <circle
              cx={490}
              cy={100 + i * 40}
              r={3}
              fill="var(--primary)"
              opacity={0.85}
            />
          </g>
        ))}
      </svg>

      {/* Floating UI badge */}
      <FloatingPill className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <DotIcon />
        <span className="font-mono text-[11px] tracking-wide">
          Imported 3,240 rows
        </span>
        <span className="mx-1 h-3 w-px bg-border/80" />
        <span className="rounded-full bg-foreground px-2.5 py-1 text-[11px] font-medium text-background">
          Organize
        </span>
      </FloatingPill>
    </div>
  )
}

function UnderstandVisual() {
  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 640 360"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <linearGradient id="u-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* baseline grid */}
        {Array.from({ length: 4 }).map((_, i) => (
          <line
            key={i}
            x1="40"
            x2="600"
            y1={90 + i * 60}
            y2={90 + i * 60}
            stroke="color-mix(in oklch, var(--border) 60%, transparent)"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
        ))}
        {/* ghost curves */}
        <path
          d="M 40 220 C 120 190, 180 230, 240 210 C 320 188, 380 240, 440 200 C 500 160, 560 200, 600 180"
          stroke="color-mix(in oklch, var(--primary) 25%, transparent)"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M 40 260 C 120 230, 180 260, 240 250 C 320 240, 380 280, 440 260 C 500 240, 560 260, 600 240"
          stroke="color-mix(in oklch, var(--primary) 18%, transparent)"
          strokeWidth="1.2"
          fill="none"
        />
        {/* highlighted curve */}
        <path
          d="M 40 240 C 120 190, 180 250, 240 200 C 320 150, 380 260, 440 210 C 500 170, 560 230, 600 190 L 600 340 L 40 340 Z"
          fill="url(#u-fill)"
        />
        <path
          d="M 40 240 C 120 190, 180 250, 240 200 C 320 150, 380 260, 440 210 C 500 170, 560 230, 600 190"
          stroke="var(--primary)"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* week ticks */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1={90 + i * 70}
            x2={90 + i * 70}
            y1={310}
            y2={320}
            stroke="color-mix(in oklch, var(--muted-foreground) 70%, transparent)"
            strokeWidth="1"
          />
        ))}
      </svg>

      <FloatingPill className="left-[58%] top-[28%]">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="font-mono text-[11px] tracking-wide">
          This week · $428
        </span>
      </FloatingPill>
      <FloatingPill className="left-[18%] top-[58%] hidden sm:inline-flex">
        <span className="font-mono text-[11px] tracking-wide text-muted-foreground">
          Eating out trending down
        </span>
      </FloatingPill>
    </div>
  )
}

function ImproveVisual() {
  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 640 360"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {/* left group — before */}
        {[120, 92, 140, 110, 160, 104, 132].map((h, i) => (
          <rect
            key={`b${i}`}
            x={60 + i * 30}
            y={280 - h}
            width={16}
            height={h}
            rx={3}
            fill="color-mix(in oklch, var(--accent) 60%, transparent)"
            opacity={0.65}
          />
        ))}
        {/* divider */}
        <line
          x1="320"
          x2="320"
          y1="70"
          y2="300"
          stroke="color-mix(in oklch, var(--border) 80%, transparent)"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
        {/* right group — after */}
        {[90, 70, 108, 80, 120, 76, 98].map((h, i) => (
          <rect
            key={`a${i}`}
            x={360 + i * 30}
            y={280 - h}
            width={16}
            height={h}
            rx={3}
            fill="color-mix(in oklch, var(--primary) 80%, transparent)"
            opacity={0.85}
          />
        ))}
        {/* delta arrow */}
        <path
          d="M 290 140 C 310 130, 330 130, 350 140"
          stroke="var(--primary)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 346 136 L 352 141 L 346 146"
          stroke="var(--primary)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* axis */}
        <line
          x1="40"
          x2="600"
          y1="300"
          y2="300"
          stroke="color-mix(in oklch, var(--border) 70%, transparent)"
          strokeWidth="1"
        />
        <text
          x="60"
          y="330"
          fill="color-mix(in oklch, var(--muted-foreground) 80%, transparent)"
          style={{ font: "10px ui-monospace, monospace", letterSpacing: "0.12em" }}
        >
          SEP
        </text>
        <text
          x="540"
          y="330"
          fill="color-mix(in oklch, var(--muted-foreground) 80%, transparent)"
          style={{ font: "10px ui-monospace, monospace", letterSpacing: "0.12em" }}
        >
          OCT
        </text>
      </svg>

      <FloatingPill className="left-1/2 top-[18%] -translate-x-1/2">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="font-mono text-[11px] tracking-wide">
          −12% dining
        </span>
      </FloatingPill>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                               Floating pill                                */
/* -------------------------------------------------------------------------- */

function FloatingPill({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={[
        "absolute inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1.5 backdrop-blur shadow-[0_6px_20px_-8px_rgba(0,0,0,0.5)]",
        "animate-float-soft",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </div>
  )
}

function DotIcon() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inset-0 animate-ping rounded-full bg-primary/60" />
      <span className="relative h-2 w-2 rounded-full bg-primary" />
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/*              Scroll-driven focus: current item scales up dramatically,     */
/*              items above/below shrink and fade — like Superpower healthgap */
/* -------------------------------------------------------------------------- */

function ScrollScale({
  children,
  index,
}: {
  children: React.ReactNode
  index: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect users who prefer no motion — render at full focus, no animation.
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    if (reduceMotion) {
      el.style.transform = "scale(1)"
      el.style.opacity = "1"
      return
    }

    // Easing for a calm, editorial feel (ease-out-quart).
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 4)

    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      const itemCenter = rect.top + rect.height / 2
      const viewportCenter = vh / 2

      // Falloff distance — how far from center before the item is fully "at rest".
      // A shorter falloff creates more dramatic focus/blur distinction.
      const falloff = vh * 0.55
      const distance = Math.abs(itemCenter - viewportCenter)
      const raw = 1 - Math.min(distance / falloff, 1) // 1 at center, 0 at/after falloff
      const p = easeOut(raw)

      // DRAMATIC scale range: 0.72 → 1.08 (Superpower-like)
      const scale = 0.72 + p * 0.36
      // Opacity: 0.35 → 1
      const opacity = 0.35 + p * 0.65
      // Slight blur for out-of-focus items
      const blur = (1 - p) * 2

      el.style.transform = `scale(${scale.toFixed(4)})`
      el.style.opacity = opacity.toFixed(4)
      el.style.filter = blur > 0.1 ? `blur(${blur.toFixed(2)}px)` : "none"
    }

    // Use a single RAF loop instead of per-event RAF
    let running = true
    const loop = () => {
      if (!running) return
      update()
      requestAnimationFrame(loop)
    }
    loop()

    return () => {
      running = false
    }
  }, [index])

  return (
    <div
      ref={ref}
      className="scroll-scale-item"
      style={{
        transformOrigin: "center center",
        willChange: "transform, opacity, filter",
      }}
    >
      {children}
    </div>
  )
}
