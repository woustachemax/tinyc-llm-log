import { useEffect, useMemo, useRef } from 'react'
import hljs from 'highlight.js'
import type { Post } from '../types'

interface MarkdownViewerProps {
  post: Post
}

export function MarkdownViewer({ post }: MarkdownViewerProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  const metaItems = useMemo(() => [post.dateLabel, post.readTime, ...post.tags], [post])

  useEffect(() => {
    if (!contentRef.current) {
      return
    }

    contentRef.current.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block as HTMLElement)
    })
  }, [post])

  return (
    <article className="viewer-card">
      <div className="viewer-heading">
        <div>
          <p className="eyebrow">entry</p>
          <h2>{post.title}</h2>
        </div>
      </div>

      <div className="viewer-meta">
        {metaItems.map((item) => (
          <span key={item} className="meta-chip">
            {item}
          </span>
        ))}
      </div>

      <div ref={contentRef} className="markdown-content" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  )
}