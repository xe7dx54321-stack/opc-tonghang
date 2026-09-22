// components/news/BentoNewsCard.tsx
// 首页 Bento Grid 的"今日要闻"小卡片
//
// 显示今天最新一篇 digest 的首段 hook + 进入 /news 的链接

import Link from '@/components/Link'
import type { NewsEntry } from '@/lib/news'   // 仅 type，不引入运行时模块（fs）
                                           // 这样组件可在 client component（如 Main.tsx）里被渲染

interface BentoNewsCardProps {
  latest: NewsEntry | null
}

export default function BentoNewsCard({ latest }: BentoNewsCardProps) {
  if (!latest) return null
  const hook = extractHook(latest.body)
  return (
    <Link
      href={`/news/${latest.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-hair bg-bg-card p-6 transition hover:border-hair-2"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">
          /news · daily
        </span>
        <span className="font-num text-[10px] text-ink-3">
          {latest.meta.itemCount != null ? `${latest.meta.itemCount} 条` : ''}
        </span>
      </div>
      <h3 className="text-base font-semibold leading-snug text-ink group-hover:text-accent">
        {hook.headline ?? `今日日报 · ${latest.slug}`}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-2">
        {hook.summary}
      </p>
      <div className="mt-auto pt-4">
        <span className="font-num text-[10px] uppercase tracking-wider text-ink-3 group-hover:text-accent">
          查看今日日报 →
        </span>
      </div>
    </Link>
  )
}

function extractHook(body: string): { headline: string | null; summary: string } {
  // 第一段（--- 之前）
  const firstSection = body.split(/\n\s*---\s*\n/)[0]?.trim() ?? ''
  // 头部如有 "**headline**" 当作 headline
  const headlineMatch = /^\*\*([^*]+)\*\*/.exec(firstSection)
  const headline = headlineMatch ? headlineMatch[1] : null
  // 去掉 headline 后的内容作 summary
  const rest = headlineMatch ? firstSection.slice(headlineMatch[0].length).trim() : firstSection
  return {
    headline,
    summary: rest.slice(0, 200),
  }
}