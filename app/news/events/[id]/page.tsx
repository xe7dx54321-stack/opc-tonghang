import Link from '@/components/Link'
import { getNewsEvent } from '@/lib/news-events'
import { notFound } from 'next/navigation'
import { genPageMetadata } from 'app/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const event = getNewsEvent(params.id)
  return event ? genPageMetadata({ title: `${event.title} · 事件追踪`, description: `追踪 ${event.title} 的原始报道和后续进展。` }) : {}
}

export default function NewsEventPage({ params }: { params: { id: string } }) {
  const event = getNewsEvent(params.id)
  if (!event) notFound()
  const timeline = [...event.occurrences].sort((a, b) => a.firstSeen.localeCompare(b.firstSeen))
  return <main className="container py-12">
    <Link href="/news/events" className="text-sm text-accent hover:underline">← 全部事件</Link>
    <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-snug text-ink sm:text-4xl">{event.title}</h1>
    <p className="mt-4 text-sm text-ink-3">首次收录 {event.firstSeen} · 最近进展 {event.lastSeen}</p>
    <div className="mt-10 max-w-3xl space-y-7 border-l border-hair-2 pl-6">
      {timeline.map((occurrence, index) => {
        const reports = [...occurrence.reports].sort((a, b) => a.publishedAt.localeCompare(b.publishedAt))
        const lead = reports.find(r => r.narrative) ?? reports[0]
        return <section key={occurrence.id} className="rounded-xl border border-hair bg-bg-card p-6">
          <div className="font-num text-xs text-accent">{String(index + 1).padStart(2, '0')} · {occurrence.firstSeen}</div>
          <h2 className="mt-3 text-xl font-semibold text-ink">{lead?.title ?? '后续进展'}</h2>
          {lead?.narrative && <p className="mt-4 text-sm leading-8 text-ink-2">{lead.narrative}</p>}
          <details className="mt-5 border-t border-hair pt-4 text-sm text-ink-2" open={reports.length === 1}>
            <summary className="cursor-pointer text-accent">原始报道 · {reports.length} 篇</summary>
            <ul className="mt-3 space-y-2">
              {reports.map(report => <li key={report.ref}>
                <a href={report.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{report.owner || report.source} · {report.title} ↗</a>
                <span className="ml-2 text-xs text-ink-3">{report.publishedAt.slice(0, 10)}</span>
              </li>)}
            </ul>
          </details>
        </section>
      })}
    </div>
  </main>
}
