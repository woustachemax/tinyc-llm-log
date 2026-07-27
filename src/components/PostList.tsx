import type { Post } from "../types"
interface PostListProps {
  posts: Post[]
  selectedSlug: string
  onSelect: (slug: string) => void
}

export function PostList({ posts, selectedSlug, onSelect }: PostListProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <div className="post-list">
      {posts.map((post) => {
        const isActive = post.slug === selectedSlug

        return (
          <button
            key={post.slug}
            type="button"
            className={`post-item${isActive ? ' active' : ''}`}
            onClick={() => onSelect(post.slug)}
          >
            <div className="post-item-top">
              <span className="post-title">{post.title}</span>
            </div>
            <div className="post-item-body">
              <span>{post.dateLabel}</span>
              <span>{post.readTime}</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
