import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = genPageMetadata({
  title: '订阅成功',
  description: '感谢订阅同行实验室',
})

interface SearchParams {
  searchParams: { type?: string; slug?: string; title?: string; source?: string }
}

export default function ThanksPage({ searchParams }: SearchParams) {
  const type = searchParams.type === 'harness' ? 'harness' : 'newsletter'
  const harnessSlug = searchParams.slug
  const harnessTitle = searchParams.title

  return (
    <section className="hero-glow relative isolate overflow-hidden border-b border-hair pb-16 pt-16">
      <div className="bg-grid-faint absolute inset-0 -z-10 opacity-40" />

      <div className="mx-auto max-w-2xl">
        <div className="font-num text-[11px] uppercase tracking-[0.22em] text-success">
          ✓ {type === 'harness' ? '已加入通知名单' : '订阅成功'}
        </div>

        <h1 className="text-brand-gradient mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {type === 'harness' ? '已记下你的邮箱' : '欢迎加入同行实验室'}
        </h1>

        {type === 'harness' ? (
          <>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">
              <span className="text-ink">{harnessTitle}</span> 上线 / 开放内测时，
              我会第一时间通过邮件告诉你。
            </p>
            <p className="mt-3 text-sm text-ink-3">
              同时欢迎订阅月报，每月三件事（一份我看过的项目、一段当前市场判断、两条 AI 工作流实战）。
            </p>
          </>
        ) : (
          <p className="mt-4 text-lg leading-relaxed text-ink-2">
            下个月起，每月一封研究月报会送到你的邮箱。
            <br />
            <span className="text-ink-3">
              一份我看过的项目、一段当前市场判断、两条 AI 工作流实战。
            </span>
          </p>
        )}

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            href="/blog/"
            className="rounded-md border border-hair bg-bg-card p-4 transition hover:border-accent"
          >
            <div className="font-num text-[10px] uppercase tracking-[0.22em] text-accent">
              01 / 研究
            </div>
            <div className="mt-2 text-sm font-semibold text-ink">读最新文章</div>
          </Link>
          <Link
            href="/projects/"
            className="rounded-md border border-hair bg-bg-card p-4 transition hover:border-accent"
          >
            <div className="font-num text-[10px] uppercase tracking-[0.22em] text-accent">
              02 / Harness
            </div>
            <div className="mt-2 text-sm font-semibold text-ink">看工具矩阵</div>
          </Link>
          <Link
            href="/about/"
            className="rounded-md border border-hair bg-bg-card p-4 transition hover:border-accent"
          >
            <div className="font-num text-[10px] uppercase tracking-[0.22em] text-accent">
              03 / 关于
            </div>
            <div className="mt-2 text-sm font-semibold text-ink">了解我</div>
          </Link>
        </div>

        <div className="mt-10 rounded-lg border border-hair bg-bg-alt p-5 text-sm text-ink-2">
          <span className="font-num text-[10px] uppercase tracking-[0.18em] text-accent">
            /ps
          </span>
          <span className="ml-3">
            一人一公司，工具即武器。如果你也在做类似的事，欢迎{' '}
            <a
              href="mailto:hello@tonghanglab.com"
              className="text-accent hover:underline"
            >
              邮件聊聊
            </a>
            。
          </span>
        </div>

        <div className="mt-6 flex gap-4 text-sm">
          <Link href="/" className="text-ink-3 hover:text-accent">
            ← 回到首页
          </Link>
          {harnessSlug && (
            <Link
              href={`/harness/${harnessSlug}/`}
              className="text-ink-3 hover:text-accent"
            >
              回到 Harness 详情 →
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}