import Link from '@/components/Link'
import { listHeatEvents } from '@/lib/news-heat'
import { genPageMetadata } from 'app/seo'

export const dynamic = 'force-dynamic'
export const metadata = genPageMetadata({ title: '多源关注 · 新闻动态', description: '查看编辑确认的跨媒体同事件报道及原始来源。' })

export default function NewsHeatPage() {
  const events = listHeatEvents()
  return <main className="container py-12">
    <Link href="/news" className="text-sm text-accent hover:underline">← 新闻动态</Link>
    <div className="mt-8 font-num text-[11px] uppercase tracking-[0.2em] text-accent">/news · multi-source</div>
    <h1 className="mt-3 text-4xl font-bold text-ink">多源关注</h1>
    <p className="mt-4 max-w-3xl leading-8 text-ink-2">同一件事被几家独立媒体报道时，这里把已核对的报道放在一起。来源数量反映报道覆盖度，不代表事实已获得独立证实，也不等于事件的重要程度。</p>
    <p className="mt-3 text-sm text-ink-3">试运行中 · 按每日快照更新 · 暂不计算升温趋势</p>
    <div className="mt-9 grid gap-5 lg:grid-cols-2">
      {events.slice(0, 20).map(event => <article key={event.id} className="rounded-2xl border border-hair bg-bg-card p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-3 font-num text-xs text-ink-3">
          <span>{event.snapshotDate} 快照</span>
          <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
          <span>{event.sourceCount} 家独立来源</span>
        </div>
        <h2 className="mt-4 text-xl font-semibold leading-8 text-ink">{event.title}</h2>
        {event.summary && <p className="mt-3 text-sm leading-7 text-ink-2">{event.summary}</p>}
        <div className="mt-5 border-t border-hair pt-4">
          <div className="font-num text-[11px] text-ink-3">原始报道</div>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
            {event.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">{source.name} ↗</a>)}
          </div>
        </div>
      </article>)}
    </div>
    {!events.length && <p className="mt-10 text-ink-2">目前没有经编辑确认的跨源事件。每日重点仍可在<Link href="/news/archive" className="ml-1 text-accent">日报</Link>中阅读。</p>}
  </main>
}
