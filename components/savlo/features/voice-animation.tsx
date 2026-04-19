"use client"

import { useMemo } from "react"

const step = (p: number, start: number, end: number) => {
  if (p <= start) return 0
  if (p >= end) return 1
  return (p - start) / (end - start)
}
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

const TRANSCRIPT = "Cinco cincuenta en un café con leche"
// Parsed tokens — Savlo is a Spanish-first app
const TOKENS = [
  { label: "5,50 €", kind: "amount" as const, color: "text-foreground" },
  { label: "Café", kind: "merchant" as const, color: "text-foreground" },
  { label: "Comida y bebida", kind: "category" as const, color: "text-primary" },
]

const BAR_COUNT = 42

export function VoiceAnimation({ progress: p }: { progress: number }) {
  // 0.00–0.10  mic appears / pulsing
  // 0.10–0.52  waveform active, transcript types
  // 0.52–0.70  waveform fades, parser highlights tokens
  // 0.70–0.92  expense card assembles from tokens
  // 0.92–1.00  save check lands

  const micIn = easeOut(step(p, 0, 0.1))
  const record = step(p, 0.1, 0.52) // 0..1 during recording phase
  const waveFade = step(p, 0.5, 0.68) // waveform fades out
  const parseT = step(p, 0.52, 0.7)
  const cardT = step(p, 0.7, 0.92)
  const saved = easeOut(step(p, 0.92, 1))

  // transcript reveal — only during record phase, holds after
  const transcriptVisible = p > 0.1
  const textCount = transcriptVisible
    ? Math.min(TRANSCRIPT.length, Math.floor(record * TRANSCRIPT.length * 1.05))
    : 0
  const typed = TRANSCRIPT.slice(0, textCount)
  const caretShown = p > 0.1 && p < 0.62

  // Bar animation delays — stable per bar
  const barDelays = useMemo(
    () => Array.from({ length: BAR_COUNT }, (_, i) => (i * 37) % 320),
    [],
  )

  return (
    <div className="relative h-full w-full">
      {/* MIC + waveform column (left) */}
      <div
        className="absolute left-0 top-0 flex h-full w-1/2 flex-col items-center justify-center"
        style={{
          opacity: 1 - waveFade * 0.85,
          transform: `translate3d(${waveFade * -18}px, 0, 0)`,
        }}
      >
        {/* Mic */}
        <div
          className="relative flex h-20 w-20 items-center justify-center rounded-full border border-primary/40 bg-primary/10"
          style={{
            opacity: micIn,
            transform: `scale(${0.8 + micIn * 0.2})`,
          }}
        >
          {/* Pulsing rings — only during recording */}
          {record > 0 && record < 1 && (
            <>
              <span
                aria-hidden
                className="absolute inset-0 rounded-full"
                style={{ animation: "micPulse 2s ease-out infinite" }}
              />
              <span
                aria-hidden
                className="absolute inset-0 rounded-full"
                style={{
                  animation: "micPulse 2s ease-out infinite",
                  animationDelay: "700ms",
                }}
              />
            </>
          )}
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="9" y="3" width="6" height="11" rx="3" />
            <path d="M5 11a7 7 0 0 0 14 0" />
            <path d="M12 18v3" />
          </svg>
        </div>

        {/* Recording indicator */}
        <div
          className="mt-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
          style={{ opacity: record > 0 && record < 1 ? 1 : 0 }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/70" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Escuchando
        </div>

        {/* Waveform */}
        <div
          className="mt-6 flex h-16 items-center gap-[3px]"
          style={{
            opacity: (record > 0 ? 1 : 0) * (1 - waveFade),
          }}
        >
          {barDelays.map((delay, i) => {
            const dist = Math.abs(i - BAR_COUNT / 2) / (BAR_COUNT / 2)
            const scale = 1 - dist * 0.6 // center bars taller
            return (
              <span
                key={i}
                className="w-[3px] origin-bottom rounded-full bg-primary"
                style={{
                  height: `${14 + scale * 34}px`,
                  animation: `waveBar ${600 + (i % 5) * 90}ms ease-in-out ${delay}ms infinite`,
                  opacity: 0.35 + scale * 0.65,
                }}
              />
            )
          })}
        </div>

        {/* Transcript */}
        <div
          className="mt-6 min-h-[28px] max-w-[340px] px-2 text-center font-serif text-lg italic text-foreground/90"
          style={{
            opacity: transcriptVisible ? 1 : 0,
          }}
        >
          <span>&ldquo;{typed}</span>
          {caretShown && (
            <span
              aria-hidden
              className="ml-[2px] inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-primary align-middle"
              style={{ animation: "caretBlink 900ms steps(1, end) infinite" }}
            />
          )}
          {!caretShown && typed.length > 0 && <span>&rdquo;</span>}
        </div>
      </div>

      {/* PARSE tokens (middle → right pipeline) */}
      <div className="absolute inset-y-0 right-0 flex w-1/2 items-center">
        <div className="w-full">
          {/* Tokens bubble in during parse phase, then glide into card */}
          <div className="relative h-[180px] w-full">
            {TOKENS.map((tok, i) => {
              const bubbleIn = easeOut(step(parseT, i * 0.18, i * 0.18 + 0.5))
              const assemble = easeOut(step(cardT, i * 0.1, i * 0.1 + 0.6))
              // Start position: floating, spaced vertically
              const startTop = 20 + i * 48
              const startLeft = 20
              // End position (inside card): token lines up as field
              const endTop = 48 + i * 36
              const endLeft = 48

              const top = startTop + (endTop - startTop) * assemble
              const left = startLeft + (endLeft - startLeft) * assemble

              return (
                <div
                  key={tok.label}
                  className="absolute inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] backdrop-blur"
                  style={{
                    top,
                    left,
                    opacity: bubbleIn * (1 - assemble * 0.15),
                    transform: `scale(${0.9 + bubbleIn * 0.1}) translate3d(0, ${
                      (1 - bubbleIn) * 10
                    }px, 0)`,
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className={tok.color}>{tok.label}</span>
                </div>
              )
            })}
          </div>

          {/* Final expense card — frame fades in, tokens slot into it */}
          <div
            className="absolute right-2 top-1/2 w-[300px] -translate-y-1/2 rounded-2xl border border-border bg-card/90 p-4 backdrop-blur"
            style={{
              opacity: cardT > 0.15 ? 1 : 0,
              transform: `translate3d(${(1 - Math.min(1, cardT * 2)) * 30}px, -50%, 0)`,
              boxShadow:
                cardT > 0.6
                  ? "0 30px 70px -40px color-mix(in oklch, var(--primary) 40%, transparent)"
                  : "none",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Nuevo gasto
              </span>
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground"
                style={{
                  opacity: saved,
                  transform: `scale(${saved})`,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="m5 12 4 4L19 7" />
                </svg>
              </span>
            </div>

            {/* Card fields — faint placeholders before tokens slot in */}
            <div className="mt-3 space-y-3 text-sm">
              <FieldRow
                label="Importe"
                value="5,50 €"
                filled={cardT}
                delay={0}
                accent
              />
              <FieldRow
                label="Comercio"
                value="Café"
                filled={cardT}
                delay={0.12}
              />
              <FieldRow
                label="Categoría"
                value="Comida y bebida"
                filled={cardT}
                delay={0.22}
              />
            </div>

            <div
              className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-[11px] text-muted-foreground"
              style={{ opacity: saved }}
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-primary" />
                Guardado · voz
              </span>
              <span>ahora mismo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FieldRow({
  label,
  value,
  filled,
  delay,
  accent,
}: {
  label: string
  value: string
  filled: number
  delay: number
  accent?: boolean
}) {
  const t = easeOut(step(filled, 0.15 + delay, 0.55 + delay))
  return (
    <div className="grid grid-cols-[78px_1fr] items-center gap-3">
      <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <div className="relative h-6 overflow-hidden">
        {/* placeholder bar */}
        <div
          className="absolute inset-y-1 left-0 rounded-sm bg-border/60"
          style={{ width: `${(1 - t) * 80}%`, opacity: 1 - t }}
        />
        <div
          className={`absolute inset-0 flex items-center font-serif ${
            accent ? "text-lg tabular-nums text-primary" : "text-[13px] text-foreground"
          }`}
          style={{
            opacity: t,
            transform: `translate3d(0, ${(1 - t) * 6}px, 0)`,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  )
}
