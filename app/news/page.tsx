import Link from '@/components/Link'
import { NEWS_TOPICS, listDaily, listNewsItems } from '@/lib/news'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: '新闻动态',
  description: '同行实验室新闻动态：按人工智能、半导体、具身智能分类阅读，每条新闻用一段文字呈现事件与分析。',
})

export default function NewsIndex() {
  const items = listNewsItems()
  const latestDate = items.reduce((latest, item) => item.date > latest ? item.date : latest, '')
  const daily = listDaily()

  return (
    <>
      <section className="hero-glow relative isolate overflow-hidden border-b border-hair pb-12 pt-12 sm:pb-16">
        <div className="bg-grid-faint absolute inset-0 -z-10 opacity-50" />
        <div className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">/news · signal desk</div>
        <div className="mt-5 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-brand-gradient text-4xl font-bold tracking-tight sm:text-5xl">新闻动态</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-2 sm:text-lg">
              从每天的资讯流里，挑出值得继续跟踪的产业信号。
              按赛道阅读事实、来源与值得关注的变化。
            </p>
          </div>
          {latestDate && (
            <div className="flex shrink-0 items-center gap-3 rounded-full border border-hair-2 bg-bg-card px-4 py-2 font-num text-[11px] text-ink-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
              最近更新 · {latestDate}
            </div>
          )}
        </div>
      </section>

      <section className="py-11 sm:py-14">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <div className="font-num text-[11px] uppercase tracking-[0.2em] text-accent">01 / channels</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">选择关注的赛道</h2>
          </div>
          <span className="hidden font-num text-xs text-ink-3 sm:block">3 个主题频道</span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {NEWS_TOPICS.map(topic => {
            const stories = items.filter(item => item.topic === topic.slug)
            return (
              <Link
                key={topic.slug}
                href={`/news/topic/${topic.slug}`}
                className="group relative flex min-h-[330px] flex-col overflow-hidden rounded-2xl border border-hair bg-bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-hair-2 hover:shadow-[0_18px_45px_-25px_rgba(0,224,199,0.22)]"
              >
                <div className="absolute -right-4 -top-10 font-num text-[140px] font-bold leading-none text-accent opacity-[0.055] transition group-hover:opacity-[0.10]" aria-hidden="true">{topic.index}</div>
                <div className="relative flex items-center justify-between">
                  <span className="font-num text-[11px] uppercase tracking-[0.18em] text-accent">/{topic.slug}</span>
                  <span className="rounded-full border border-hair-2 bg-bg px-2.5 py-1 font-num text-[10px] text-ink-3">{stories.length} 条</span>
                </div>
                <div className="relative mt-10">
                  <h3 className="text-3xl font-bold tracking-tight text-ink group-hover:text-accent">{topic.name}</h3>
                  <p className="mt-1 font-num text-[11px] tracking-wide text-ink-3">{topic.english}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-2">{topic.description}</p>
                </div>
                <div className="relative mt-auto border-t border-hair pt-5">
                  <div className="font-num text-[10px] uppercase tracking-[0.15em] text-ink-3">最近收录</div>
                  <p className="mt-2 line-clamp-2 min-h-[42px] text-sm font-medium leading-relaxed text-ink">
                    {stories[0]?.displayTitle ?? '正在整理这个赛道的新闻'}
                  </p>
                  <div className="mt-5 flex items-center justify-between text-xs text-ink-3">
                    <span className="font-num">{stories[0]?.publishedDate ?? '—'}</span>
                    <span className="text-accent transition-transform group-hover:translate-x-1">进入时间轴 →</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mb-16 rounded-xl border border-hair bg-bg-card px-6 py-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
        <div>
          <div className="font-num text-[11px] uppercase tracking-[0.18em] text-accent">/archive</div>
          <h2 className="mt-2 text-lg font-semibold text-ink">按日期回看</h2>
          <p className="mt-1 text-sm text-ink-2">每日综述和每周研究简报，保留完整的编辑脉络。</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-3 sm:mt-0">
          {daily[0] && <Link href="/news/archive" className="rounded-md border border-hair-2 px-4 py-2 text-sm text-ink-2 transition hover:border-accent hover:text-accent">每日综述 ↗</Link>}
          <Link href="/news/research" className="rounded-md border border-hair-2 px-4 py-2 text-sm text-ink-2 transition hover:border-accent hover:text-accent">每周研究 ↗</Link>
        </div>
      </section>
    </>
  )
}
