"use client"

import { useEffect, useRef, useState } from "react"

type AnimatedNumberProps = {
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
  /** Only start counting when the element scrolls into view */
  whenInView?: boolean
}

export function AnimatedNumber({
  value,
  duration = 1600,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  whenInView = true,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const start = () => {
      if (startedRef.current) return
      startedRef.current = true

      const from = 0
      const to = value
      const startTime = performance.now()

      // Calm ease-out (cubic)
      const ease = (t: number) => 1 - Math.pow(1 - t, 3)

      let raf = 0
      const step = (now: number) => {
        const elapsed = now - startTime
        const t = Math.min(1, elapsed / duration)
        const eased = ease(t)
        setDisplay(from + (to - from) * eased)
        if (t < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)

      return () => cancelAnimationFrame(raf)
    }

    if (!whenInView) {
      start()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            start()
            observer.disconnect()
            break
          }
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration, whenInView])

  const formatted = display.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
