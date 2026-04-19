"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState, type ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** px of upward translation at rest */
  y?: number
  as?: keyof React.JSX.IntrinsicElements
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 14,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            obs.disconnect()
            break
          }
        }
      },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const Tag = as as React.ElementType

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      style={{
        transform: shown ? "translate3d(0,0,0)" : `translate3d(0, ${y}px, 0)`,
        opacity: shown ? 1 : 0,
        transition:
          "opacity 800ms cubic-bezier(0.22,1,0.36,1), transform 800ms cubic-bezier(0.22,1,0.36,1)",
        transitionDelay: `${delay}ms`,
      }}
      className={cn(className)}
    >
      {children}
    </Tag>
  )
}
