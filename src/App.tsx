import { useEffect, useMemo, useState } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { MarkdownViewer } from './components/MarkdownViewer'
import { Sidebar } from './components/Sidebar'
import { loadPosts } from './lib/posts'

const DEFAULT_LIMIT = 5

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [search, setSearch] = useState('')
  const [selectedSlug, setSelectedSlug] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const posts = useMemo(() => [...loadPosts()].reverse(), [])

  const allTags = useMemo(() => {
    const set = new Set<string>()
    posts.forEach((post) => post.tags?.forEach((tag) => set.add(tag)))
    return Array.from(set)
  }, [posts])

  const matchedPosts = useMemo(() => {
    const lowerSearch = search.trim().toLowerCase()

    return posts.filter((post) => {
      const matchesSearch =
        lowerSearch.length === 0 ||
        [post.title, post.dateLabel, post.source].join(' ').toLowerCase().includes(lowerSearch)
      const matchesTag = activeTag === null || post.tags?.includes(activeTag)
      return matchesSearch && matchesTag
    })
  }, [posts, search, activeTag])

  const isFiltering = search.trim().length > 0 || activeTag !== null

  const filteredPosts = useMemo(() => {
    if (isFiltering) return matchedPosts
    return showAll ? matchedPosts : matchedPosts.slice(0, DEFAULT_LIMIT)
  }, [matchedPosts, isFiltering, showAll])

  const selectedPost = useMemo(() => {
    if (filteredPosts.length === 0) {
      return posts[0] ?? null
    }

    const found = filteredPosts.find((post) => post.slug === selectedSlug)
    if (found) {
      return found
    }

    return filteredPosts[0]
  }, [filteredPosts, posts, selectedSlug])

  const goToPost = (slug: string) => {
    setSelectedSlug(slug)
    setSearch('')
  }

  const { prevPost, nextPost } = useMemo(() => {
    if (!selectedPost) {
      return { prevPost: null, nextPost: null }
    }

    const index = posts.findIndex((post) => post.slug === selectedPost.slug)

    return {
      prevPost: index > 0 ? posts[index - 1] : null,
      nextPost: index !== -1 && index < posts.length - 1 ? posts[index + 1] : null,
    }
  }, [posts, selectedPost])

  if (!selectedPost) {
    return null
  }

  return (
    <div className={`app-shell ${theme}`}>
      <div className="page-bg noise" />
      <Header theme={theme} onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
      <main className="content-grid">
        <Sidebar
          posts={filteredPosts}
          totalCount={matchedPosts.length}
          selectedSlug={selectedPost.slug}
          onSelect={setSelectedSlug}
          search={search}
          onSearchChange={setSearch}
          tags={allTags}
          activeTag={activeTag}
          onTagChange={setActiveTag}
          showAll={showAll}
          onToggleShowAll={() => setShowAll((value) => !value)}
          hasMore={!isFiltering && matchedPosts.length > DEFAULT_LIMIT}
        />
        <MarkdownViewer post={selectedPost} />
        <nav className="entry-nav">
          {prevPost ? (
            <button type="button" className="entry-nav-link entry-nav-prev" onClick={() => goToPost(prevPost.slug)}>
              <span className="entry-nav-label">prev</span>
              <span className="entry-nav-title">{prevPost.title}</span>
            </button>
          ) : (
            <span />
          )}
          {nextPost ? (
            <button type="button" className="entry-nav-link entry-nav-next" onClick={() => goToPost(nextPost.slug)}>
              <span className="entry-nav-label">next</span>
              <span className="entry-nav-title">{nextPost.title}</span>
            </button>
          ) : (
            <span />
          )}
        </nav>
      </main>
      <Footer />
    </div>
  )
}

export default App