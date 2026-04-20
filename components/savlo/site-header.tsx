"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { AppStoreBadge, GooglePlayBadge } from "./store-badges"

const nav = [
  { label: "Hogar", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Acerca de", href: "/#about" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Active detection: exact match for "/", prefix match otherwise (so "/blog/x" highlights "Blog").
  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false
    if (href === "/") return pathname === "/"
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 transition-[height] duration-500",
          scrolled ? "h-14" : "h-16",
        )}
      >
        <Link
          href="/"
          className="group flex items-center gap-2"
          aria-label="Savlo — ir al inicio"
        >
          <Logo scrolled={scrolled} />
          <span
            className={cn(
              "font-serif tracking-tight transition-all duration-500",
              scrolled ? "text-[17px]" : "text-lg",
            )}
          >
            Savlo
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {nav.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={active || undefined}
                className={cn(
                  "link-underline focus-ring rounded-sm text-sm transition-colors duration-300",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <AppStoreBadge size="sm" className="hidden sm:inline-flex" />
          <GooglePlayBadge size="sm" />
        </div>
      </div>
    </header>
  )
}

function Logo({ scrolled }: { scrolled: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex items-center justify-center rounded-full border border-border bg-surface transition-all duration-500",
        scrolled ? "h-6 w-6" : "h-7 w-7",
        "group-hover:border-primary/40 group-hover:bg-surface-2",
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className={cn(
          "text-primary transition-all duration-500",
          scrolled ? "h-3.5 w-3.5" : "h-4 w-4",
          "group-hover:rotate-[-4deg]",
        )}
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
