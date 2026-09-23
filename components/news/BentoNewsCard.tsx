import Link from '@/components/Link'
import type { NewsItem } from '@/lib/news'

export default function BentoNewsCard({ latest }: { latest: NewsItem | null }) {
  const topicNames = { ai: 'AI', semiconductor: '半导体', 'embodied-ai': '具身智能' }
  return (
    <Link
      href="/news"
      className="group flex h-full flex-col rounded-2xl border border-hair bg-bg-card p-6 transition hover:border-hair-2"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">/news · signal desk</span>
        <span className="font-num text-[10px] text-ink-3">{latest?.publishedDate ?? '持续更新'}</span>
      </div>
      <h3 className="text-base font-semibold leading-snug text-ink group-hover:text-accent">新闻动态 · 按赛道阅读</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-2">AI、半导体、具身智能三条时间轴，追踪值得关注的产业信号。</p>
      {latest && (
        <div className="mt-4 border-t border-hair pt-3">
          <span className="font-num text-[10px] uppercase tracking-wider text-accent">{topicNames[latest.topic]} / latest</span>
          <p className="mt-1 line-clamp-2 text-sm text-ink-2">{latest.title}</p>
        </div>
      )}
      <div className="mt-auto pt-4">
        <span className="font-num text-[10px] uppercase tracking-wider text-ink-3 group-hover:text-accent">进入新闻板块 →</span>
      </div>
    </Link>
  )
}
