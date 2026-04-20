import Link from "next/link"
import {
  formatBlogDate,
  formatBlogDateShort,
  getRelatedPosts,
  type BlogPost,
} from "@/lib/blog/posts"

export function BlogArticle({ post }: { post: BlogPost }) {
  const related = getRelatedPosts(post.slug, 3)
  const Content = post.content

  return (
    <article className="mx-auto w-full max-w-3xl px-6 pb-24 pt-32 sm:pt-36">
      {/* Breadcrumb */}
      <nav
        aria-label="Ruta de navegación"
        className="mb-10 text-[12px] text-muted-foreground"
      >
        <ol className="flex items-center gap-1.5">
          <li>
            <Link
              href="/"
              className="transition-colors hover:text-foreground"
            >
              Inicio
            </Link>
          </li>
          <li aria-hidden>·</li>
          <li>
            <Link
              href="/blog"
              className="transition-colors hover:text-foreground"
            >
              Blog
            </Link>
          </li>
          <li aria-hidden>·</li>
          <li className="text-foreground/80">{post.category}</li>
        </ol>
      </nav>

      {/* Category pill */}
      <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/[0.08] px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-primary">
          {post.category}
        </span>
        <span aria-hidden>·</span>
        <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
        <span aria-hidden>·</span>
        <span>{post.readingTime} min de lectura</span>
      </div>

      {/* Title */}
      <h1 className="mt-5 text-balance font-serif text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-[56px]">
        {post.title}
      </h1>

      {/* Lede */}
      <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
        {post.description}
      </p>

      {/* Author + share row */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-border/60 py-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface"
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
          <div className="flex flex-col leading-tight">
            <span className="text-[13px] font-medium text-foreground">
              Equipo Savlo
            </span>
            <span className="text-[12px] text-muted-foreground">
              Finanzas conductuales, escrito en calma
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
          <span>Compartir</span>
          <ShareIconLink
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
            label="Compartir en X"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
            </svg>
          </ShareIconLink>
          <ShareIconLink
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://savlo.app/blog/${post.slug}`)}`}
            label="Compartir en LinkedIn"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.04c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.5v6.24ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0Z" />
            </svg>
          </ShareIconLink>
        </div>
      </div>

      {/* Article stats block — establishes length benchmark */}
      <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
        <Stat label="Palabras" value={post.stats.words.toLocaleString()} />
        <Stat
          label="Caracteres"
          value={post.stats.characters.toLocaleString()}
        />
        <Stat
          label="Oraciones"
          value={post.stats.sentences.toLocaleString()}
        />
        <Stat
          label="Párrafos"
          value={post.stats.paragraphs.toLocaleString()}
        />
      </div>

      {/* Body */}
      <div className="mt-10">
        <Content />
      </div>

      {/* Footer nav */}
      <footer className="mt-20 border-t border-border/60 pt-8">
        <div className="flex items-center justify-between gap-4 text-[13px]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Volver al blog
          </Link>
          <time
            dateTime={post.date}
            className="text-muted-foreground tabular-nums"
          >
            Publicado el {formatBlogDateShort(post.date)}
          </time>
        </div>
      </footer>

      {/* Related */}
      {related.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="mt-20 border-t border-border/60 pt-12"
        >
          <h2
            id="related-heading"
            className="text-center font-serif text-2xl font-medium tracking-tight text-foreground"
          >
            Sigue leyendo
          </h2>
          <p className="mt-2 text-center text-[13px] text-muted-foreground">
            Más artículos en <span className="text-foreground/80">{post.category}</span>
          </p>
          <ol className="mt-10 flex flex-col gap-8">
            {related.map((r) => (
              <li key={r.slug} className="text-center">
                <Link href={`/blog/${r.slug}`} className="group inline-block">
                  <h3 className="text-balance text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {r.title}
                  </h3>
                  <time
                    dateTime={r.date}
                    className="mt-1 block text-[12px] font-medium text-primary/80"
                  >
                    {formatBlogDateShort(r.date)}
                  </time>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}
    </article>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 bg-surface px-4 py-5">
      <span className="font-serif text-2xl font-medium tabular-nums text-foreground sm:text-3xl">
        {value}
      </span>
      <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

function ShareIconLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-surface/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
    >
      {children}
    </Link>
  )
}
