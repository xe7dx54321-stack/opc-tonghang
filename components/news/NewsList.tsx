// components/news/NewsList.tsx
// 历史 digest 列表（用在 /news 默认页底部 + topic 页面）

import Link from '@/components/Link'
import type { NewsEntry } from '@/lib/news'

interface NewsListProps {
  entries: NewsEntry[]
  title?: string
  emptyText?: string
}

export default function NewsList({ entries, title, emptyText = '暂无内容' }: NewsListProps) {
  return (
    <section className="mt-12">
      {title && (
        <h2 className="mb-6 text-lg font-semibold tracking-tight text-ink">{title}</h2>
      )}
      {entries.length === 0 ? (
        <p className="text-sm text-ink-3">{emptyText}</p>
      ) : (
        <ul className="divide-y divide-hair">
          {entries.map((e) => (
            <li key={e.slug} className="py-4">
              <Link
                href={`/news/${e.slug}`}
                className="group flex items-baseline justify-between gap-4"
              >
                <span className="text-base font-medium text-ink group-hover:text-accent">
                  {formatTitle(e.slug, e.meta)}
                </span>
                <span className="font-num text-xs text-ink-3">
                  {e.meta.itemCount != null ? `${e.meta.itemCount} 条` : ''}
                  {e.meta.majorCount != null ? ` · 重大 ${e.meta.majorCount}` : ''}
                </span>
              </Link>
              {e.meta.topics && e.meta.topics.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {e.meta.topics.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-hair bg-bg-card px-2 py-0.5 font-num text-[10px] uppercase tracking-wide text-ink-2"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function formatTitle(slug: string, meta: NewsEntry['meta']): string {
  return `${slug} · 同行实验室日报`
}