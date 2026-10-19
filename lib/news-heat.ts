import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { isNewsDayActive } from './news-retention'

export interface HeatEvent {
  id: string
  title: string
  summary: string
  sourceCount: number
  sources: { name: string; url: string }[]
  memberUrls: string[]
  snapshotDate: string
}

/** Public exports contain editor-linked events only; private watch/provisional snapshots never enter this directory. */
export function listHeatEvents(): HeatEvent[] {
  const dir = join(process.cwd(), 'content', 'news', 'heat')
  if (!existsSync(dir)) return []
  const latest = new Map<string, HeatEvent>()
  for (const file of readdirSync(dir).filter(name => /^\d{4}-\d{2}-\d{2}\.json$/.test(name) && isNewsDayActive(name.slice(0, 10))).sort()) {
    try {
      const data = JSON.parse(readFileSync(join(dir, file), 'utf8'))
      if (data.schemaVersion !== 1 || data.date !== file.slice(0, 10) || !Array.isArray(data.events)) continue
      for (const event of data.events) {
        if (typeof event.id !== 'string' || typeof event.title !== 'string' ||
            event.sourceCount < 2 || !Array.isArray(event.sources) || event.sources.length < 2) continue
        const sources = event.sources.filter((source: any) => typeof source.name === 'string' && /^https?:\/\//.test(source.url ?? ''))
        if (sources.length < 2) continue
        const memberUrls = Array.isArray(event.memberUrls)
          ? event.memberUrls.filter((url: unknown) => typeof url === 'string' && /^https?:\/\//.test(url))
          : sources.map((source: { url: string }) => source.url)
        latest.set(event.id, { id: event.id, title: event.title, summary: String(event.summary ?? ''),
          sourceCount: event.sourceCount, sources, memberUrls, snapshotDate: data.date })
      }
    } catch { /* Ignore malformed older exports rather than break the news page. */ }
  }
  return [...latest.values()].sort((a, b) => b.snapshotDate.localeCompare(a.snapshotDate) || a.id.localeCompare(b.id))
}
