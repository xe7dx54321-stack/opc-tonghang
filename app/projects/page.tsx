import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Harness 工具' })

export default function Projects() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-hair pb-10 pt-12">
        <div className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">
          /harness
        </div>
        <h1 className="mt-3 text-brand-gradient text-4xl font-bold tracking-tight sm:text-5xl">
          Harness 工具
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
          每一件 Harness 都来自我真实跑过的项目。可以订阅，可以一次性买断。
          不做二道贩子——只做经过实战验证的那一招。
        </p>
        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          <span className="rounded-md border border-hair bg-bg-card px-3 py-1.5 text-ink-2">
            月付订阅 · 任意用
          </span>
          <span className="rounded-md border border-hair bg-bg-card px-3 py-1.5 text-ink-2">
            单件买断 · 永久用
          </span>
          <span className="rounded-md border border-hair bg-bg-card px-3 py-1.5 text-ink-2">
            团队授权 · 联系定制
          </span>
        </div>
      </section>

      {/* 列表 */}
      <section className="container py-12">
        <div className="-m-4 flex flex-wrap">
          {projectsData.map((d) => (
            <Card
              key={d.title}
              title={d.title}
              description={d.description}
              imgSrc={d.imgSrc}
              href={d.href}
            />
          ))}
        </div>
      </section>

      {/* 价值主张 */}
      <section className="mt-8 rounded-2xl border border-hair bg-bg-card p-8 sm:p-12">
        <div className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">
          /why
        </div>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          为什么这些 Harness 值得付费？
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              k: '01',
              t: '真实跑通过',
              d: '每一件都来自真实项目，不是 ChatGPT 的演示。不是"我试了一下能跑"，是"我用它做了决策"。',
            },
            {
              k: '02',
              t: '独立可执行',
              d: '可以单独买、单独用。不强绑套餐，不强推订阅。买完就是你的。',
            },
            {
              k: '03',
              t: '持续更新',
              d: 'AI 工具/数据源每年都不一样。所有付费版本都会跟随我的实战经验持续更新。',
            },
          ].map((c) => (
            <div key={c.k} className="rounded-lg border border-hair bg-bg p-5">
              <div className="font-num text-[10px] uppercase tracking-[0.22em] text-accent">
                {c.k}
              </div>
              <div className="mt-3 text-base font-semibold text-ink">{c.t}</div>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{c.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}