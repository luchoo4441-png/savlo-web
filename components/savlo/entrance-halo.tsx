"use client"

import { useMemo } from "react"

/**
 * Savlo entrance — "un respiro".
 *
 * Roughly ~180 dots assemble from scattered positions into a soft halo
 * that gently breathes behind the phones. Represents the app's core
 * mechanic: a one-minute evening check-in, a single calm breath.
 *
 * Character of the animation:
 * 1. Dots start scattered in random +/-120px offsets, blurred, at scale 0.3
 * 2. Each dot eases into its radial position on the halo with a delay keyed to its angle
 * 3. Once the ring settles, the whole halo gently pulses (calmBreath, 4.5s)
 * 4. Small accent dots drift outside the halo like slow embers
 *
 * GPU-friendly: pure transforms + opacity. ~180 elements total, zero RAF loop.
 */

type Dot = {
  angle: number
  radius: number
  size: number
  opacity: number
  sx: number
  sy: number
  delay: number
  glow: boolean
}

const MAIN_COUNT = 132
const EMBER_COUNT = 26

function buildHaloDots(seed = 11): { main: Dot[]; embers: Dot[] } {
  // Tiny deterministic PRNG so SSR & CSR match
  let s = seed
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }

  const main: Dot[] = []
  for (let i = 0; i < MAIN_COUNT; i++) {
    const t = i / MAIN_COUNT
    const angle = t * Math.PI * 2
    // Slight radius jitter keeps it organic (not a perfect circle)
    const jitter = (rand() - 0.5) * 10
    const radius = 235 + jitter

    // Size & opacity wave so the ring looks alive — two soft "swells"
    const wave = 0.5 + 0.5 * Math.sin(angle * 2 + 1.2)
    const size = 1.4 + wave * 2.6
    const opacity = 0.25 + wave * 0.55

    // Scatter origin
    const sx = (rand() - 0.5) * 260
    const sy = (rand() - 0.5) * 180

    // Delay keyed to angle → dots sweep around the circle as they land
    const angleT = (angle / (Math.PI * 2) + 0.25) % 1 // start at top
    const delay = 200 + angleT * 1600 + (rand() * 180)

    main.push({
      angle,
      radius,
      size,
      opacity,
      sx,
      sy,
      delay,
      glow: wave > 0.78,
    })
  }

  // Embers: a handful of larger, slower dots outside the halo
  const embers: Dot[] = []
  for (let i = 0; i < EMBER_COUNT; i++) {
    const angle = rand() * Math.PI * 2
    const radius = 290 + rand() * 110
    const size = 1.6 + rand() * 2.2
    const opacity = 0.18 + rand() * 0.25
    const sx = (rand() - 0.5) * 140
    const sy = (rand() - 0.5) * 140
    const delay = 1400 + rand() * 1400
    embers.push({
      angle,
      radius,
      size,
      opacity,
      sx,
      sy,
      delay,
      glow: false,
    })
  }

  return { main, embers }
}

export function EntranceHalo() {
  const { main, embers } = useMemo(() => buildHaloDots(), [])

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      style={{
        // The halo should feel centered on the phones cluster, not the whole section
        maskImage:
          "radial-gradient(circle at 50% 45%, black 0%, black 55%, transparent 85%)",
        WebkitMaskImage:
          "radial-gradient(circle at 50% 45%, black 0%, black 55%, transparent 85%)",
      }}
    >
      {/* Breathing wrapper: subtle 4.5s scale pulse after assembly */}
      <div
        className="relative h-[560px] w-[560px]"
        style={{
          animation:
            "calmBreath 4800ms cubic-bezier(0.4, 0, 0.4, 1) 2400ms infinite",
        }}
      >
        {/* Soft aqua glow core */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklch, var(--primary) 10%, transparent), transparent 72%)",
            opacity: 0,
            animation: "fadeIn 1600ms ease-out 600ms forwards",
          }}
        />

        {/* Main ring */}
        {main.map((d, i) => {
          const x = Math.cos(d.angle) * d.radius
          const y = Math.sin(d.angle) * d.radius
          return (
            <span
              key={`m-${i}`}
              className="absolute left-1/2 top-1/2 rounded-full bg-primary"
              style={{
                width: `${d.size}px`,
                height: `${d.size}px`,
                marginLeft: `${x - d.size / 2}px`,
                marginTop: `${y - d.size / 2}px`,
                ["--dot-o" as string]: d.opacity.toFixed(3),
                ["--sx" as string]: `${d.sx}px`,
                ["--sy" as string]: `${d.sy}px`,
                opacity: 0,
                willChange: "transform, opacity",
                boxShadow: d.glow
                  ? `0 0 ${Math.round(d.size * 3)}px color-mix(in oklch, var(--primary) 55%, transparent)`
                  : undefined,
                animation: `haloAssemble 1400ms cubic-bezier(0.22, 1, 0.36, 1) ${d.delay}ms both`,
              }}
            />
          )
        })}

        {/* Outer embers — accent color, slow */}
        {embers.map((d, i) => {
          const x = Math.cos(d.angle) * d.radius
          const y = Math.sin(d.angle) * d.radius
          return (
            <span
              key={`e-${i}`}
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: `${d.size}px`,
                height: `${d.size}px`,
                marginLeft: `${x - d.size / 2}px`,
                marginTop: `${y - d.size / 2}px`,
                background:
                  i % 3 === 0
                    ? "color-mix(in oklch, var(--warning) 75%, transparent)"
                    : "color-mix(in oklch, var(--primary) 60%, transparent)",
                ["--dot-o" as string]: d.opacity.toFixed(3),
                ["--sx" as string]: `${d.sx}px`,
                ["--sy" as string]: `${d.sy}px`,
                opacity: 0,
                willChange: "transform, opacity",
                animation: `haloAssemble 1800ms cubic-bezier(0.22, 1, 0.36, 1) ${d.delay}ms both`,
              }}
            />
          )
        })}

        {/* Horizon pulse — a thin dotted line across the halo diameter */}
        <div
          className="absolute left-1/2 top-1/2 h-px w-[520px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklch, var(--primary) 30%, transparent) 40%, color-mix(in oklch, var(--primary) 45%, transparent) 50%, color-mix(in oklch, var(--primary) 30%, transparent) 60%, transparent)",
            maskImage:
              "repeating-linear-gradient(90deg, black 0 3px, transparent 3px 8px)",
            WebkitMaskImage:
              "repeating-linear-gradient(90deg, black 0 3px, transparent 3px 8px)",
            opacity: 0,
            animation: "fadeIn 2400ms ease-out 2200ms forwards",
          }}
        />
      </div>
    </div>
  )
}
