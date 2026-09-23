import type { NewsItem } from '@/lib/news'

export default function NewsTimeline({ items }: { items: NewsItem[] }) {
  const days = Array.from(new Set(items.map(item => item.publishedDate)))
  return (
    <div className="max-w-4xl">
      {days.map(date => (
        <section key={date} className="relative grid gap-4 pb-10 sm:grid-cols-[125px_1fr] sm:gap-8">
          <div className="font-num text-xs text-ink-3 sm:pt-2">{date}</div>
          <div className="relative border-l border-hair-2 pl-6 sm:pl-8">
            <span className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full border-2 border-accent bg-bg" aria-hidden="true" />
            <div className="space-y-4">
              {items.filter(item => item.publishedDate === date).map(item => (
                <article key={item.id} className="rounded-xl border border-hair bg-bg-card p-5 transition hover:border-hair-2 sm:p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-num text-[10px] uppercase tracking-[0.08em] text-ink-3">
                    <time dateTime={item.publishedAt}>{formatTime(item.publishedAt)}</time>
                    <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                    <span>{item.source.replace(/-/g, ' ')}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-ink sm:text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink-2">{item.summary}</p>
                  {item.investorNote && !item.investorNote.includes('建议结合一手来源') && (
                    <div className="mt-5 border-l-2 border-accent/70 bg-bg px-4 py-3 text-sm leading-7 text-ink-2">
                      <span className="mr-2 font-medium text-accent">研究判断</span>{item.investorNote}
                    </div>
                  )}
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex text-xs font-medium text-accent underline-offset-4 hover:underline">查看原文 ↗</a>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

function formatTime(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '时间未标注'
  return new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', hour: '2-digit', minute: '2-digit', hour12: false }).format(date) + ' · 北京时间'
}
