import Link from '@/components/Link'
import NewsList from '@/components/news/NewsList'
import { listDaily } from '@/lib/news'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: '每日综述归档',
  description: '同行实验室新闻每日综述归档。',
})

export default function NewsArchive() {
  const entries = listDaily()
  return (
    <>
      <section className="border-b border-hair pb-10 pt-12">
        <Link href="/news" className="font-num text-[11px] uppercase tracking-[0.18em] text-ink-3 hover:text-accent">← 新闻动态</Link>
        <div className="mt-7 font-num text-[11px] uppercase tracking-[0.22em] text-accent">/news · archive</div>
        <h1 className="text-brand-gradient mt-3 text-4xl font-bold tracking-tight sm:text-5xl">每日综述</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-2">按日期回看过去的日报叙事与研究判断。</p>
      </section>
      <section className="pb-16 pt-2"><NewsList entries={entries} emptyText="暂无日报" /></section>
    </>
  )
}
