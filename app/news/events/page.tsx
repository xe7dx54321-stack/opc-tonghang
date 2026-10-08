import Link from '@/components/Link'
import { listNewsEvents } from '@/lib/news-events'
import { genPageMetadata } from 'app/seo'

export const dynamic = 'force-dynamic'
export const metadata = genPageMetadata({ title: '事件追踪 · 新闻动态', description: '按事件阅读新闻进展、原始报道与后续变化。' })

export default function NewsEventsPage() {
  const events = listNewsEvents()
  return <main className="container py-12">
    <div className="font-num text-[11px] uppercase tracking-[0.2em] text-accent">/news · events</div>
    <h1 className="mt-3 text-4xl font-bold text-ink">事件追踪</h1>
    <p className="mt-4 text-ink-2">同一件事的报道放在一起，新的进展沿时间顺序接上。</p>
    <div className="mt-10 grid gap-4 md:grid-cols-2">
      {events.map(event => <Link key={event.id} href={`/news/events/${event.id}`} className="rounded-xl border border-hair bg-bg-card p-6 transition hover:border-accent">
        <div className="font-num text-xs text-ink-3">{event.firstSeen} 起 · 最近 {event.lastSeen}</div>
        <h2 className="mt-3 text-lg font-semibold text-ink">{event.title}</h2>
        <p className="mt-3 text-sm text-ink-2">{event.occurrences.length} 次进展 · {event.occurrences.reduce((n, o) => n + o.reports.length, 0)} 篇原始报道</p>
        <span className="mt-5 inline-block text-sm text-accent">查看进展 →</span>
      </Link>)}
    </div>
    {!events.length && <p className="mt-10 text-ink-2">事件资料正在积累，先到<Link href="/news/archive" className="ml-1 text-accent">每日综述</Link>阅读最新一期。</p>}
  </main>
}
