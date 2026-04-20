"use client"

import Link from "next/link"
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react"
import { cn } from "@/lib/utils"
import { Reveal } from "./reveal"

type Status = "idle" | "loading" | "success" | "error"

export function CtaSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Wire cursor-follow sheen on the primary button (writes --mx / --my).
  useEffect(() => {
    const btn = buttonRef.current
    if (!btn) return
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect()
      btn.style.setProperty("--mx", `${e.clientX - r.left}px`)
      btn.style.setProperty("--my", `${e.clientY - r.top}px`)
    }
    btn.addEventListener("mousemove", onMove)
    return () => btn.removeEventListener("mousemove", onMove)
  }, [])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email || status === "loading") return
    setStatus("loading")
    // Gentle pacing — a 900ms hold so the loading state reads as intentional,
    // not a flicker. Keeps the "calm" register of the product.
    await new Promise((r) => setTimeout(r, 900))
    setStatus("success")
  }

  return (
    <section id="cta" className="relative py-28 sm:py-36">
      {/* Ambient calm glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-[420px] max-w-3xl -translate-y-1/2 opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(520px 260px at 50% 50%, color-mix(in oklch, var(--primary) 22%, transparent), transparent 60%), radial-gradient(400px 220px at 70% 50%, color-mix(in oklch, var(--accent) 12%, transparent), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-primary/80">
            Begin, gently
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight text-balance sm:text-5xl">
            Start understanding your money.
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-muted-foreground">
            Take a quiet tour first. No credit card, no countdown timers, no
            aggressive onboarding — just your numbers, arranged calmly.
          </p>
        </Reveal>

        <Reveal delay={260}>
          {status === "success" ? (
            <SuccessBadge email={email} />
          ) : (
            <form
              onSubmit={onSubmit}
              className="mx-auto mt-10 flex w-full max-w-md flex-col items-stretch gap-2 sm:flex-row"
              noValidate
            >
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="group relative flex-1">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  disabled={status === "loading"}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@quietmail.com"
                  className={cn(
                    "focus-ring w-full rounded-full border border-border bg-surface/70 px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all duration-300",
                    "hover:border-primary/30",
                    "focus:border-primary/50 focus:bg-surface focus:outline-none",
                    status === "loading" && "opacity-60",
                  )}
                />
                {/* Soft glow under input on focus */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-4 -bottom-1 h-2 rounded-full blur-md opacity-0 transition-opacity duration-500 group-focus-within:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, color-mix(in oklch, var(--primary) 60%, transparent), transparent)",
                  }}
                />
              </div>

              <button
                ref={buttonRef}
                type="submit"
                disabled={status === "loading"}
                className={cn(
                  "btn-calm btn-sheen focus-ring group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground",
                  "shadow-[0_1px_0_0_rgba(255,255,255,0.22)_inset,0_10px_30px_-12px_color-mix(in_oklch,var(--primary)_50%,transparent)]",
                  "disabled:cursor-not-allowed disabled:opacity-80",
                )}
              >
                <span className="relative inline-flex items-center gap-2">
                  {status === "loading" ? (
                    <>
                      <span>Requesting</span>
                      <span className="loading-dots" aria-hidden>
                        <span />
                        <span />
                        <span />
                      </span>
                    </>
                  ) : (
                    <>
                      <span>Request access</span>
                      <ArrowIcon />
                    </>
                  )}
                </span>
              </button>
            </form>
          )}
        </Reveal>

        <Reveal delay={320}>
          <p className="mt-6 text-xs text-muted-foreground">
            Prefer to explore first?{" "}
            <Link
              href="#product"
              className="link-underline text-foreground/80 transition-colors hover:text-foreground"
            >
              See the dashboard
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10" />
      <path d="m9 4 4 4-4 4" />
    </svg>
  )
}

function SuccessBadge({ email }: { email: string }) {
  return (
    <div
      className="mx-auto mt-10 inline-flex flex-col items-center gap-3"
      style={{
        opacity: 0,
        animation: "fadeUp 700ms cubic-bezier(0.22,1,0.36,1) forwards",
      }}
    >
      <div className="relative">
        {/* Soft pulsing halo */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow:
              "0 0 0 0 color-mix(in oklch, var(--primary) 40%, transparent)",
            animation:
              "micPulse 2400ms cubic-bezier(0.4, 0, 0.4, 1) 400ms infinite",
          }}
        />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
          <svg
            aria-hidden
            className="success-check h-7 w-7 text-primary"
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="16" cy="16" r="14" />
            <path d="M10 16.5 14 20.5 22 12.5" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <p className="font-serif text-lg tracking-tight">
          Thank you. We&apos;ll be in touch, gently.
        </p>
        {email ? (
          <p className="text-xs text-muted-foreground">
            Sent to <span className="text-foreground/80">{email}</span>
          </p>
        ) : null}
      </div>
    </div>
  )
}
