import { notFound } from 'next/navigation'
import Link from '@/components/Link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import harnessData from '@/data/harnessData'
import NotifyForm from '@/components/NotifyForm'
import JsonLd, {
  productSchema,
  breadcrumbSchema,
} from '@/components/JsonLd'
import { genPageMetadata } from 'app/seo'
import type { Metadata } from 'next'

interface Params {
  params: { slug: string }
}

const STATUS_BADGE: Record<string, { label: string; cls: string }> = {
  live: { label: '● Live · 立即可用', cls: 'bg-success/15 text-success border-success/30' },
  beta: { label: '◐ Beta · 内测中', cls: 'bg-accent/15 text-accent border-accent/30' },
  soon: { label: '○ Soon · 即将上线', cls: 'bg-bg-alt text-ink-3 border-hair-2' },
}

export function generateStaticParams() {
  return Object.keys(harnessData).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const data = harnessData[params.slug]
  if (!data) return genPageMetadata({ title: 'Harness' })
  return genPageMetadata({
    title: data.title,
    description: data.description,
  })
}

export default function HarnessDetailPage({ params }: Params) {
  const data = harnessData[params.slug]
  if (!data) {
    notFound()
  }
  const statusBadge = STATUS_BADGE[data.status]

  return (
    <>
      <JsonLd
        data={[
          productSchema({
            name: data.title,
            description: data.description,
            slug: data.slug,
            status: data.status,
            pricing: data.pricing.tiers,
          }),
          breadcrumbSchema([
            { name: '首页', url: '/' },
            { name: 'Harness 工具', url: '/projects/' },
            { name: data.title, url: `/harness/${data.slug}/` },
          ]),
        ]}
      />
      {/* ============ HERO ============ */}
      <section className="hero-glow relative isolate overflow-hidden border-b border-hair pb-12 pt-12">
        <div className="bg-grid-faint absolute inset-0 -z-10 opacity-40" />
        <div className="flex flex-wrap items-center gap-2">
          <div className="font-num text-[11px] uppercase tracking-[0.22em] text-ink-3">
            {data.code} · /harness/{data.slug}
          </div>
          <div
            className={`rounded-md border px-2 py-1 font-num text-[10px] uppercase tracking-[0.18em] ${statusBadge.cls}`}
          >
            {statusBadge.label}
          </div>
          <div className="rounded-md border border-accent/30 bg-accent/10 px-2 py-1 font-num text-[10px] uppercase tracking-[0.18em] text-accent">
            {data.tag}
          </div>
        </div>
        <h1 className="text-brand-gradient mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {data.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-2 sm:text-xl">
          {data.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {data.highlights.map((h) => (
            <div
              key={h}
              className="rounded-md border border-hair bg-bg-card px-3 py-1.5 font-num text-xs text-ink-2"
            >
              {h}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-md bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-bg shadow-[0_0_0_1px_rgba(0,224,199,0.4),0_8px_24px_-8px_rgba(0,224,199,0.6)] transition hover:brightness-110"
          >
            查看定价与购买 →
          </a>
          <a
            href="#workflow"
            className="inline-flex items-center gap-2 rounded-md border border-hair-2 bg-bg-card px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
          >
            看完整工作流
          </a>
        </div>
      </section>

      {/* ============ 描述 ============ */}
      <section className="border-b border-hair py-12">
        <p className="max-w-3xl text-base leading-relaxed text-ink-2 sm:text-lg">
          {data.description}
        </p>
      </section>

      {/* ============ 插画 ============ */}
      <section className="py-10">
        <div className="overflow-hidden rounded-2xl border border-hair bg-bg-card">
          <Image
            alt={data.title}
            src={`/static/images/harness-${data.slug === 'dd-skeleton' ? 'dd' : data.slug === 'oneliner-comp' ? 'comp' : data.slug === 'research-digest' ? 'research' : 'radar'}.svg`}
            width={1088}
            height={612}
            className="w-full"
          />
        </div>
      </section>

      {/* ============ PROBLEM ============ */}
      <section className="grid grid-cols-1 gap-8 border-t border-hair py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="font-num text-[11px] uppercase tracking-[0.22em] text-danger">
            /problem
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink">{data.problem.title}</h2>
        </div>
        <div className="md:col-span-8">
          <ul className="space-y-4">
            {data.problem.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-base leading-relaxed text-ink-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-danger" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ SOLUTION ============ */}
      <section className="grid grid-cols-1 gap-8 border-t border-hair py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">
            /solution
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink">
            {data.solution.title}
          </h2>
        </div>
        <div className="md:col-span-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data.solution.features.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border border-hair bg-bg-card p-5 transition hover:border-accent/40"
              >
                <div className="flex items-center gap-2">
                  <div className="font-num text-[10px] uppercase tracking-[0.22em] text-accent">
                    0{i + 1}
                  </div>
                  <div className="text-base font-semibold text-ink">{f.name}</div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WORKFLOW ============ */}
      <section id="workflow" className="border-t border-hair py-16">
        <div className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">
          /workflow
        </div>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink">{data.workflow.title}</h2>
        <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.workflow.steps.map((s) => (
            <li
              key={s.n}
              className="rounded-xl border border-hair bg-bg-card p-5 transition hover:border-accent/40"
            >
              <div className="font-num text-[10px] uppercase tracking-[0.22em] text-ink-3">
                {s.n}
              </div>
              <div className="mt-3 text-base font-semibold text-ink">{s.name}</div>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ============ BEST FOR ============ */}
      <section className="border-t border-hair py-12">
        <div className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">
          /best-for
        </div>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink">适合的场景</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {data.bestFor.map((b) => (
            <span
              key={b}
              className="rounded-md border border-accent/30 bg-accent/10 px-3 py-1.5 text-sm text-accent"
            >
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="border-t border-hair py-16">
        <div className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">
          /pricing
        </div>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink">{data.pricing.title}</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-2">
          付费即开通，<span className="text-ink">不自动续费</span>。可单独买，也可月付订阅全部。
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {data.pricing.tiers.map((t, i) => (
            <div
              key={i}
              className={`relative flex flex-col rounded-2xl border p-6 transition ${
                t.highlight
                  ? 'border-accent bg-card-gradient shadow-[0_0_0_1px_rgba(0,224,199,0.4),0_24px_48px_-12px_rgba(0,224,199,0.25)]'
                  : 'border-hair bg-bg-card hover:border-hair-2'
              }`}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gradient px-3 py-1 font-num text-[10px] uppercase tracking-[0.18em] text-bg">
                  推荐
                </div>
              )}
              <div className="text-sm font-semibold text-ink">{t.name}</div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-ink">{t.price}</span>
                {t.period && <span className="text-sm text-ink-3">{t.period}</span>}
              </div>
              <p className="mt-2 text-sm text-ink-2">{t.desc}</p>

              <ul className="mt-5 flex-1 space-y-2.5 text-sm text-ink-2">
                {t.features.map((f, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                disabled
                className={`mt-6 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition ${
                  t.highlight
                    ? 'bg-brand-gradient text-bg hover:brightness-110'
                    : 'border border-hair-2 bg-bg text-ink hover:border-accent hover:text-accent'
                } disabled:cursor-not-allowed disabled:opacity-70`}
                title="Stripe 接入后启用"
              >
                {t.cta}
                <span className="font-num text-[10px] uppercase tracking-[0.18em] opacity-70">
                  即将开通
                </span>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-hair bg-bg-card p-5 text-sm text-ink-2">
          <span className="font-num text-[10px] uppercase tracking-[0.18em] text-accent">
            /beta
          </span>
          <span className="ml-3">
            正在接 Stripe Checkout，预计 2 周内开通购买。当前可邮件预约：
            <a href={`mailto:${siteMetadata.email}`} className="ml-1 text-accent hover:underline">
              {siteMetadata.email}
            </a>
          </span>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="border-t border-hair py-16">
        <div className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">
          /faq
        </div>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink">常见问题</h2>

        <div className="mt-10 divide-y divide-hair rounded-xl border border-hair bg-bg-card">
          {data.faq.map((qa, i) => (
            <details
              key={i}
              className="group p-6 transition hover:bg-tint-hover [&[open]]:bg-tint-hover"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <span className="text-base font-semibold text-ink">{qa.q}</span>
                <span className="font-num text-accent transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-ink-2">{qa.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="mt-16 rounded-2xl border border-hair bg-card-gradient p-8 sm:p-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:items-start">
          <div className="md:col-span-2">
            <div className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">
              /start
            </div>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              想上手试试？
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-2 sm:text-base">
              留下邮箱，Harness 上线 / 开放内测 / Stripe 开通购买时第一时间通知你。
              <br />
              也可以直接{' '}
              <a
                href={`mailto:${siteMetadata.email}?subject=我想了解 ${data.title}`}
                className="text-accent hover:underline"
              >
                发邮件
              </a>{' '}
              谈团队授权或定制需求。
            </p>
          </div>
          <div className="md:col-span-3">
            <NotifyForm
              harnessSlug={data.slug}
              harnessTitle={data.title}
              cta={
                data.status === 'live'
                  ? '订阅 Harness 更新'
                  : data.status === 'beta'
                    ? '预约内测名额'
                    : '上线时通知我'
              }
            />
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link
                href="/projects/"
                className="text-ink-3 hover:text-accent"
              >
                ← 看其他 Harness
              </Link>
              <Link
                href="/blog/"
                className="text-ink-3 hover:text-accent"
              >
                相关研究文章 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <nav className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-hair pt-6 text-sm">
        <Link href="/projects/" className="text-ink-3 hover:text-accent">
          ← 返回 Harness 工具
        </Link>
        <Link href="/" className="text-ink-3 hover:text-accent">
          回到首页 →
        </Link>
      </nav>
    </>
  )
}