// lib/news.ts · 读取 news-harness 同步过来的新闻内容
// 这是个 server-only lib（fs 操作），只能在 RSC 或 route handler 里调用。

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

const CONTENT_ROOT = join(process.cwd(), 'content', 'news')

export interface NewsMeta {
  date: string
  generatedAt?: string
  itemCount?: number
  majorCount?: number
  topics?: string[]
  type?: 'daily' | 'weekly'
  windowDays?: number
  totalPapers?: number
}

export interface NewsEntry {
  slug: string               // 文件名（YYYY-MM-DD）
  path: string               // 相对路径
  meta: NewsMeta
  body: string               // markdown body
}

/** 列出 daily digest 所有日期（倒序） */
export function listDaily(): NewsEntry[] {
  const dir = join(CONTENT_ROOT, 'daily')
  if (!existsSync(dir)) return []
  const entries = readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => parseFile(join(dir, f), 'daily'))
    .filter((e): e is NewsEntry => Boolean(e))
  return entries.sort((a, b) => b.slug.localeCompare(a.slug))
}

/** 列出 research weekly 所有日期（倒序） */
export function listResearch(): NewsEntry[] {
  const dir = join(CONTENT_ROOT, 'research')
  if (!existsSync(dir)) return []
  const entries = readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => parseFile(join(dir, f), 'weekly'))
    .filter((e): e is NewsEntry => Boolean(e))
  return entries.sort((a, b) => b.slug.localeCompare(a.slug))
}

/** 读单篇 daily（按日期） */
export function getDaily(date: string): NewsEntry | null {
  const path = join(CONTENT_ROOT, 'daily', `${date}.md`)
  return parseFile(path, 'daily')
}

/** 读单篇 research（按日期） */
export function getResearch(date: string): NewsEntry | null {
  const path = join(CONTENT_ROOT, 'research', `${date}.md`)
  return parseFile(path, 'weekly')
}

/** 拿最新一篇 daily */
export function getLatestDaily(): NewsEntry | null {
  const all = listDaily()
  return all[0] ?? null
}

/** 拿最新一篇 research */
export function getLatestResearch(): NewsEntry | null {
  const all = listResearch()
  return all[0] ?? null
}

/** 按 topic 过滤 daily */
export function listDailyByTopic(topic: string): NewsEntry[] {
  return listDaily().filter(e =>
    (e.meta.topics ?? []).map(t => t.toLowerCase()).includes(topic.toLowerCase())
  )
}

/** 列出可用的 topic（union of meta.topics across all daily） */
export function listTopics(): string[] {
  const set = new Set<string>()
  for (const e of listDaily()) {
    for (const t of e.meta.topics ?? []) set.add(t)
  }
  return Array.from(set).sort()
}

// ===== helpers =====

function parseFile(path: string, type: 'daily' | 'weekly'): NewsEntry | null {
  if (!existsSync(path)) return null
  try {
    const raw = readFileSync(path, 'utf8')
    const parsed = matter(raw)
    const slug = basenameOf(path)
    return {
      slug,
      path,
      meta: { type, ...(parsed.data as NewsMeta) },
      body: parsed.content,
    }
  } catch {
    return null
  }
}

function basenameOf(p: string): string {
  return p.split('/').pop()!.replace(/\.md$/, '')
}