"use client"

import { useEffect, useRef, useState } from "react"
import { Reveal } from "./reveal"
import { ImportAnimation } from "./features/import-animation"
import { VoiceAnimation } from "./features/voice-animation"
import { ExportAnimation } from "./features/export-animation"

type FeatureId = "import" | "voice" | "export"

const FEATURES: {
  id: FeatureId
  label: string
  kicker: string
  title: string
  description: string
}[] = [
  {
    id: "import",
    label: "Import history",
    kicker: "From spreadsheet to story",
    title: "Drop your Excel. Keep your past.",
    description:
      "Pull years of transactions from a single .xlsx or .csv. Savlo reads your columns, reconciles duplicates, and folds a silent spreadsheet into your timeline — so your check-ins start with real history, not day one.",
  },
  {
    id: "voice",
    label: "Daily check-in",
    kicker: "One minute a night",
    title: "Speak it. Savlo hears the day.",
    description:
      "Tap the mic and tell savlo how your day went — in your own words, in your own language. savlo IA extracts amount, merchant and category, saves the expense, and returns a small micro-plan for tomorrow.",
  },
  {
    id: "export",
    label: "Export",
    kicker: "Your data belongs to you",
    title: "Ready to leave, always.",
    description:
      "Export every check-in, every fondo, every note — to CSV, JSON or PDF in one gesture. No lock-in, no dark patterns. Savlo is a companion, not a cage.",
  },
]

const CYCLE_MS = 8500
const HOLD_MS = 900

export function FeaturesShowcase() {
  const [active, setActive] = useState<FeatureId>("import")
  const [progress, setProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Driver state kept in a ref so the rAF loop doesn't rebuild on every tick
  const driverRef = useRef({
    active: 0,
    progress: 0,
    hold: 0,
    visible: false,
    reduced: false,
  })

  // Reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => {
      driverRef.current.reduced = mq.matches
      if (mq.matches) {
        driverRef.current.progress = 1
        setProgress(1)
      }
    }
    apply()
    mq.addEventListener?.("change", apply)
    return () => mq.removeEventListener?.("change", apply)
  }, [])

  // Visibility
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        driverRef.current.visible = entry.isIntersecting
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // rAF loop
  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = now - last
      last = now
      const s = driverRef.current
      if (s.visible && !s.reduced) {
        if (s.hold > 0) {
          s.hold -= dt
          if (s.hold <= 0) {
            s.active = (s.active + 1) % FEATURES.length
            s.progress = 0
            setActive(FEATURES[s.active].id)
            setProgress(0)
          }
        } else {
          s.progress += dt / CYCLE_MS
          if (s.progress >= 1) {
            s.progress = 1
            s.hold = HOLD_MS
          }
          setProgress(s.progress)
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const selectTab = (id: FeatureId) => {
    const idx = FEATURES.findIndex((f) => f.id === id)
    driverRef.current.active = idx
    driverRef.current.progress = 0
    driverRef.current.hold = 0
    setActive(id)
    setProgress(0)
  }

  const current = FEATURES.find((f) => f.id === active)!

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative px-6 py-28 sm:py-36"
    >
      {/* Section chrome */}
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-baseline gap-3">
            <span className="h-px w-10 bg-primary/60" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-primary/80">
              What Savlo does
            </span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-5 max-w-3xl font-serif text-4xl font-light leading-[1.02] tracking-[-0.02em] text-balance sm:text-5xl lg:text-6xl">
            Three gestures.{" "}
            <em className="font-normal italic text-primary/90">
              One quiet ledger.
            </em>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            Import what already exists. Speak what happens next. Take it all
            with you whenever you want.
          </p>
        </Reveal>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Feature showcase"
          className="mt-12 flex flex-wrap items-center gap-2 sm:gap-3"
        >
          {FEATURES.map((f, i) => {
            const isActive = active === f.id
            const tabProgress = isActive ? progress : 0
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => selectTab(f.id)}
                className={[
                  "group relative overflow-hidden rounded-full border px-4 py-2 text-left text-sm transition-colors",
                  isActive
                    ? "border-primary/40 bg-primary/10 text-foreground"
                    : "border-border bg-surface/60 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                ].join(" ")}
              >
                {/* Progress fill under the label */}
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-primary"
                    style={{
                      transform: `scaleX(${tabProgress})`,
                      transformOrigin: "left center",
                      transition: "transform 60ms linear",
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span className="flex h-4 w-4 items-center justify-center text-[10px] font-medium text-muted-foreground">
                    0{i + 1}
                  </span>
                  <span>{f.label}</span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Two-column: stage + description */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Stage */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-surface/60 to-surface-2/40 backdrop-blur">
            {/* Ambient glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(600px 300px at 50% 40%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 70%)",
              }}
            />
            {/* Soft grid */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(color-mix(in oklch, var(--border) 50%, transparent) 1px, transparent 1px)",
                backgroundSize: "100% 32px",
              }}
            />

            <div className="relative h-[440px] w-full px-6 py-8 sm:h-[480px] sm:px-10 sm:py-10">
              {active === "import" && <ImportAnimation progress={progress} />}
              {active === "voice" && <VoiceAnimation progress={progress} />}
              {active === "export" && <ExportAnimation progress={progress} />}
            </div>

            {/* Caption */}
            <div className="relative flex items-center justify-between border-t border-border/60 px-6 py-3 text-[11px] text-muted-foreground sm:px-10">
              <span className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-primary/60" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                {current.kicker}
              </span>
              <span className="font-mono uppercase tracking-[0.14em]">
                {String(FEATURES.findIndex((f) => f.id === active) + 1).padStart(
                  2,
                  "0",
                )}
                {" / "}
                {String(FEATURES.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Description panel — swaps with active feature */}
          <div className="flex flex-col justify-center">
            <div
              key={active /* remount → replays enter animation */}
              className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur"
              style={{
                opacity: 0,
                animation:
                  "fadeUp 650ms cubic-bezier(0.22, 1, 0.36, 1) 80ms forwards",
              }}
            >
              <span className="text-[11px] uppercase tracking-[0.22em] text-primary/80">
                {String(FEATURES.findIndex((f) => f.id === active) + 1).padStart(
                  2,
                  "0",
                )}
              </span>
              <h3 className="mt-3 font-serif text-2xl font-light leading-tight text-balance">
                {current.title}
              </h3>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
                {current.description}
              </p>

              <div className="mt-6 flex items-center gap-1.5">
                {FEATURES.map((f) => (
                  <button
                    key={f.id}
                    aria-label={`Show ${f.label}`}
                    onClick={() => selectTab(f.id)}
                    className="group flex h-6 items-center px-1"
                  >
                    <span
                      className={[
                        "h-1.5 rounded-full transition-all",
                        f.id === active
                          ? "w-6 bg-primary"
                          : "w-1.5 bg-border group-hover:bg-muted-foreground",
                      ].join(" ")}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
