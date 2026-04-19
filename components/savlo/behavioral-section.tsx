import { Reveal } from "./reveal"

export function BehavioralSection() {
  return (
    <section id="philosophy" className="relative py-24 sm:py-32">
      {/* ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-[360px] max-w-4xl -translate-y-1/2 opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(500px 240px at 50% 50%, color-mix(in oklch, var(--primary) 16%, transparent), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-primary/80">
            Our philosophy
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]">
            We don&apos;t judge your spending.
            <br />
            <span className="text-primary/90 italic">We help you understand it.</span>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Most money apps treat every dollar as a test you&apos;re failing.
            Savlo is built on behavioral finance research: awareness, not
            pressure, is what creates lasting change. So we show you the shape
            of your habits — and then we step back.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Reveal delay={220}>
            <Tenet
              title="No streaks. No guilt."
              body="No fire emojis. No red numbers designed to make you anxious. Your money deserves a steadier tone."
            />
          </Reveal>
          <Reveal delay={300}>
            <Tenet
              title="Observe, then decide."
              body="Savlo surfaces patterns the way a good notebook would — quietly, and only when you open it."
            />
          </Reveal>
          <Reveal delay={380}>
            <Tenet
              title="Small changes, compounded."
              body="We celebrate consistency, not willpower. A single mindful swap is worth more than a month of restriction."
            />
          </Reveal>
          <Reveal delay={460}>
            <Tenet
              title="You stay in charge."
              body="Your categories, your thresholds, your definitions. Savlo is a mirror, not a coach."
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Tenet({ title, body }: { title: string; body: string }) {
  return (
    <div className="card-calm group relative h-full rounded-2xl border border-border bg-surface/70 p-6">
      <div className="flex items-center gap-3">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        <h3 className="font-serif text-xl tracking-tight">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  )
}
