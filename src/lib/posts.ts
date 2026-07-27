import { marked } from 'marked'
import type { Post, PostModule } from '../types'

const modules = import.meta.glob('/days/*.md', {
  query: '?raw',
  eager: true,
  import: 'default',
}) as Record<string, string>

function extractFrontmatter(markdown: string) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?/)

  if (!match) {
    return { data: {} as Record<string, string>, body: markdown }
  }

  const data: Record<string, string> = {}

  for (const line of match[1].split('\n')) {
    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()
    data[key] = value
  }

  return { data, body: markdown.slice(match[0].length) }
}

function extractTags(value: string | undefined) {
  if (!value) {
    return []
  }

  return value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function estimateReadTime(markdown: string) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 220))
  return `${minutes} min read`
}

function normalizeSlug(path: string) {
  const fileName = path.split('/').pop() ?? ''
  return fileName.replace(/\.md$/, '')
}

function sortPosts(posts: Post[]) {
  return posts.sort((left, right) => {
    const leftNumber = Number.parseInt(left.slug.replace(/^day-/, ''), 10)
    const rightNumber = Number.parseInt(right.slug.replace(/^day-/, ''), 10)

    return rightNumber - leftNumber
  })
}

export function loadPosts(): Post[] {
  const postModules = Object.entries(modules).map(([path, source]) => ({
    path,
    source: source as string,
  }))

  const posts = postModules.map((module: PostModule) => {
    const { data, body } = extractFrontmatter(module.source)
    const slug = normalizeSlug(module.path)

    return {
      slug,
      title: data.title ?? 'Untitled entry',
      dateLabel: data.date ?? '',
      readTime: estimateReadTime(body),
      tags: extractTags(data.tags),
      source: module.source,
      contentHtml: marked.parse(body, { async: false }) as string,
    }
  })

  return sortPosts(posts)
}