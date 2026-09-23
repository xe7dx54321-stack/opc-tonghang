// app/news/[date]/page.tsx · 单日日报
// dynamic route, generateStaticParams 列出所有已知日期

import DailyDigestReader from '@/components/news/DailyDigestReader'
import { getDaily, listDaily } from '@/lib/news'
import { notFound } from 'next/navigation'
import Link from '@/components/Link'
import JsonLd, { newsArticleSchema } from '@/components/JsonLd'
import { genPageMetadata } from 'app/seo'

export const dynamicParams = false  // 未知日期返回 404，不 fallback

export function generateStaticParams() {
  return listDaily().map(e => ({ date: e.slug }))
}

export async function generateMetadata({ params }: { params: { date: string } }) {
  const e = getDaily(params.date)
  if (!e) return {}
  return genPageMetadata({
    title: `${params.date} · 新闻日报`,
    description: `同行实验室日报 · ${params.date} · AI / 半导体 / 机器人。`,
  })
}

export default function NewsDayPage({ params }: { params: { date: string } }) {
  const entry = getDaily(params.date)
  if (!entry) notFound()

  const all = listDaily()
  const idx = all.findIndex(e => e.slug === params.date)
  const newer = all[idx + 1]   // older in date order? all is desc, so idx+1 is older
  const older = all[idx - 1]   // newer

  return (
    <>
      <JsonLd
        data={newsArticleSchema({
          headline: `${params.date} · 同行实验室日报`,
          description: `同行实验室日报 · ${params.date} · AI / 半导体 / 机器人。`,
          url: `/news/${params.date}`,
          datePublished: entry.meta.generatedAt ?? `${params.date}T20:00:00+08:00`,
          keywords: entry.meta.topics ?? ['AI', '半导体', '机器人'],
          articleSection: entry.meta.topics?.join(' / ') ?? 'AI / 半导体 / 机器人',
        })}
      />
      <section className="border-b border-hair pb-10 pt-12">
        <div className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">
          /news · daily
        </div>
        <h1 className="mt-3 text-brand-gradient text-4xl font-bold tracking-tight sm:text-5xl">
          {params.date} · 同行实验室日报
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-2">
          {entry.meta.itemCount != null
            ? `本日入选 ${entry.meta.itemCount} 条（重大 ${entry.meta.majorCount ?? '?'}）`
            : '本日要闻速读'}
          {entry.meta.topics && entry.meta.topics.length > 0 && (
            <span className="ml-2 text-ink-3">
              · {entry.meta.topics.join(' / ')}
            </span>
          )}
        </p>
        <div className="mt-6 flex items-center gap-4 font-num text-xs text-ink-3">
          {older && (
            <Link href={`/news/${older.slug}`} className="text-accent hover:underline">
              ← {older.slug}
            </Link>
          )}
          {newer && (
            <Link href={`/news/${newer.slug}`} className="ml-auto text-accent hover:underline">
              {newer.slug} →
            </Link>
          )}
        </div>
      </section>

      <section className="container py-12">
        <DailyDigestReader body={entry.body} />
      </section>
    </>
  )
}
