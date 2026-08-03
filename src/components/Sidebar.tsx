import { PostList } from './PostList'
import type { Post } from '../types'

interface SidebarProps {
  posts: Post[]
  totalCount: number
  selectedSlug: string
  onSelect: (slug: string) => void
  search: string
  onSearchChange: (value: string) => void
  tags: string[]
  activeTag: string | null
  onTagChange: (tag: string | null) => void
  showAll: boolean
  onToggleShowAll: () => void
  hasMore: boolean
}

export function Sidebar({
  posts,
  totalCount,
  selectedSlug,
  onSelect,
  search,
  onSearchChange,
  tags,
  activeTag,
  onTagChange,
  showAll,
  onToggleShowAll,
  hasMore,
}: SidebarProps) {
  return (
    <aside className="sidebar-card">
      <div className="sidebar-section">
        <label className="search-label" htmlFor="post-search">
          Search
        </label>
        <input
          id="post-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search entries"
          className="search-input"
        />
      </div>

      {tags.length > 0 && (
        <div className="sidebar-section">
          <div className="tag-filter-row">
            <button
              type="button"
              className={`tag-chip ${activeTag === null ? 'tag-chip-active' : ''}`}
              onClick={() => onTagChange(null)}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`tag-chip ${activeTag === tag ? 'tag-chip-active' : ''}`}
                onClick={() => onTagChange(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="sidebar-section">
        <div className="sidebar-heading-row">
          <h2>Entries</h2>
          <span className="sidebar-count">
            {posts.length}
            {posts.length !== totalCount ? ` / ${totalCount}` : ''}
          </span>
        </div>
        <PostList posts={posts} selectedSlug={selectedSlug} onSelect={onSelect} />
        {hasMore && (
          <button type="button" className="sidebar-show-toggle" onClick={onToggleShowAll}>
            {showAll ? 'Show less' : 'Show all'}
          </button>
        )}
      </div>
    </aside>
  )
}