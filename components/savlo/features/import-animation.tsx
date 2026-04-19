"use client"

/**
 * Excel / CSV import animation.
 * Driven by a single `progress` 0..1 value from the parent.
 * No internal timers — all motion is derived deterministically.
 */

const step = (p: number, start: number, end: number) => {
  if (p <= start) return 0
  if (p >= end) return 1
  return (p - start) / (end - start)
}
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

type Row = {
  date: string
  merchant: string
  amount: string
  category: string
  initial: string
}

const ROWS: Row[] = [
  { date: "2026-04-03", merchant: "Blue Bottle Coffee", amount: "-4.50", category: "Food", initial: "B" },
  { date: "2026-04-02", merchant: "Trader Joe's", amount: "-62.18", category: "Groceries", initial: "T" },
  { date: "2026-04-02", merchant: "Paycheck · Acme Co.", amount: "+2,400.00", category: "Income", initial: "A" },
  { date: "2026-04-01", merchant: "Figma", amount: "-15.00", category: "Tools", initial: "F" },
  { date: "2026-03-30", merchant: "Lyft", amount: "-11.20", category: "Transport", initial: "L" },
]

const COLS = ["Date", "Merchant", "Amount", "Category"]

export function ImportAnimation({ progress: p }: { progress: number }) {
  // Phase map:
  // 0.00–0.12  file flies in
  // 0.12–0.28  rows cascade out of file
  // 0.28–0.52  column scanner sweeps left→right
  // 0.52–0.86  rows migrate to transaction cards on the right
  // 0.86–1.00  summary chip lands

  const fileIn = easeOut(step(p, 0, 0.12))
  const rowsOut = step(p, 0.12, 0.28)
  const scanT = step(p, 0.28, 0.52)
  const migrate = step(p, 0.52, 0.86)
  const summary = easeOut(step(p, 0.86, 1))

  return (
    <div className="relative h-full w-full">
      {/* LEFT: Excel file + raw rows */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${(fileIn - 1) * 40}px, calc(-50% + ${
            (1 - fileIn) * 12
          }px), 0)`,
          opacity: 0.25 + fileIn * 0.75 - migrate * 0.6,
          transition: "opacity 120ms linear",
        }}
      >
        {/* File icon */}
        <div className="flex items-center gap-3">
          <div
            aria-hidden
            className="relative flex h-14 w-11 items-center justify-center rounded-md border border-border bg-surface-2 shadow-[0_12px_30px_-16px_rgba(0,0,0,0.8)]"
          >
            <div className="absolute inset-x-1 top-1 h-1 rounded-sm bg-primary/70" />
            <div className="absolute inset-x-1 top-3 h-[1px] rounded-sm bg-border" />
            <div className="absolute inset-x-1 top-5 h-[1px] rounded-sm bg-border" />
            <div className="absolute inset-x-1 top-7 h-[1px] rounded-sm bg-border" />
            <span className="absolute bottom-1 right-1 rounded-sm bg-primary/80 px-1 text-[8px] font-semibold text-primary-foreground">
              XLS
            </span>
          </div>
          <div className="text-[11px] leading-tight text-muted-foreground">
            <div className="text-foreground">transactions-2026.xlsx</div>
            <div>1,247 rows · 4 columns</div>
          </div>
        </div>

        {/* Raw CSV-ish rows cascading out */}
        <div className="mt-4 w-[320px] rounded-lg border border-border bg-card/80 p-2.5 backdrop-blur">
          <div className="mb-2 grid grid-cols-[72px_1fr_68px_76px] gap-2 border-b border-border/60 pb-1.5 text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
            {COLS.map((c, i) => (
              <span
                key={c}
                className="relative"
                style={{
                  color:
                    scanT > 0 && scanT < 1 && Math.floor(scanT * 4) === i
                      ? "var(--primary)"
                      : undefined,
                  transition: "color 200ms ease",
                }}
              >
                {c}
              </span>
            ))}
          </div>
          {ROWS.map((row, idx) => {
            const rowP = easeOut(step(rowsOut, idx * 0.14, idx * 0.14 + 0.3))
            const fadeOut = step(migrate, idx * 0.08, idx * 0.08 + 0.25)
            return (
              <div
                key={idx}
                className="relative grid grid-cols-[72px_1fr_68px_76px] gap-2 py-1 font-mono text-[10.5px]"
                style={{
                  opacity: rowP * (1 - fadeOut),
                  transform: `translate3d(0, ${(1 - rowP) * 8}px, 0)`,
                }}
              >
                {/* Column scanner highlight */}
                {scanT > 0 && scanT < 1 && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 rounded-sm bg-primary/10"
                    style={{
                      left: `${scanT * 100}%`,
                      width: "25%",
                      transform: "translateX(-50%)",
                      transition: "left 200ms linear",
                    }}
                  />
                )}
                <span className="text-muted-foreground">{row.date}</span>
                <span className="truncate text-foreground/90">{row.merchant}</span>
                <span
                  className={
                    row.amount.startsWith("+")
                      ? "tabular-nums text-primary"
                      : "tabular-nums text-foreground/90"
                  }
                >
                  {row.amount}
                </span>
                <span className="truncate text-muted-foreground">
                  {row.category}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* RIGHT: parsed transaction cards landing one by one */}
      <div className="absolute right-0 top-1/2 w-[300px] -translate-y-1/2 space-y-2">
        {ROWS.map((row, idx) => {
          const cardP = easeOut(step(migrate, idx * 0.09, idx * 0.09 + 0.35))
          return (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-xl border border-border bg-card/90 p-3 backdrop-blur"
              style={{
                opacity: cardP,
                transform: `translate3d(${(1 - cardP) * 32}px, 0, 0) scale(${
                  0.96 + cardP * 0.04
                })`,
                boxShadow:
                  cardP > 0.6
                    ? "0 20px 50px -30px color-mix(in oklch, var(--primary) 40%, transparent)"
                    : "none",
              }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 font-serif text-sm text-primary">
                {row.initial}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12px] text-foreground">
                  {row.merchant}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {row.category} · {row.date.slice(5)}
                </div>
              </div>
              <div
                className={`tabular-nums text-[12px] font-medium ${
                  row.amount.startsWith("+") ? "text-primary" : "text-foreground/90"
                }`}
              >
                {row.amount.startsWith("+") ? "+" : "−"}$
                {row.amount.replace(/[+-]/, "")}
              </div>
            </div>
          )
        })}
      </div>

      {/* Flow arcs from raw rows → cards */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 900 420"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="imp-arc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="45%" stopColor="var(--primary)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ROWS.map((_, idx) => {
          const t = easeInOut(
            step(migrate, idx * 0.09, idx * 0.09 + 0.5)
          )
          if (t <= 0 || t >= 1) return null
          const y1 = 120 + idx * 30
          const y2 = 70 + idx * 60
          return (
            <path
              key={idx}
              d={`M 340 ${y1} C 500 ${y1}, 520 ${y2}, 600 ${y2}`}
              fill="none"
              stroke="url(#imp-arc)"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity={Math.sin(t * Math.PI)}
            />
          )
        })}
      </svg>

      {/* Summary chip */}
      <div
        className="absolute left-1/2 top-4 flex -translate-x-1/2 items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] text-primary"
        style={{
          opacity: summary,
          transform: `translate3d(-50%, ${(1 - summary) * -12}px, 0)`,
        }}
      >
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="m5 12 4 4L19 7" />
        </svg>
        1,247 transactions imported
      </div>
    </div>
  )
}
