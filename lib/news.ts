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
    .filter(f => /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
    .map(f => parseFile(join(dir, f), 'daily'))
    .filter((e): e is NewsEntry => Boolean(e))
  return entries.sort((a, b) => b.slug.localeCompare(a.slug))
}

/** 列出 research weekly 所有日期（倒序） */
export function listResearch(): NewsEntry[] {
  const dir = join(CONTENT_ROOT, 'research')
  if (!existsSync(dir)) return []
  const entries = readdirSync(dir)
    .filter(f => /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
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

export const NEWS_TOPICS = [
  { slug: 'ai', name: 'AI', english: 'Artificial Intelligence', description: '模型、Agent、算力与应用的关键变化。', index: '01' },
  { slug: 'semiconductor', name: '半导体', english: 'Semiconductors', description: '芯片、先进封装与供应链的产业信号。', index: '02' },
  { slug: 'embodied-ai', name: '具身智能', english: 'Embodied AI', description: '机器人、物理 AI 与软硬件协同的最新进展。', index: '03' },
] as const

export type NewsTopic = (typeof NEWS_TOPICS)[number]['slug']

export interface NewsItem {
  id: string
  displayTitle: string
  url: string
  source: string
  topic: NewsTopic
  date: string
  publishedAt: string
  publishedDate: string
  narrative: string
  score: number
}

/** 只发布经过中文编辑的逐条内容；较早的原始回填数据留在仓库供后续整理。 */
export function listNewsItems(): NewsItem[] {
  const root = join(CONTENT_ROOT, 'items')
  if (!existsSync(root)) return []

  const seen = new Set<string>()
  const items: NewsItem[] = []
  const days = readdirSync(root).filter(day => /^\d{4}-\d{2}-\d{2}$/.test(day)).sort().reverse()
  for (const date of days) {
    const dir = join(root, date)
    if (!statSync(dir).isDirectory()) continue
    for (const file of readdirSync(dir).filter(f => f.endsWith('.json') && f !== '_index.json')) {
      try {
        const raw = JSON.parse(readFileSync(join(dir, file), 'utf8'))
        if (!raw.id || !/^https?:\/\//i.test(raw.url ?? '') || raw.duplicateOf || typeof raw.score !== 'number' || raw.score < 0.4) continue
        const displayTitle = cleanNewsText(raw.displayTitle)
        const narrative = cleanNewsText(raw.narrative)
        if (!/[\u3400-\u9fff]/.test(displayTitle) || !/[\u3400-\u9fff]/.test(narrative)) continue
        const topic = classifyNewsItem(raw.topic, `${raw.title ?? ''} ${raw.summary ?? ''} ${displayTitle} ${narrative}`)
        if (!topic) continue
        const urlKey = String(raw.url).replace(/\/$/, '')
        if (seen.has(urlKey)) continue
        seen.add(urlKey)
        items.push({
          id: String(raw.id),
          displayTitle,
          url: String(raw.url),
          source: String(raw.source ?? '原始来源'),
          topic,
          date,
          publishedAt: String(raw.publishedAt ?? ''),
          publishedDate: formatBeijingDate(raw.publishedAt) ?? date,
          narrative,
          score: raw.score,
        })
      } catch {
        // 单条损坏不影响整页新闻。
      }
    }
  }
  return items.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function listNewsItemsByTopic(topic: NewsTopic): NewsItem[] {
  return listNewsItems().filter(item => item.topic === topic)
}

function classifyNewsItem(topics: unknown, text: string): NewsTopic | null {
  if (!Array.isArray(topics)) return null
  // 原始多标签有较多误报；每条新闻归入最贴切的一个频道。
  if (topics.includes('embodied-ai') && /机器人|机械臂|具身|灵巧手|移动底盘|robot|physical ai|\bvla\b|\bros\b/i.test(text)) return 'embodied-ai'
  if (topics.includes('semiconductor') && /半导体|芯片|晶圆|封装|存储芯片|加速芯片|\bchip\b|\bsoc\b|\bnpu\b|\bdram\b|\bnand\b|\bhbm\b|\bbeol\b/i.test(text)) return 'semiconductor'
  if (topics.includes('ai')) return 'ai'
  return null
}

function cleanNewsText(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value
    .replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&quot;/gi, '"')
    .replace(/&#(?:0*39|x0*27);/gi, "'").replace(/&amp;/gi, '&')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ').trim()
}

function formatBeijingDate(value: unknown): string | null {
  const date = new Date(String(value ?? ''))
  if (Number.isNaN(date.getTime())) return null
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(date)
  const part = (type: string) => parts.find(p => p.type === type)?.value
  return `${part('year')}-${part('month')}-${part('day')}`
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
