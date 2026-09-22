// app/news/research/page.tsx · arxiv 每周研究简报 · 索引页

import NewsList from '@/components/news/NewsList'
import { listResearch } from '@/lib/news'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'arXiv 周研究简报',
  description: '同行实验室 · 每周 arxiv 7 天 × 11 类目 = 220 篇 raw 精选后输出 6 个研究方向的简报。',
})

export default function ResearchIndex() {
  const all = listResearch()

  return (
    <>
      <section className="border-b border-hair pb-10 pt-12">
        <div className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">
          /news/research
        </div>
        <h1 className="mt-3 text-brand-gradient text-4xl font-bold tracking-tight sm:text-5xl">
          arXiv 周研究简报
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
          每周由 harness 扫描 arXiv 7 天 × 11 类目 = 约 220 篇原始，按 6 个研究
          方向（LLM 基础 / Agent / 世界模型 / 具身 VLA / AI 芯片 / 硅前沿）
          评分后精选约 30 篇，按 narrative 风格输出。
        </p>
        <p className="mt-3 text-sm text-ink-3">
          默认每周日由 commands/weekly.md 触发；agent 自身每次会话可按需执行。
        </p>
      </section>

      <section className="container py-12">
        {all.length === 0 ? (
          <p className="text-sm text-ink-3">
            暂无周报。运行 <code className="font-num text-accent">commands/weekly.md</code> 后会出现在这里。
          </p>
        ) : (
          <NewsList entries={all} title="所有周报" emptyText="暂无周报" />
        )}
      </section>
    </>
  )
}