// app/news/topic/[tag]/page.tsx · 按 topic 过滤的日报列表
// 已知 topic: ai / semiconductor / embodied-ai / other

import NewsList from '@/components/news/NewsList'
import { listDailyByTopic, listTopics } from '@/lib/news'
import { notFound } from 'next/navigation'
import { genPageMetadata } from 'app/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return listTopics().map(tag => ({ tag }))
}

export async function generateMetadata({ params }: { params: { tag: string } }) {
  return genPageMetadata({
    title: `${params.tag} · 主题日报`,
    description: `同行实验室日报 · 按主题 ${params.tag} 过滤。`,
  })
}

const TOPIC_NAMES: Record<string, string> = {
  ai: 'AI',
  semiconductor: '半导体',
  'embodied-ai': '具身智能',
  other: '其他',
}

export default function TopicPage({ params }: { params: { tag: string } }) {
  const entries = listDailyByTopic(params.tag)
  if (entries.length === 0) notFound()

  const displayName = TOPIC_NAMES[params.tag] ?? params.tag

  return (
    <>
      <section className="border-b border-hair pb-10 pt-12">
        <div className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">
          /news · topic
        </div>
        <h1 className="mt-3 text-brand-gradient text-4xl font-bold tracking-tight sm:text-5xl">
          {displayName} 主题日报
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-2">
          按 <code className="font-num text-accent">{params.tag}</code> 过滤的所有日报，共 {entries.length} 篇。
        </p>
      </section>

      <section className="container py-12">
        <NewsList entries={entries} emptyText="该主题下暂无日报" />
      </section>
    </>
  )
}