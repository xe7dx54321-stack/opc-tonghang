'use client'

import Link from '@/components/Link'
import Tag from '@/components/Tag'
import NewsletterForm from '@/components/NewsletterForm'
import BentoNewsCard from '@/components/news/BentoNewsCard'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import type { NewsEntry } from '@/lib/news'   // 仅 type，组件本身不引入 fs

interface Post {
  slug: string
  date: string
  title: string
  summary?: string
  tags?: string[]
  category?: string
}

interface Props {
  posts: Post[]
  latestNews?: NewsEntry | null
}

// 从 posts 动态算 Top 标签：按出现次数排序，取前 6 个
function computeFeaturedTags(posts: Post[], topN = 6): string[] {
  const counts = new Map<string, number>()
  for (const p of posts) {
    for (const t of p.tags || []) {
      counts.set(t, (counts.get(t) || 0) + 1)
    }
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([t]) => t)
}

const HARNESS_CARDS = [
  {
    code: 'TX-001',
    name: '尽调骨架 · DD-Skeleton',
    desc: '把一份 BP 在 30 分钟内拆成技术 / 商业 / 财务 / 团队四个可对比的卡片。',
    tag: 'Pre-Seed → A',
  },
  {
    code: 'TX-002',
    name: '一句话估值 · OneLiner-Comp',
    desc: '输入赛道 + 阶段 + 营收，自动跑出可比交易并给出一个有置信区间的估值。',
    tag: '估值对标',
  },
  {
    code: 'TX-003',
    name: '研究员速记 · Research-Digest',
    desc: '把一份会议录音 + 一份财报压成 1 页结构化纪要。',
    tag: 'AI 工作流',
  },
  {
    code: 'TX-004',
    name: '行业信号雷达 · SignalRadar',
    desc: '聚合 16 个数据源，给一个赛道打分（热度 × 资本 × 政策 × 团队）。',
    tag: '赛道研究',
  },
]

export default function Main({ posts, latestNews = null }: Props) {
  const latestPosts = posts.slice(0, 4)
  const featuredTags = computeFeaturedTags(posts, 6)
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero-glow relative isolate overflow-hidden border-b border-hair pb-20 pt-12">
        <div className="bg-grid-faint absolute inset-0 -z-10 opacity-60" />
        <div className="relative">
          {/* 顶部元信息行 */}
          <div className="mb-10 flex flex-wrap items-center gap-3 font-num text-[11px] uppercase tracking-[0.22em] text-ink-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-hair bg-glass-strong px-3 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              Open for new investments · 2026
            </span>
            <span className="hidden sm:inline">·</span>
            <span>PE / VC · Hard Tech</span>
            <span className="hidden sm:inline">·</span>
            <span>AI Workflow Builder</span>
          </div>

          {/* 主标题 */}
          <h1 className="text-brand-gradient font-bold tracking-tight text-[36px] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
            和同行的人
            <br />
            走得更深一点。
          </h1>

          {/* 副标题 */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">
            同行实验室是一个由 PE/VC 投资人独立运营的研究与工具实验室。
            聚焦 <span className="text-ink">AI、半导体、新能源、机器人</span> 等硬科技方向，
            把经过实战验证的投资方法论、AI 工作流、以及真正能跑通的 Harness 工具开源出来。
          </p>

          {/* CTA 行 */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-md bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-bg shadow-[0_0_0_1px_rgba(0,224,199,0.4),0_8px_24px_-8px_rgba(0,224,199,0.6)] transition hover:brightness-110"
            >
              阅读最新研究 →
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-md border border-hair-2 bg-bg-card px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
            >
              试用 Harness 工具
            </Link>
            <Link
              href="/about"
              className="ml-1 text-sm font-medium text-ink-2 underline-offset-4 hover:text-ink hover:underline"
            >
              关于我
            </Link>
          </div>

          {/* 底部统计行 */}
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-hair pt-6 sm:grid-cols-4">
            {[
              { k: '10+', v: '年 PE/VC 经验' },
              { k: '8', v: '个硬科技细分赛道' },
              { k: '30+', v: '被投企业 + 跟踪标的' },
              { k: '4', v: '可交付 Harness' },
            ].map((s) => (
              <div key={s.v} className="flex flex-col">
                <div className="font-num text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  {s.k}
                </div>
                <div className="mt-0.5 text-xs text-ink-3">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BENTO GRID ============ */}
      <section className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* 现在在做什么 */}
        <div className="rounded-xl border border-hair bg-bg-card p-6 transition hover:border-hair-2 md:col-span-2">
          <div className="flex items-center justify-between">
            <div className="font-num text-[11px] uppercase tracking-[0.18em] text-accent">
              /now
            </div>
            <div className="font-num text-[11px] text-ink-3">Updated · 2026-09</div>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-ink">当前在做什么</h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-2">
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>
                <span className="text-ink">正在看：</span>AI Infra（含推理优化、向量库、Agent
                框架）、具身智能上游零部件、钙钛矿量产线、储能 EMS。
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
              <span>
                <span className="text-ink">正在写：</span>硬科技尽调 Checklist v3、AI Agent
                工作流在投研中的实际用法（连载）。
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
              <span>
                <span className="text-ink">正在搭：</span>Harness 工具集的第一个 SaaS 化页面（Stripe
                Checkout + 邮箱交付）。
              </span>
            </li>
          </ul>
        </div>

        {/* 关于我 */}
        <div className="rounded-xl border border-hair bg-bg-card p-6 transition hover:border-hair-2">
          <div className="font-num text-[11px] uppercase tracking-[0.18em] text-accent">/about</div>
          <h3 className="mt-3 text-lg font-semibold text-ink">在做这件事的人</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-2">
            PE/VC 投资人，长期看 AI / 半导体 / 新能源 / 机器人等硬科技方向，
            同时做二级市场。希望把"投资实战经验 + AI 工作流"沉淀成可被复用的工具。
          </p>
          <Link
            href="/about"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            了解更多 →
          </Link>
        </div>

        {/* Harness 工具（占满整行） */}
        <div className="rounded-xl border border-hair bg-bg-card p-6 transition hover:border-hair-2 md:col-span-3">
          <div className="flex items-center justify-between">
            <div className="font-num text-[11px] uppercase tracking-[0.18em] text-accent">
              /harness
            </div>
            <Link
              href="/projects"
              className="font-num text-[11px] uppercase tracking-[0.18em] text-ink-3 hover:text-accent"
            >
              View All →
            </Link>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-ink">可执行的 Harness 工具</h3>
          <p className="mt-2 text-sm text-ink-2">
            把投研流程拆成可独立运行的 Harness。每一件都来自我真实跑过的项目，可订阅、可一次性买断。
          </p>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {HARNESS_CARDS.map((h) => (
              <div
                key={h.code}
                className="group rounded-lg border border-hair bg-bg p-4 transition hover:border-accent/40 hover:bg-bg-alt"
              >
                <div className="flex items-center justify-between">
                  <div className="font-num text-[10px] uppercase tracking-[0.18em] text-ink-3">
                    {h.code}
                  </div>
                  <div className="font-num text-[10px] uppercase tracking-[0.18em] text-accent">
                    {h.tag}
                  </div>
                </div>
                <div className="mt-3 text-sm font-semibold text-ink">{h.name}</div>
                <div className="mt-2 text-xs leading-relaxed text-ink-3">{h.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 关注的标签云 */}
        <div className="rounded-xl border border-hair bg-bg-card p-6 transition hover:border-hair-2 md:col-span-1">
          <div className="font-num text-[11px] uppercase tracking-[0.18em] text-accent">
            /topics
          </div>
          <h3 className="mt-3 text-lg font-semibold text-ink">关注的话题</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {featuredTags.map((t) => (
              <Link
                key={t}
                href={`/tags/${encodeURIComponent(t)}`}
                className="rounded-md border border-hair bg-bg px-3 py-1.5 text-sm text-ink-2 transition hover:border-accent hover:text-accent"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>

        {/* 新闻动态（今日 digest 卡片）*/}
        <div className="md:col-span-1">
          <BentoNewsCard latest={latestNews} />
        </div>

        {/* 订阅 */}
        <div className="rounded-xl border border-hair bg-card-gradient p-6">
          <div className="font-num text-[11px] uppercase tracking-[0.18em] text-accent">
            /newsletter
          </div>
          <h3 className="mt-3 text-lg font-semibold text-ink">每月一封研究月报</h3>
          <p className="mt-2 text-sm text-ink-2">
            一份我看过的项目、一段当前市场判断、两条 AI 工作流实战。
            不发广告，可随时退订。
          </p>
          <NewsletterForm
            source="home-newsletter-card"
            cta="免费订阅"
            className="mt-4"
          />
          <Link
            href="/blog/"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            先看最近研究 →
          </Link>
        </div>
      </section>

      {/* ============ 最新文章 ============ */}
      <section className="mt-20 border-t border-hair pt-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="font-num text-[11px] uppercase tracking-[0.18em] text-accent">
              /research
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              最新研究
            </h2>
          </div>
          <Link
            href="/blog"
            className="font-num text-[11px] uppercase tracking-[0.18em] text-ink-3 hover:text-accent"
          >
            All Posts →
          </Link>
        </div>

        {!latestPosts.length && <p className="text-ink-3">No posts found.</p>}

        <ul className="divide-y divide-hair">
          {latestPosts.map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="group py-6 transition first:pt-0">
                <article className="grid grid-cols-12 gap-4">
                  <dl className="col-span-12 sm:col-span-3">
                    <dt className="sr-only">Published on</dt>
                    <dd className="font-num text-xs uppercase tracking-[0.18em] text-ink-3">
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    </dd>
                  </dl>
                  <div className="col-span-12 sm:col-span-9">
                    <h3 className="text-lg font-semibold tracking-tight text-ink">
                      <Link
                        href={`/blog/${slug}`}
                        className="transition group-hover:text-accent"
                      >
                        {title}
                      </Link>
                    </h3>
                    {summary && (
                      <p className="mt-2 text-sm leading-relaxed text-ink-2">{summary}</p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {tags?.map((t) => <Tag key={t} text={t} />)}
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </section>

      {/* ============ 底部 CTA ============ */}
      <section className="mt-20 rounded-2xl border border-hair bg-bg-card p-8 sm:p-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:items-center">
          <div className="md:col-span-2">
            <div className="font-num text-[11px] uppercase tracking-[0.18em] text-accent">
              /contact
            </div>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              想聊一个项目，或试用 Harness？
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-2 sm:text-base">
              如果你正在做 AI / 半导体 / 新能源 / 机器人相关的早期项目，或者对我的 Harness
              工具有兴趣，可以直接发邮件或在公众号后台留言。我会认真回复每一封。
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <a
              href={`mailto:${siteMetadata.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-bg transition hover:brightness-110"
            >
              {siteMetadata.email} →
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-hair-2 bg-bg-card px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
            >
              查看 Harness
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}