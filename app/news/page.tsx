// app/news/page.tsx · 新闻动态 · 默认页（今日 + 历史索引）

import NewsReader from '@/components/news/NewsReader'
import NewsList from '@/components/news/NewsList'
import { getLatestDaily, listDaily } from '@/lib/news'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: '新闻动态',
  description: '同行实验室 · AI / 半导体 / 机器人 一日要闻 + arxiv 每周研究简报。',
})

export default function NewsIndex() {
  const latest = getLatestDaily()
  const all = listDaily()

  return (
    <>
      {/* Hero */}
      <section className="border-b border-hair pb-10 pt-12">
        <div className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">
          /news
        </div>
        <h1 className="mt-3 text-brand-gradient text-4xl font-bold tracking-tight sm:text-5xl">
          新闻动态
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
          AI / 半导体 / 机器人 一日要闻，每日由 harness 拉取 38 个 RSS 源 + arxiv + HN 筛选后输出。
          arxiv 每周日另出一份研究简报。
        </p>
      </section>

      {/* 今日 */}
      {latest ? (
        <section className="container py-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight text-ink">
              今日 · {latest.slug}
            </h2>
            <span className="font-num text-[10px] text-ink-3">
              {latest.meta.itemCount != null ? `${latest.meta.itemCount} 条入选` : ''}
              {latest.meta.majorCount != null ? ` · 重大 ${latest.meta.majorCount}` : ''}
            </span>
          </div>
          <NewsReader body={latest.body} />
        </section>
      ) : (
        <section className="container py-12">
          <p className="text-sm text-ink-3">
            暂无内容。运行 <code className="font-num text-accent">news-harness/commands/daily.md</code> 后会出现在这里。
          </p>
        </section>
      )}

      {/* 历史索引 */}
      {all.length > 1 && (
        <section className="container pb-16">
          <NewsList entries={all} title="历史日报" />
        </section>
      )}
    </>
  )
}