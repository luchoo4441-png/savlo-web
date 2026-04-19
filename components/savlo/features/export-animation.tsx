"use client"

import { useMemo } from "react"

const step = (p: number, start: number, end: number) => {
  if (p <= start) return 0
  if (p >= end) return 1
  return (p - start) / (end - start)
}
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

/** Sources that emit particles (expressed in % of stage). */
const SOURCES = [
  { x: 8, y: 22, label: "Balance" },
  { x: 72, y: 14, label: "Categories" },
  { x: 6, y: 72, label: "Cash flow" },
  { x: 76, y: 76, label: "Goals" },
]

const PARTICLE_COUNT = 34

type Particle = {
  srcIdx: number
  ox: number // origin offset within source (%)
  oy: number
  curve: number // lateral curve amount
  delay: number // 0..1 sub-window
  size: number
}

function buildParticles(): Particle[] {
  const rnd = mulberry32(9)
  const arr: Particle[] = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    arr.push({
      srcIdx: i % SOURCES.length,
      ox: (rnd() - 0.5) * 8,
      oy: (rnd() - 0.5) * 6,
      curve: (rnd() - 0.5) * 16,
      delay: rnd() * 0.55,
      size: 1.2 + rnd() * 2.2,
    })
  }
  return arr
}

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const FORMATS = ["CSV", "JSON", "PDF"]
const TARGET_IDX = 0 // CSV auto-selected

export function ExportAnimation({ progress: p }: { progress: number }) {
  // 0.00–0.15  source tiles fade in
  // 0.15–0.55  particles stream from sources to center file
  // 0.40–0.62  format pills appear, CSV auto-selected
  // 0.55–0.82  progress bar fills inside file
  // 0.82–1.00  download arrow + filename caption land

  const tilesIn = easeOut(step(p, 0, 0.15))
  const stream = step(p, 0.15, 0.6) // particle stream lifetime
  const formats = easeOut(step(p, 0.4, 0.62))
  const fill = easeOut(step(p, 0.55, 0.82))
  const done = easeOut(step(p, 0.82, 1))

  const particles = useMemo(buildParticles, [])

  return (
    <div className="relative h-full w-full">
      {/* Source tiles */}
      {SOURCES.map((s, i) => (
        <SourceTile
          key={s.label}
          x={s.x}
          y={s.y}
          label={s.label}
          delay={i * 0.08}
          tilesIn={tilesIn}
          dim={done * 0.7}
        />
      ))}

      {/* Particle stream */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((pt, i) => {
          // Each particle has a sub-window in which it travels.
          const windowStart = pt.delay * 0.8
          const windowEnd = windowStart + 0.35
          const t = easeInOut(step(stream, windowStart, windowEnd))
          if (t <= 0 || t >= 1) return null

          const src = SOURCES[pt.srcIdx]
          const sx = src.x + pt.ox
          const sy = src.y + pt.oy
          const ex = 50
          const ey = 50

          // Quadratic bezier control point — perpendicular to midpoint
          const mx = (sx + ex) / 2
          const my = (sy + ey) / 2
          const dx = ex - sx
          const dy = ey - sy
          const len = Math.sqrt(dx * dx + dy * dy) || 1
          const nx = -dy / len
          const ny = dx / len
          const cx = mx + nx * pt.curve
          const cy = my + ny * pt.curve

          // Quadratic bezier position
          const u = 1 - t
          const x = u * u * sx + 2 * u * t * cx + t * t * ex
          const y = u * u * sy + 2 * u * t * cy + t * t * ey

          const fade = Math.sin(t * Math.PI)
          return (
            <span
              key={i}
              className="absolute rounded-full bg-primary"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${pt.size}px`,
                height: `${pt.size}px`,
                opacity: fade * 0.9,
                boxShadow: `0 0 ${Math.round(pt.size * 3)}px color-mix(in oklch, var(--primary) 60%, transparent)`,
                transform: "translate3d(-50%, -50%, 0)",
              }}
            />
          )
        })}
      </div>

      {/* Center: collecting file */}
      <div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
        style={{
          opacity: 0.3 + tilesIn * 0.7,
        }}
      >
        {/* Rotating ring behind file */}
        <div
          aria-hidden
          className="absolute"
          style={{
            width: 180,
            height: 180,
            top: -30,
            left: -50,
            border: "1px dashed color-mix(in oklch, var(--primary) 30%, transparent)",
            borderRadius: "50%",
            opacity: 0.5 + (stream > 0 && stream < 1 ? 0.3 : 0),
            animation: "slowSpin 18s linear infinite",
          }}
        />

        {/* File icon */}
        <div className="relative h-24 w-20 overflow-hidden rounded-lg border border-border bg-surface-2 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.8)]">
          {/* folded corner */}
          <div className="absolute right-0 top-0 h-3 w-3 border-b border-l border-border bg-surface" />
          <div className="absolute inset-x-2 top-4 h-[2px] rounded-sm bg-border" />
          <div className="absolute inset-x-2 top-7 h-[2px] rounded-sm bg-border" />
          <div className="absolute inset-x-2 top-10 h-[2px] rounded-sm bg-border" />

          {/* Fill from bottom */}
          <div
            className="absolute inset-x-0 bottom-0 overflow-hidden"
            style={{
              height: `${fill * 100}%`,
              background:
                "linear-gradient(to top, color-mix(in oklch, var(--primary) 45%, transparent), color-mix(in oklch, var(--primary) 15%, transparent))",
              transition: "height 140ms linear",
            }}
          >
            {/* Shimmer line at top of fill */}
            <div
              className="absolute inset-x-0 top-0 h-[1px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--primary), transparent)",
                opacity: fill > 0 && fill < 1 ? 0.9 : 0,
              }}
            />
          </div>

          {/* Extension badge */}
          <span
            className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-sm bg-primary px-1.5 py-0.5 text-[8px] font-bold tracking-wider text-primary-foreground"
            style={{
              opacity: formats,
              transform: `translate3d(-50%, ${(1 - formats) * 6}px, 0)`,
            }}
          >
            {FORMATS[TARGET_IDX]}
          </span>
        </div>

        {/* Format selector pills */}
        <div className="mt-5 flex items-center gap-1.5">
          {FORMATS.map((f, i) => {
            const pillIn = easeOut(step(formats, i * 0.15, i * 0.15 + 0.4))
            const isTarget = i === TARGET_IDX
            return (
              <span
                key={f}
                className={[
                  "rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] transition-colors",
                  isTarget && formats > 0.6
                    ? "border-primary/60 bg-primary/15 text-primary"
                    : "border-border bg-surface text-muted-foreground",
                ].join(" ")}
                style={{
                  opacity: pillIn,
                  transform: `translate3d(0, ${(1 - pillIn) * 6}px, 0)`,
                }}
              >
                {f}
              </span>
            )
          })}
        </div>

        {/* Progress bar */}
        <div
          className="mt-4 h-1 w-48 overflow-hidden rounded-full bg-border/70"
          style={{ opacity: fill > 0.02 ? 1 : 0 }}
        >
          <div
            className="h-full rounded-full bg-primary"
            style={{
              width: `${fill * 100}%`,
              transition: "width 140ms linear",
            }}
          />
        </div>

        {/* Download arrow + filename */}
        <div
          className="mt-5 flex items-center gap-2 text-[12px]"
          style={{
            opacity: done,
            transform: `translate3d(0, ${(1 - done) * 10}px, 0)`,
          }}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M12 3v14" />
              <path d="m6 13 6 6 6-6" />
              <path d="M5 21h14" />
            </svg>
          </span>
          <span className="font-mono text-foreground/90">
            savlo-2026-04.csv
          </span>
          <span className="text-muted-foreground">· 184 KB</span>
        </div>
      </div>
    </div>
  )
}

function SourceTile({
  x,
  y,
  label,
  delay,
  tilesIn,
  dim,
}: {
  x: number
  y: number
  label: string
  delay: number
  tilesIn: number
  dim: number
}) {
  const t = easeOut(Math.max(0, Math.min(1, tilesIn - delay * 0.3)))
  return (
    <div
      className="absolute rounded-lg border border-border bg-card/80 p-2.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground backdrop-blur"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate3d(-50%, -50%, 0) scale(${0.9 + t * 0.1})`,
        opacity: t * (1 - dim),
      }}
    >
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        {label}
      </div>
    </div>
  )
}
