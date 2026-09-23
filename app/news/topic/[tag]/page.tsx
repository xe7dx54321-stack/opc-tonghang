import Link from '@/components/Link'
import NewsTimeline from '@/components/news/NewsTimeline'
import { NEWS_TOPICS, listNewsItemsByTopic, type NewsTopic } from '@/lib/news'
import { notFound } from 'next/navigation'
import { genPageMetadata } from 'app/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return NEWS_TOPICS.map(topic => ({ tag: topic.slug }))
}

export async function generateMetadata({ params }: { params: { tag: string } }) {
  const topic = NEWS_TOPICS.find(topic => topic.slug === params.tag)
  if (!topic) return {}
  return genPageMetadata({
    title: `${topic.name} · 新闻动态`,
    description: `同行实验室 ${topic.name} 新闻时间轴。${topic.description}`,
  })
}

export default function TopicPage({ params }: { params: { tag: string } }) {
  const topic = NEWS_TOPICS.find(topic => topic.slug === params.tag)
  if (!topic) notFound()
  const items = listNewsItemsByTopic(topic.slug as NewsTopic)

  return (
    <>
      <section className="hero-glow relative isolate overflow-hidden border-b border-hair pb-10 pt-10 sm:pb-12">
        <div className="bg-grid-faint absolute inset-0 -z-10 opacity-40" />
        <Link href="/news" className="font-num text-[11px] uppercase tracking-[0.18em] text-ink-3 transition hover:text-accent">← 新闻动态</Link>
        <div className="mt-7 font-num text-[11px] uppercase tracking-[0.22em] text-accent">/news · {topic.slug}</div>
        <h1 className="text-brand-gradient mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{topic.name}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-2">{topic.description} 按发布时间纵向阅读，每条保留事实摘要与研究判断。</p>
        <div className="mt-7 flex flex-wrap gap-2">
          {NEWS_TOPICS.map(other => (
            <Link key={other.slug} href={`/news/topic/${other.slug}`} aria-current={other.slug === topic.slug ? 'page' : undefined} className={`rounded-full border px-3 py-1.5 text-xs transition ${other.slug === topic.slug ? 'border-accent bg-accent/10 text-accent' : 'border-hair-2 text-ink-2 hover:border-accent hover:text-accent'}`}>{other.name}</Link>
          ))}
        </div>
      </section>

      <section className="pb-16 pt-10 sm:pt-12">
        <div className="mb-10 flex items-end justify-between border-b border-hair pb-5">
          <div>
            <div className="font-num text-[11px] uppercase tracking-[0.2em] text-accent">02 / timeline</div>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink">新闻时间轴</h2>
          </div>
          <span className="font-num text-xs text-ink-3">{items.length} 条收录</span>
        </div>
        {items.length ? <NewsTimeline items={items} /> : <p className="rounded-xl border border-hair bg-bg-card p-8 text-sm text-ink-2">这个赛道的内容正在整理，稍后回来看看。</p>}
      </section>
    </>
  )
}
