// app/news/research/[date]/page.tsx · 单期 arxiv 周研究简报

import NewsReader from '@/components/news/NewsReader'
import { getResearch, listResearch } from '@/lib/news'
import { notFound } from 'next/navigation'
import Link from '@/components/Link'
import JsonLd, { newsArticleSchema } from '@/components/JsonLd'
import { genPageMetadata } from 'app/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return listResearch().map(e => ({ date: e.slug }))
}

export async function generateMetadata({ params }: { params: { date: string } }) {
  return genPageMetadata({
    title: `${params.date} · arXiv 周研究简报`,
    description: `同行实验室 · arxiv 7 天研究简报 · ${params.date}`,
  })
}

export default function ResearchWeekPage({ params }: { params: { date: string } }) {
  const entry = getResearch(params.date)
  if (!entry) notFound()

  const all = listResearch()
  const idx = all.findIndex(e => e.slug === params.date)
  const older = all[idx + 1]
  const newer = all[idx - 1]

  return (
    <>
      <JsonLd
        data={newsArticleSchema({
          headline: `${params.date} · arXiv 周研究简报`,
          description: `同行实验室 · arxiv 7 天研究简报 · ${params.date}`,
          url: `/news/research/${params.date}`,
          datePublished: entry.meta.generatedAt ?? `${params.date}T20:00:00+08:00`,
          keywords: ['arxiv', 'LLM', 'Agent', '具身智能', 'AI 芯片'],
          articleSection: 'arXiv 周研究简报',
        })}
      />
      <section className="border-b border-hair pb-10 pt-12">
        <div className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">
          /news/research · weekly
        </div>
        <h1 className="mt-3 text-brand-gradient text-4xl font-bold tracking-tight sm:text-5xl">
          {params.date} · arXiv 周研究简报
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-2">
          {entry.meta.totalPapers != null
            ? `本周扫描 ${entry.meta.totalPapers} 篇，6 个研究方向精选后输出研究简报`
            : '本周 arxiv 研究简报'}
          {entry.meta.topics && entry.meta.topics.length > 0 && (
            <span className="ml-2 text-ink-3">
              · {entry.meta.topics.join(' / ')}
            </span>
          )}
        </p>
        <div className="mt-6 flex items-center gap-4 font-num text-xs text-ink-3">
          {older && (
            <Link href={`/news/research/${older.slug}`} className="text-accent hover:underline">
              ← {older.slug}
            </Link>
          )}
          {newer && (
            <Link href={`/news/research/${newer.slug}`} className="ml-auto text-accent hover:underline">
              {newer.slug} →
            </Link>
          )}
        </div>
      </section>

      <section className="container py-12">
        <NewsReader body={entry.body} />
      </section>
    </>
  )
}