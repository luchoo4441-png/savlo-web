"use client"

import { useEffect, useRef } from "react"

/**
 * Fixed 2px progress line at the top of the page.
 *
 * Intentionally quiet: mint gradient that fades from transparent to full,
 * driven by passive scroll events (no rAF). The visual bar is a single
 * <div> that scaleX's from 0→1 as the user reads.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let ticking = false
    const update = () => {
      const doc = document.documentElement
      const scrollTop = window.scrollY || doc.scrollTop
      const height = doc.scrollHeight - doc.clientHeight
      const progress = height > 0 ? Math.min(1, Math.max(0, scrollTop / height)) : 0
      el.style.setProperty("--progress", progress.toFixed(4))
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", update)
    }
  }, [])

  return <div ref={ref} aria-hidden className="scroll-progress" />
}
