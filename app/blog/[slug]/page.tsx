import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/savlo/site-header"
import { SiteFooter } from "@/components/savlo/site-footer"
import { BlogArticle } from "@/components/savlo/blog/blog-article"
import { getPostBySlug, posts } from "@/lib/blog/posts"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) {
    return {
      title: "Artículo no encontrado — Blog de Savlo",
    }
  }

  const url = `/blog/${post.slug}`

  return {
    title: `${post.title} — Savlo`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      locale: "es_ES",
      siteName: "Savlo",
      publishedTime: new Date(post.date + "T00:00:00").toISOString(),
      authors: ["Equipo Savlo"],
      tags: post.keywords,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return notFound()

  // JSON-LD Article structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: new Date(post.date + "T00:00:00").toISOString(),
    author: {
      "@type": "Organization",
      name: "Savlo",
    },
    publisher: {
      "@type": "Organization",
      name: "Savlo",
    },
    keywords: post.keywords.join(", "),
    wordCount: post.stats.words,
    inLanguage: "es",
    articleSection: post.category,
  }

  return (
    <div className="bg-grain relative min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <BlogArticle post={post} />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        // JSON-LD only — safe to inline as stringified JSON
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}
