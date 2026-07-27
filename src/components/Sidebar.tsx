import { PostList } from './PostList'
import type { Post } from '../types'

interface SidebarProps {
  posts: Post[]
  selectedSlug: string
  onSelect: (slug: string) => void
  search: string
  onSearchChange: (value: string) => void
}

export function Sidebar({ posts, selectedSlug, onSelect, search, onSearchChange }: SidebarProps) {
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

      <div className="sidebar-section">
        <div className="sidebar-heading-row">
          <h2>Entries</h2>
          <span className="sidebar-count">{posts.length}</span>
        </div>
        <PostList posts={posts} selectedSlug={selectedSlug} onSelect={onSelect} />
      </div>
    </aside>
  )
}