"use client"

import { useMemo } from "react"

/**
 * Antimetal-inspired halftone arcs that flank the hero.
 * Two vertical dot arcs that bulge outward at the middle.
 * Each dot reveals with a radial stagger — middle first,
 * ends last — producing a calm "breathing in" entrance.
 */

type Dot = {
  top: number // % down the container
  offset: number // px inward from outer edge
  size: number // px
  opacity: number // target opacity after entrance
  delay: number // ms
  glow: boolean
}

const DOT_COUNT = 96

function buildArcDots(): Dot[] {
  const dots: Dot[] = []
  for (let i = 0; i < DOT_COUNT; i++) {
    const t = i / (DOT_COUNT - 1) // 0..1
    // Arc covers about -78° to +78° of a notional ellipse
    const angle = (t - 0.5) * Math.PI * 0.86
    const bulge = Math.cos(angle) // 0 at ends, 1 at middle

    // Slightly eased vertical distribution — denser through the center
    const easedT = 0.5 + 0.5 * Math.sin((t - 0.5) * Math.PI)
    const top = 3 + easedT * 94

    // When bulge = 1 (middle), dot sits furthest inward in its container
    // → i.e. closest to the OUTER screen edge → farthest from center.
    // offset is measured from outer edge, so middle dots have HIGH offset.
    const offset = 18 + bulge * 196

    // Size pulses through the middle of the arc
    const size = 0.9 + bulge * 4.8

    // Opacity rises toward the middle of the arc
    const opacity = Math.min(1, 0.12 + bulge * 1.0)

    // Radial reveal — middle dots land first
    const distFromMid = Math.abs(t - 0.5)
    const delay = distFromMid * 1500 + (i % 3) * 20

    dots.push({
      top,
      offset,
      size,
      opacity,
      delay,
      glow: bulge > 0.75,
    })
  }
  return dots
}

export function HeroArcs() {
  const dots = useMemo(buildArcDots, [])
  return (
    <>
      <Arc side="left" dots={dots} />
      <Arc side="right" dots={dots} />
    </>
  )
}

function Arc({ side, dots }: { side: "left" | "right"; dots: Dot[] }) {
  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none absolute inset-y-0 z-[1] hidden sm:block",
        "w-[240px] lg:w-[300px]",
        side === "left" ? "left-0" : "right-0",
      ].join(" ")}
    >
      {/* Soft halo glow behind the arc */}
      <div
        className="absolute inset-0"
        style={{
          background:
            side === "left"
              ? "radial-gradient(260px 500px at 80% 50%, color-mix(in oklch, var(--primary) 8%, transparent), transparent 70%)"
              : "radial-gradient(260px 500px at 20% 50%, color-mix(in oklch, var(--primary) 8%, transparent), transparent 70%)",
          opacity: 0,
          animation: "fadeIn 1800ms ease-out 400ms forwards",
        }}
      />

      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-primary"
          style={{
            top: `${d.top}%`,
            [side === "left" ? "left" : "right"]: `${d.offset}px`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            ["--dot-o" as string]: d.opacity.toFixed(3),
            opacity: 0,
            willChange: "transform, opacity",
            boxShadow: d.glow
              ? `0 0 ${Math.round(d.size * 2)}px color-mix(in oklch, var(--primary) 55%, transparent)`
              : undefined,
            animation: `dotIn 1200ms cubic-bezier(0.22, 1, 0.36, 1) ${d.delay}ms both`,
          }}
        />
      ))}
    </div>
  )
}
