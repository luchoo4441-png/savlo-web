"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { AppStoreBadge, GooglePlayBadge } from "./store-badges"

const nav = [
  { label: "Hogar", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Acerca de", href: "/#about" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-serif text-lg tracking-tight">Savlo</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <AppStoreBadge size="sm" className="hidden sm:inline-flex" />
          <GooglePlayBadge size="sm" />
        </div>
      </div>
    </header>
  )
}

function Logo() {
  return (
    <span
      aria-hidden
      className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-surface"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 15c3-7 6-7 8-4s5 3 8-4" />
      </svg>
    </span>
  )
}
