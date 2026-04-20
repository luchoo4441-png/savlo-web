import type { Metadata } from "next"
import { SiteHeader } from "@/components/savlo/site-header"
import { SiteFooter } from "@/components/savlo/site-footer"
import { BlogIndex } from "@/components/savlo/blog/blog-index"

export const metadata: Metadata = {
  title: "Blog de Savlo — Finanzas conductuales, presupuesto y ahorro calmado",
  description:
    "Guías sobre cómo hacer un presupuesto, la regla 50/30/20, fondo de emergencia, método de los sobres y la psicología del dinero. Sin rachas. Sin culpa.",
  keywords: [
    "blog finanzas personales",
    "app de presupuesto",
    "cómo hacer un presupuesto",
    "regla 50/30/20",
    "fondo de emergencia",
    "ansiedad financiera",
    "finanzas conductuales",
    "método de los sobres",
  ],
  openGraph: {
    title: "Blog de Savlo — Finanzas calmas, mes a mes",
    description:
      "Guías de presupuesto, ahorro y psicología del dinero. Escrito con la misma calma que la app.",
    type: "website",
    locale: "es_ES",
    siteName: "Savlo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog de Savlo",
    description:
      "Finanzas conductuales aplicadas: presupuesto humano, ahorro sostenible, cero números rojos.",
  },
  alternates: {
    canonical: "/blog",
  },
}

export default function BlogPage() {
  return (
    <div className="bg-grain relative min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <BlogIndex />
      </main>
      <SiteFooter />
    </div>
  )
}
