"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type SpotlightProps = {
  /** Override the radius of the glow in px. */
  size?: number
  /** CSS color-mix source token, defaults to --primary. */
  color?: "primary" | "accent"
  className?: string
}

/**
 * Cursor-aware spotlight glow.
 *
 * Drop inside any relatively-positioned element with the `group` class
 * (or `.spotlight-host`). Reads mousemove on its parent and writes
 * --mx/--my as CSS variables so the radial-gradient follows the cursor.
 *
 * The radial-gradient itself lives in `.spotlight` (see globals.css) and
 * only fades in while the parent is hovered, via `.group:hover > .spotlight`.
 *
 * GPU-friendly: opacity + vars, no layout, no React re-renders.
 */
export function Spotlight({ size = 360, color = "primary", className }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const parent = el.parentElement
    if (!parent) return

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) return

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      parent.style.setProperty("--mx", `${x}px`)
      parent.style.setProperty("--my", `${y}px`)
    }
    const onLeave = () => {
      parent.style.setProperty("--mx", `50%`)
      parent.style.setProperty("--my", `50%`)
    }

    parent.addEventListener("mousemove", onMove)
    parent.addEventListener("mouseleave", onLeave)
    return () => {
      parent.removeEventListener("mousemove", onMove)
      parent.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  const bgToken = color === "accent" ? "--accent" : "--primary"

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("spotlight", className)}
      style={{
        background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklch, var(${bgToken}) 18%, transparent), transparent 48%)`,
      }}
    />
  )
}

/**
 * Same trick for buttons — writes --mx/--my relative to the button so the
 * `.btn-sheen::before` gradient follows the cursor.
 *
 * Usage:
 *   <button className="btn-calm btn-sheen ..."><ButtonSheenTracker />...</button>
 */
export function ButtonSheenTracker() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const parent = el.parentElement
    if (!parent) return

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) return

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect()
      parent.style.setProperty("--mx", `${e.clientX - rect.left}px`)
      parent.style.setProperty("--my", `${e.clientY - rect.top}px`)
    }
    parent.addEventListener("mousemove", onMove)
    return () => parent.removeEventListener("mousemove", onMove)
  }, [])

  return <span ref={ref} aria-hidden className="hidden" />
}
