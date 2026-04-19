"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import {
  categories,
  formatBlogDateShort,
  posts,
  type BlogCategory,
} from "@/lib/blog/posts"
import { cn } from "@/lib/utils"

export function BlogIndex() {
  const [active, setActive] = useState<BlogCategory | "Todos">("Todos")

  const visible = useMemo(() => {
    const list =
      active === "Todos" ? posts : posts.filter((p) => p.category === active)
    return [...list].sort((a, b) => (a.date < b.date ? 1 : -1))
  }, [active])

  return (
    <section className="mx-auto w-full max-w-3xl px-6 pb-32 pt-32 sm:pt-36">
      {/* Heading — mirrors Cal AI's centered "Our Blog" */}
      <header className="flex flex-col items-center text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"
          />
          Diario Savlo
        </p>
        <h1 className="font-serif text-5xl font-medium tracking-tight text-foreground sm:text-6xl">
          Nuestro Blog
        </h1>
        <p className="mt-3 text-[15px] text-primary">
          sígueme para novedades sobre finanzas calmas
        </p>
        <p className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Guías, métodos y reflexiones sobre presupuesto, ahorro y la relación
          emocional con el dinero. Nada de rachas, nada de números rojos.
        </p>
      </header>

      {/* Category pills */}
      <nav
        aria-label="Categorías"
        className="mt-14 flex flex-wrap items-center justify-center gap-2"
      >
        {categories.map((c) => {
          const isActive = c.label === active
          return (
            <button
              key={c.label}
              type="button"
              onClick={() => setActive(c.label)}
              className={cn(
                "btn-calm inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[13px] transition-colors",
                isActive
                  ? "border-primary/50 bg-primary/10 text-foreground"
                  : "border-border bg-surface/50 text-muted-foreground hover:border-primary/30 hover:text-foreground",
              )}
              aria-pressed={isActive}
            >
              <span>{c.label}</span>
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] tabular-nums",
                  isActive
                    ? "bg-primary/20 text-foreground"
                    : "bg-muted/40 text-muted-foreground",
                )}
              >
                {c.count}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Article list — sparse Cal AI-style list */}
      <ol className="mt-16 flex flex-col gap-10">
        {visible.map((p) => (
          <li key={p.slug} className="group">
            <Link
              href={`/blog/${p.slug}`}
              className="flex flex-col items-center text-center"
            >
              <h2 className="max-w-2xl text-balance text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-xl">
                {p.title}
              </h2>
              <time
                dateTime={p.date}
                className="mt-1.5 text-[12px] font-medium text-primary/80"
              >
                {formatBlogDateShort(p.date)}
              </time>
              <p className="mt-2 max-w-xl text-pretty text-[14px] leading-relaxed text-muted-foreground">
                {p.description}
              </p>
            </Link>
          </li>
        ))}
      </ol>

      {/* Empty state */}
      {visible.length === 0 && (
        <p className="mt-20 text-center text-sm text-muted-foreground">
          Pronto habrá artículos en esta categoría.
        </p>
      )}

      {/* Footer note — SEO copy + newsletter hook */}
      <div className="mt-24 flex flex-col items-center gap-4 border-t border-border/60 pt-12 text-center">
        <h3 className="font-serif text-xl font-medium text-foreground">
          Un correo al mes, cero ruido
        </h3>
        <p className="max-w-md text-[14px] leading-relaxed text-muted-foreground">
          Enviamos un artículo profundo al mes sobre{" "}
          <span className="text-foreground/90">finanzas conductuales</span>,
          presupuesto humano y ahorro sostenible. Sin ventas agresivas.
        </p>
        <form
          className="mt-2 flex w-full max-w-md items-center gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="newsletter" className="sr-only">
            Correo electrónico
          </label>
          <input
            id="newsletter"
            type="email"
            required
            placeholder="tu@correo.com"
            className="min-w-0 flex-1 rounded-full border border-border bg-surface/60 px-4 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            className="btn-calm rounded-full bg-primary px-5 py-2.5 text-[14px] font-medium text-primary-foreground hover:bg-primary-hover"
          >
            Suscribirme
          </button>
        </form>
        <p className="text-[11px] text-muted-foreground">
          Un clic y te vas cuando quieras.
        </p>
      </div>
    </section>
  )
}
