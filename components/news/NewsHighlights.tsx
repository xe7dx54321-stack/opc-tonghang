import Link from '@/components/Link'
import type { NewsHighlight } from '@/lib/news-highlights'

export default function NewsHighlights({ items }: { items: NewsHighlight[] }) {
  if (!items.length) return null
  return <section className="pb-11 pt-8 sm:pb-14 sm:pt-10" aria-labelledby="news-highlights-title">
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="font-num text-[11px] uppercase tracking-[0.2em] text-accent">editor's selection</div>
        <h2 id="news-highlights-title" className="mt-2 text-2xl font-semibold tracking-tight text-ink">近期焦点</h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-ink-2">从最近两期日报中挑出的已核验事件。先看发生了什么、为什么值得留意，再按需打开原文或事件脉络。</p>
      </div>
      <span className="font-num text-xs text-ink-3">{items.length} 件事件 · 最近收录 {items[0].date}</span>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item, index) => <article key={item.id} className={`rounded-xl border border-hair bg-bg-card p-5 sm:p-6 ${index === 0 ? 'md:col-span-2' : ''}`}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-num text-xs text-ink-3">
          <span>{item.date} 收录</span><span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
          <span>{item.topic}</span>
          {item.multiSource && <span className="rounded-full border border-accent/30 px-2 py-0.5 text-accent">{item.sources.length} 家独立来源关注</span>}
        </div>
        <h3 className={`mt-3 font-semibold leading-snug text-ink ${index === 0 ? 'text-2xl' : 'text-lg'}`}>
          <Link href={`/news/events/${item.eventId}`} className="hover:text-accent">{item.title}</Link>
        </h3>
        <p className={`mt-3 text-sm leading-7 text-ink-2 ${index === 0 ? '' : 'line-clamp-4'}`}>{item.narrative}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-hair pt-4 text-sm">
          <Link href={`/news/events/${item.eventId}`} className="font-medium text-accent hover:underline">查看事件脉络 →</Link>
          {item.sources.slice(0, 3).map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="text-ink-3 hover:text-accent hover:underline">{source.name} ↗</a>)}
        </div>
      </article>)}
    </div>
    <p className="mt-4 text-xs text-ink-3">本期按日报编辑顺序展示，补充上一期已有跨源线索的事件；多源标记表示报道覆盖，不代表事实已被独立证实。</p>
  </section>
}
