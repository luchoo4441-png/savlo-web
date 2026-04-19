"use client"

import Link from "next/link"
import { useState, type FormEvent } from "react"
import { Reveal } from "./reveal"

export function CtaSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section id="cta" className="relative py-28 sm:py-36">
      {/* ambient calm glow */}
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
          {submitted ? (
            <div className="mx-auto mt-10 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Thank you. We&apos;ll be in touch, gently.
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mx-auto mt-10 flex w-full max-w-md flex-col items-stretch gap-2 sm:flex-row"
            >
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@quietmail.com"
                className="flex-1 rounded-full border border-border bg-surface/70 px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
              <button
                type="submit"
                className="btn-calm inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
              >
                Request access
              </button>
            </form>
          )}
        </Reveal>

        <Reveal delay={320}>
          <p className="mt-6 text-xs text-muted-foreground">
            Prefer to explore first?{" "}
            <Link
              href="#product"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              See the dashboard
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
