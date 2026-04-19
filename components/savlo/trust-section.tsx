"use client"

import { useState } from "react"
import { Reveal } from "./reveal"

const principles = [
  {
    title: "No ads. Not now, not ever.",
    body: "Savlo is funded by members, not advertisers. Your attention isn't a product we sell.",
    color: "from-blue-500/20 to-cyan-500/10",
  },
  {
    title: "We never sell your data.",
    body: "Your transactions stay yours. We don't broker, resell, or monetize your financial history — in any form.",
    color: "from-emerald-500/20 to-teal-500/10",
  },
  {
    title: "Bank-grade encryption.",
    body: "256-bit AES at rest. TLS 1.3 in transit. Read-only connections through trusted aggregators.",
    color: "from-violet-500/20 to-purple-500/10",
  },
]

export function TrustSection() {
  return (
    <section id="trust" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Intro block: title, desc, stats */}
        <Reveal>
          <div className="mb-16 text-center sm:mb-20">
            <p className="text-xs uppercase tracking-[0.18em] text-primary/80">
              Trust, by default
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-balance sm:text-4xl">
              Built quietly, with the boring parts done right.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
              A calm tone is only worth something if the plumbing is solid.
              Here&apos;s what we mean when we ask you to trust us.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 border-t border-border/40 pt-8 text-sm sm:gap-12">
              <Metric label="Uptime" value="99.98%" />
              <Metric label="Audits" value="SOC 2 II" />
              <Metric label="Team" value="Ex‑Stripe" />
            </div>
          </div>
        </Reveal>

        {/* Pro UI: 3-column grid of principles with glassmorphism + animations */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {principles.map((p, i) => (
            <PrincipleCard key={p.title} principle={p} index={i} />
          ))}
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

/* -------------------------------------------------------------------------- */
/*  Pro UI Card: glassmorphism, animated gradient, interactive hover/reveal   */
/* -------------------------------------------------------------------------- */

function PrincipleCard({
  principle,
  index,
}: {
  principle: (typeof principles)[0]
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Reveal delay={index * 100}>
      <div
        className="group relative overflow-hidden rounded-2xl transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          animationDelay: `${index * 80}ms`,
        }}
      >
        {/* Animated gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${principle.color} transition-all duration-500`}
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)",
            opacity: isHovered ? 0.8 : 0.5,
          }}
        />

        {/* Animated accent glow */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: isHovered
              ? "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1), transparent 70%)"
              : "transparent",
          }}
        />

        {/* Border with animated glow */}
        <div
          className="absolute inset-0 rounded-2xl border border-border/40 transition-all duration-500"
          style={{
            borderColor: isHovered
              ? "rgba(var(--primary-rgb), 0.3)"
              : "rgb(var(--border))",
          }}
        />

        {/* Glassmorphic content */}
        <div className="relative z-10 flex h-full flex-col gap-4 border-b border-border/20 bg-gradient-to-b from-white/[0.02] to-white/[0.005] p-6 backdrop-blur-md">
          {/* Icon area with animated shield */}
          <div className="flex items-start justify-between">
            <AnimatedShieldIcon index={index} hovered={isHovered} />
            <div
              className="h-8 w-8 rounded-full border border-border/30 transition-all duration-500"
              style={{
                background: isHovered
                  ? "rgba(var(--primary-rgb), 0.15)"
                  : "transparent",
                transform: isHovered ? "scale(1.2) rotate(45deg)" : "scale(1)",
              }}
            />
          </div>

          {/* Title — always visible */}
          <h3 className="font-serif text-lg leading-tight tracking-tight transition-colors duration-500 group-hover:text-primary">
            {principle.title}
          </h3>

          {/* Description — fades in on hover with reveal */}
          <p
            className="text-sm leading-relaxed text-muted-foreground transition-all duration-500"
            style={{
              opacity: isHovered ? 1 : 0.6,
              transform: isHovered ? "translateY(0)" : "translateY(2px)",
            }}
          >
            {principle.body}
          </p>

          {/* Hover indicator dot */}
          <div
            className="mt-2 h-1 w-6 rounded-full bg-primary transition-all duration-500"
            style={{
              opacity: isHovered ? 1 : 0.3,
              width: isHovered ? "12px" : "6px",
            }}
          />
        </div>
      </div>
    </Reveal>
  )
}

/* Animated shield icon with rotating elements */
function AnimatedShieldIcon({
  index,
  hovered,
}: {
  index: number
  hovered: boolean
}) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center">
      {/* Rotating outer ring */}
      <div
        className="absolute inset-0 rounded-full border border-primary/40"
        style={{
          animation: hovered
            ? `spin 3s linear infinite`
            : `spin 6s linear infinite`,
        }}
      />

      {/* Inner shield */}
      <div
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/70 transition-all duration-500"
        style={{
          background: hovered
            ? "linear-gradient(160deg, rgba(var(--primary-rgb), 0.25), rgba(var(--surface-2), 0.15))"
            : "linear-gradient(160deg, rgba(var(--primary-rgb), 0.12), rgba(var(--surface-2), 0.08))",
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6l-8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}


