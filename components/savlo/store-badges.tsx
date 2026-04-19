"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

/**
 * Cal AI-style store badges — dark pills with monochrome product marks.
 * Kept calm, no color glitter: they match Savlo's restrained palette.
 */

type Size = "sm" | "md"

export function AppStoreBadge({
  className,
  size = "md",
}: {
  className?: string
  size?: Size
}) {
  const pad = size === "sm" ? "px-3 py-1.5" : "px-4 py-2.5"
  const iconSize = size === "sm" ? 18 : 22
  const topText = size === "sm" ? "text-[8px]" : "text-[9px]"
  const bigText = size === "sm" ? "text-[13px]" : "text-[15px]"
  return (
    <Link
      href="#"
      aria-label="Descargar en el App Store"
      className={cn(
        "btn-calm inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black text-white",
        pad,
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        width={iconSize}
        height={iconSize}
        fill="currentColor"
        aria-hidden
      >
        <path d="M17.57 12.88c-.03-2.86 2.34-4.24 2.45-4.3-1.34-1.95-3.41-2.22-4.15-2.25-1.77-.18-3.45 1.04-4.35 1.04-.91 0-2.28-1.02-3.76-.99-1.94.03-3.73 1.13-4.73 2.86-2.02 3.5-.51 8.68 1.44 11.52.96 1.39 2.1 2.94 3.58 2.88 1.44-.06 1.99-.93 3.73-.93s2.23.93 3.76.9c1.55-.03 2.54-1.41 3.49-2.8 1.1-1.6 1.55-3.15 1.57-3.23-.03-.01-3.02-1.16-3.05-4.61zM14.69 4.54c.79-.97 1.33-2.31 1.18-3.65-1.14.05-2.54.76-3.36 1.71-.73.84-1.38 2.21-1.21 3.52 1.28.1 2.58-.65 3.39-1.58z" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={cn("font-sans tracking-wide text-white/75", topText)}>
          Descargar en
        </span>
        <span className={cn("font-sans font-semibold tracking-tight", bigText)}>
          App Store
        </span>
      </span>
    </Link>
  )
}

export function GooglePlayBadge({
  className,
  size = "md",
}: {
  className?: string
  size?: Size
}) {
  const pad = size === "sm" ? "px-3 py-1.5" : "px-4 py-2.5"
  const iconSize = size === "sm" ? 18 : 22
  const topText = size === "sm" ? "text-[8px]" : "text-[9px]"
  const bigText = size === "sm" ? "text-[13px]" : "text-[15px]"
  return (
    <Link
      href="#"
      aria-label="Consíguelo en Google Play"
      className={cn(
        "btn-calm inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black text-white",
        pad,
        className,
      )}
    >
      <svg
        viewBox="0 0 48 48"
        width={iconSize}
        height={iconSize}
        aria-hidden
      >
        {/* Full-color Google Play triangle (Cal AI matches brand guidelines) */}
        <defs>
          <linearGradient id="gp-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#00C2FF" />
            <stop offset="1" stopColor="#00A4FF" />
          </linearGradient>
          <linearGradient id="gp-b" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#FFBD00" />
            <stop offset="1" stopColor="#FF9B00" />
          </linearGradient>
          <linearGradient id="gp-c" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#FF3A44" />
            <stop offset="1" stopColor="#C31162" />
          </linearGradient>
          <linearGradient id="gp-d" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#00F076" />
            <stop offset="1" stopColor="#00A455" />
          </linearGradient>
        </defs>
        <path
          d="M10 4.5 28.4 23.2l-4.7 4.7L10 41.5c-.7-.4-1.2-1.2-1.2-2.2V6.7c0-1 .5-1.8 1.2-2.2z"
          fill="url(#gp-a)"
        />
        <path
          d="M33.7 28.5 28.4 23.2l5.3-5.3 6.8 3.9c1.4.8 1.4 2.8 0 3.6l-6.8 3.1z"
          fill="url(#gp-b)"
        />
        <path
          d="m10 41.5 18.4-18.3 5.3 5.3-18.9 10.9c-1.6.9-3.3.1-4.8-.1z"
          fill="url(#gp-c)"
        />
        <path
          d="M10 4.5c1.5-.2 3.2-1 4.8-.1l18.9 11-5.3 5.3L10 4.5z"
          fill="url(#gp-d)"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={cn("font-sans tracking-wide text-white/75", topText)}>
          Disponible en
        </span>
        <span className={cn("font-sans font-semibold tracking-tight", bigText)}>
          Google Play
        </span>
      </span>
    </Link>
  )
}
