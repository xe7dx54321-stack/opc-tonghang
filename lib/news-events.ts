import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const root = join(process.cwd(), 'content', 'news')

export interface EventReport {
  ref: string
  itemId: string
  editionDate: string
  url: string
  source: string
  owner: string
  publishedAt: string
  title: string
  narrative?: string
}
export interface NewsEvent {
  id: string
  title: string
  firstSeen: string
  lastSeen: string
  occurrences: { id: string; firstSeen: string; reports: EventReport[] }[]
}

function readJson(path: string): any | null {
  try { return JSON.parse(readFileSync(path, 'utf8')) } catch { return null }
}

/** Each day's file is a snapshot; the latest snapshot holds the full event history. */
export function listNewsEvents(): NewsEvent[] {
  const dir = join(root, 'events')
  if (!existsSync(dir)) return []
  const latest = new Map<string, NewsEvent>()
  for (const day of readdirSync(dir).filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort()) {
    const dayDir = join(dir, day)
    for (const file of readdirSync(dayDir).filter(f => /^event-[a-f0-9]{24}\.json$/.test(f))) {
      const raw = readJson(join(dayDir, file))
      if (raw?.schemaVersion !== 2 || raw.id !== file.slice(0, -5) || !Array.isArray(raw.occurrences)) continue
      const event: NewsEvent = {
        id: raw.id, title: String(raw.title ?? ''), firstSeen: String(raw.firstSeen ?? day),
        lastSeen: String(raw.lastSeen ?? day),
        occurrences: raw.occurrences.map((o: any) => ({ id: String(o.id ?? ''), firstSeen: String(o.firstSeen ?? day),
          reports: (Array.isArray(o.reports) ? o.reports : []).filter((r: any) => /^https?:\/\//.test(r.url ?? '')).map((r: any) => ({
            ref: String(r.ref ?? ''), itemId: String(r.itemId ?? ''), editionDate: String(r.editionDate ?? day),
            url: String(r.url), source: String(r.source ?? ''), owner: String(r.owner ?? ''),
            publishedAt: String(r.publishedAt ?? ''), title: String(r.title ?? ''),
          })) })) }
      if (!event.title || !event.occurrences.length) continue
      for (const occurrence of event.occurrences) for (const report of occurrence.reports) {
        const item = readJson(join(root, 'items', report.editionDate, `${report.itemId}.json`))
        if (item && !item.duplicateOf && item.eventId === event.id && typeof item.narrative === 'string') report.narrative = item.narrative
      }
      latest.set(event.id, event)
    }
  }
  return [...latest.values()].sort((a, b) => b.lastSeen.localeCompare(a.lastSeen) || a.id.localeCompare(b.id))
}

export function getNewsEvent(id: string): NewsEvent | null {
  if (!/^event-[a-f0-9]{24}$/.test(id)) return null
  return listNewsEvents().find(event => event.id === id) ?? null
}
