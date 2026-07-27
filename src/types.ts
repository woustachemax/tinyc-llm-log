export interface Post {
  slug: string
  title: string
  dateLabel: string
  readTime: string
  tags: string[]
  source: string
  contentHtml: string
}

export interface PostModule {
  path: string
  source: string
}
