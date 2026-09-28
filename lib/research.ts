import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export type ResearchChannel = 'industry' | 'signal'
export interface ResearchArticle {
  id: string
  channel: ResearchChannel
  title: string
  summary: string
  date: string
  topic: string
  sources: string[]
  publishedAt?: string
  series?: string
  chapter?: string
  body: string
}

const root = join(process.cwd(), 'content', 'research')
export function listResearchArticles(): ResearchArticle[] {
  const articles: ResearchArticle[] = []
  for (const channel of ['industry', 'signal'] as const) {
    const dir = join(root, channel)
    if (!existsSync(dir)) continue
    for (const file of readdirSync(dir).filter(name => /^\d{4}-\d{2}-\d{2}-[a-z0-9-]+\.json$/.test(name))) {
      try {
        const id = file.slice(0, -5)
        const meta = JSON.parse(readFileSync(join(dir, file), 'utf8'))
        const bodyPath = join(dir, `${id}.md`)
        if (meta.id !== id || meta.channel !== channel || !existsSync(bodyPath)) continue
        articles.push({ ...meta, body: readFileSync(bodyPath, 'utf8') })
      } catch { /* malformed snapshot does not become a public route */ }
    }
  }
  return articles.sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id))
}
export function getResearchArticle(channel: string, id: string): ResearchArticle | undefined {
  if (channel !== 'industry' && channel !== 'signal') return undefined
  if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/.test(id)) return undefined
  return listResearchArticles().find(article => article.channel === channel && article.id === id)
}
