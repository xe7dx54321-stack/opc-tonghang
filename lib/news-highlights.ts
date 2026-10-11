import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { listHeatEvents } from './news-heat'

const root = join(process.cwd(), 'content', 'news')

export interface NewsHighlight {
  id: string
  eventId: string
  date: string
  title: string
  narrative: string
  topic: string
  sources: { name: string; url: string }[]
  multiSource: boolean
}

function readJson(path: string): any | null {
  try { return JSON.parse(readFileSync(path, 'utf8')) } catch { return null }
}

function urlKey(url: string): string {
  return url.replace(/\/$/, '')
}

function topicLabel(topics: unknown): string {
  if (!Array.isArray(topics)) return 'AI'
  if (topics.includes('embodied-ai')) return '具身智能'
  if (topics.includes('semiconductor')) return '半导体'
  return 'AI'
}

/** Read the already edited editions; no raw candidates, model call or new news judgement. */
export function listNewsHighlights(limit = 10): NewsHighlight[] {
  const dir = join(root, 'editions')
  if (!existsSync(dir)) return []
  const days = readdirSync(dir).filter(file => /^\d{4}-\d{2}-\d{2}\.json$/.test(file)).sort().reverse().slice(0, 2)
  const heat = listHeatEvents()
  const seen = new Set<string>()
  const result: NewsHighlight[] = []
  for (const [dayIndex, file] of days.entries()) {
    const date = file.slice(0, 10)
    const edition = readJson(join(dir, file))
    if (edition?.schemaVersion !== 2 || edition.date !== date || !Array.isArray(edition.stories)) continue
    const stories = dayIndex === 0 ? edition.stories : [...edition.stories].sort((a: any, b: any) => {
      const linked = (story: any) => {
        const item = readJson(join(root, 'items', date, `${story.itemId}.json`))
        return heat.some(entry => entry.sources.some(source => urlKey(source.url) === urlKey(item?.url ?? ''))) ? 1 : 0
      }
      return linked(b) - linked(a)
    })
    for (const story of stories) {
      if (result.length >= limit) return result
      if (typeof story.eventId !== 'string' || typeof story.itemId !== 'string' || seen.has(story.eventId)) continue
      const item = readJson(join(root, 'items', date, `${story.itemId}.json`))
      if (!item || item.duplicateOf || item.eventId !== story.eventId || !/^https?:\/\//.test(item.url ?? '') ||
          typeof item.narrative !== 'string' || !/[\u3400-\u9fff]/.test(item.narrative)) continue
      const event = readJson(join(root, 'events', date, `${story.eventId}.json`))
      const occurrence = event?.occurrences?.find((o: any) => o.id === story.occurrenceId)
      const reports = (Array.isArray(occurrence?.reports) ? occurrence.reports : [])
        .filter((report: any) => /^https?:\/\//.test(report.url ?? ''))
      const linkedHeat = heat.find(entry => entry.sources.some(source =>
        source.url === urlKey(item.url) || reports.some((report: any) => urlKey(report.url) === urlKey(source.url))))
      const reportSources = new Map<string, { name: string; url: string }>()
      for (const report of reports) {
        const name = String(report.owner || report.source || new URL(report.url).hostname)
        reportSources.set(name, { name, url: String(report.url) })
      }
      const sourceList: { name: string; url: string }[] = linkedHeat?.sources ?? [...reportSources.values()]
      if (!sourceList.length) sourceList.push({ name: String(item.source ?? new URL(item.url).hostname), url: item.url })
      const sources = [...new Map(sourceList.map(source => [urlKey(source.url), source])).values()]
      seen.add(story.eventId)
      result.push({ id: story.itemId, eventId: story.eventId, date,
        title: String(story.heading || item.displayTitle || item.title),
        narrative: item.narrative.replace(/\*\*/g, '').trim(), topic: topicLabel(item.topic),
        sources, multiSource: linkedHeat != null || new Set(reports.map((r: any) => r.owner)).size >= 2 })
    }
  }
  return result
}
