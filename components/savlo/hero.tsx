"use client"

import { EntranceHalo } from "./entrance-halo"
import { PhonePair } from "./phone-pair"
import { AppStoreBadge, GooglePlayBadge } from "./store-badges"

/**
 * Hero — mobile-product focused layout, Cal AI-inspired.
 *
 * Left column: brand pill, editorial headline, short product description,
 *   App Store + Google Play badges.
 * Right column: two tilted phones with floating callout pills and a
 *   hand-drawn arrow illustrating the flow: voice check-in -> insight.
 *
 * The entrance animation ("un respiro") is an assembling dotted halo
 * behind the phones that settles into a slow 4.5s breath — a literal
 * nod to Savlo's mechanic of a one-minute evening check-in.
 */

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-28 pb-24 sm:pt-32 sm:pb-28"
    >
      {/* Ambient background wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 960px 520px at 62% 42%, color-mix(in oklch, var(--primary) 6%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
          {/* Left column: copy */}
          <div className="relative z-10 lg:col-span-5">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/80 px-3 py-1.5 text-[11px] tracking-wide text-muted-foreground backdrop-blur"
              style={{
                opacity: 0,
                animation: "fadeUp 900ms ease-out 200ms forwards",
              }}
            >
              <span
                aria-hidden
                className="relative flex h-1.5 w-1.5"
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-primary/50" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Finanzas conductuales · Modo calma
            </div>

            <h1
              className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight text-foreground text-balance sm:text-6xl lg:text-[68px]"
              style={{
                opacity: 0,
                animation: "fadeUp 1000ms ease-out 350ms forwards",
              }}
            >
              Conoce Savlo.{" "}
              <span className="block">
                Entiende tu dinero{" "}
                <em className="font-normal italic text-primary/90">
                  en un minuto
                </em>{" "}
                al día.
              </span>
            </h1>

            <p
              className="mt-5 max-w-[440px] text-pretty text-[15px] leading-relaxed text-muted-foreground"
              style={{
                opacity: 0,
                animation: "fadeUp 1000ms ease-out 520ms forwards",
              }}
            >
              La app de finanzas diseñada para mentes ansiosas. Un check-in por
              voz cada noche, una micro-guía para mañana. Sin rachas, sin
              presión, sin juicio — sólo calma.
            </p>

            <div
              className="mt-7 flex flex-wrap items-center gap-3"
              style={{
                opacity: 0,
                animation: "fadeUp 1000ms ease-out 680ms forwards",
              }}
            >
              <AppStoreBadge />
              <GooglePlayBadge />
            </div>

            <p
              className="mt-5 text-[12px] text-muted-foreground/80"
              style={{
                opacity: 0,
                animation: "fadeIn 1400ms ease-out 1000ms forwards",
              }}
            >
              Próximamente en iOS y Android · Español de España.
            </p>
          </div>

          {/* Right column: phones + halo */}
          <div className="relative lg:col-span-7">
            <EntranceHalo />
            <div className="relative z-10">
              <PhonePair />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
