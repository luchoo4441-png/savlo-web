"use client"

import { cn } from "@/lib/utils"
import { AnimatedNumber } from "./animated-number"

type Props = {
  className?: string
}

/**
 * A calm, editorial dashboard mockup.
 * Inline SVG for the net worth line so it can draw on mount.
 */
export function DashboardMockup({ className }: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-surface/80 p-5 backdrop-blur-sm sm:p-6",
        className,
      )}
    >
      {/* subtle gradient sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklch, var(--primary) 40%, transparent), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklch, var(--accent) 35%, transparent), transparent)",
        }}
      />

      {/* Top bar */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary/70" />
          <span className="text-xs tracking-wide text-muted-foreground">
            Overview · October
          </span>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <Pill label="Accounts" active />
          <Pill label="Flow" />
          <Pill label="Plans" />
        </div>
      </div>

      {/* Net worth block */}
      <div className="relative mt-5 rounded-xl border border-border/70 bg-surface-2/60 p-4 sm:p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Net worth
            </p>
            <p className="mt-2 font-serif text-3xl leading-none tracking-tight sm:text-4xl">
              <AnimatedNumber
                value={184320}
                duration={1800}
                prefix="$"
                decimals={0}
              />
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              <span className="text-primary">+ $2,140</span> this month · calm
              trend
            </p>
          </div>
          <div className="hidden flex-col items-end gap-1 sm:flex">
            <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              12m
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              +11.4%
            </span>
          </div>
        </div>

        <NetWorthChart className="mt-4" />
      </div>

      {/* Lower grid */}
      <div className="relative mt-4 grid grid-cols-1 gap-4 sm:grid-cols-5">
        {/* Cash flow */}
        <div className="rounded-xl border border-border/70 bg-surface-2/60 p-4 sm:col-span-3">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Cash flow
            </p>
            <span className="text-[11px] text-muted-foreground">30 days</span>
          </div>
          <div className="mt-3 flex items-end gap-2 h-20">
            {cashFlow.map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${v}%`,
                  background:
                    i % 5 === 4
                      ? "color-mix(in oklch, var(--accent) 80%, transparent)"
                      : "color-mix(in oklch, var(--primary) 70%, transparent)",
                  opacity: 0.55 + (i / cashFlow.length) * 0.45,
                }}
              />
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>In · $6,820</span>
            <span>Out · $4,310</span>
          </div>
        </div>

        {/* Budget categories */}
        <div className="rounded-xl border border-border/70 bg-surface-2/60 p-4 sm:col-span-2">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Categories
          </p>
          <ul className="mt-3 space-y-3">
            {categories.map((c) => (
              <li key={c.name}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground/90">{c.name}</span>
                  <span className="font-mono text-muted-foreground">
                    ${c.value}
                  </span>
                </div>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-border/60">
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
        </div>
      </div>
    </div>
  )
}

function Pill({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      className={cn(
        "rounded-full border px-3 py-1 text-[11px] transition-colors",
        active
          ? "border-primary/40 bg-primary/10 text-foreground"
          : "border-border text-muted-foreground",
      )}
    >
      {label}
    </span>
  )
}

const cashFlow = [
  28, 36, 30, 42, 48, 38, 46, 52, 44, 58, 62, 54, 66, 60, 72, 68,
]

const categories = [
  { name: "Housing", value: "1,840", pct: 78 },
  { name: "Food & dining", value: "612", pct: 42 },
  { name: "Transport", value: "284", pct: 24, warm: true },
  { name: "Wellness", value: "196", pct: 18 },
]

function NetWorthChart({ className }: { className?: string }) {
  // Smoothed path for a calm curve.
  const path =
    "M0,78 C40,72 70,82 110,70 C150,58 180,64 220,50 C260,36 300,44 340,30 C380,18 420,26 460,14"
  const area = `${path} L460,110 L0,110 Z`

  return (
    <svg
      viewBox="0 0 460 110"
      className={cn("h-24 w-full sm:h-28", className)}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="nw-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="nw-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* soft grid */}
      {[25, 55, 85].map((y) => (
        <line
          key={y}
          x1="0"
          x2="460"
          y1={y}
          y2={y}
          stroke="currentColor"
          className="text-border/60"
          strokeDasharray="2 6"
        />
      ))}

      <path d={area} fill="url(#nw-fill)" opacity="0.55" />

      <path
        d={path}
        fill="none"
        stroke="url(#nw-line)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 900,
          strokeDashoffset: 900,
          animation: "drawLine 1600ms cubic-bezier(0.22,1,0.36,1) 250ms forwards",
          ["--dash" as string]: "900",
        }}
      />

      {/* end dot */}
      <circle
        cx="460"
        cy="14"
        r="3.5"
        fill="var(--primary)"
        className="animate-shimmer"
      />
      <circle cx="460" cy="14" r="1.5" fill="var(--background)" />
    </svg>
  )
}
