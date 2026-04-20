"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type TextRevealProps = {
  /**
   * Array of lines. Each line is either a string or ReactNode
   * (so inline <em>, <span>, etc. are supported).
   */
  lines: ReactNode[]
  className?: string
  /** ms between consecutive line reveals. */
  stagger?: number
  /** ms before the first line starts. */
  delay?: number
  as?: "h1" | "h2" | "h3" | "p" | "div"
}

/**
 * Per-line mask reveal — each line slides up from below a clip mask, staggered.
 * The mask effect is the single cheapest way to make headlines feel "designed".
 *
 * Pure CSS (see `.reveal-line` in globals.css), no JS observers — plays on mount.
 * For headings already inside <Reveal> wrappers, consider this a swap-in replacement.
 */
export function TextReveal({
  lines,
  className,
  stagger = 120,
  delay = 0,
  as = "h2",
}: TextRevealProps) {
  const Tag = as
  return (
    <Tag className={cn(className)}>
      {lines.map((line, i) => (
        <span key={i} className="reveal-line">
          <span
            style={{
              animationDelay: `${delay + i * stagger}ms`,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}
