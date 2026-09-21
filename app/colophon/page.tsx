import { genPageMetadata } from 'app/seo'
import type { Metadata } from 'next'
import Link from '@/components/Link'
import packageInfo from '../../package.json'

export const metadata: Metadata = genPageMetadata({
  title: '关于本站',
  description: '同行实验室 Tonghang Lab 这个网站本身是怎么搭起来的：技术栈、设计灵感、内容原则与历史。',
})

const STACK = [
  { name: 'Next.js', version: packageInfo.dependencies.next, role: 'App Router + SSG' },
  { name: 'React', version: packageInfo.dependencies.react, role: 'UI 框架' },
  {
    name: 'TypeScript',
    version: packageInfo.devDependencies.typescript,
    role: '类型系统',
  },
  {
    name: 'Tailwind CSS',
    version: packageInfo.dependencies.tailwindcss,
    role: '样式',
  },
  {
    name: 'Contentlayer2',
    version: packageInfo.dependencies['contentlayer2'],
    role: 'MDX 内容层',
  },
  { name: 'Resend', version: '6.x', role: '邮件发送' },
  { name: 'Vercel', version: '—', role: '托管' },
]

const DESIGN_NOTES = [
  {
    title: '色彩',
    body: '主色 #00E0C7（薄荷青绿）→ #00A85A（翠绿）渐变。灵感来自废才俱乐部的颜色系统，微调为我更偏好的"实验室"冷感。',
  },
  {
    title: '字体',
    body: '正文 Noto Sans SC（中文）+ Noto Sans SC fallback。代码 / 数字用 JetBrains Mono。所有数据 / 数字徽章统一用等宽字体，营造"实验室报告"感。',
  },
  {
    title: '暗色为主',
    body: '默认暗色（#0A0A0A 近黑底 + #E8ECEF 亮文字），亮色模式是暖米色（#F5F2EC）。少即是多，不滥用饱和色。',
  },
  {
    title: '布局',
    body: '首页 Hero + Bento Grid（参考废才俱乐部 mission-hero）。文章列表用 3:9 网格，左日期右内容。所有卡片用 border-hair + bg-card 配色。',
  },
  {
    title: '品牌色硬编码陷阱',
    body: 'Tailwind v3 会把 `bg-bg/85` 这类带 opacity 的 class 编译时硬编码成 hex，丢失对 CSS 变量的追踪。我用 color-mix() 重写了 bg-glass / bg-card-gradient 等工具类。',
  },
]

const CONTENT_PRINCIPLES = {
  write: [
    '投资方法论：硬科技尽调 Checklist、估值对标、退出节奏',
    'AI 工作流实战：Claude / DeepSeek / Ollama 接到真实投研',
    '赛道观察：AI Infra、具身智能、钙钛矿、储能 EMS',
    '个人思考：一人公司 + AI 的真实踩坑',
  ],
  noWrite: [
    '水文（每篇都得是实战经验）',
    '玄学（不讲奇迹，只讲今天能用上的那一招）',
    '二手搬运（不抄不搬不编故事）',
    '情绪化输出（这里是工作台，不是朋友圈）',
  ],
}

const HISTORY = [
  { date: '2026-09', event: 'Fork timlrx/tailwind-nextjs-starter-blog，开始搭建' },
  { date: '2026-09', event: '基于废才俱乐部深拆，写设计 token（同行实验室 → Tonghang Lab）' },
  { date: '2026-09', event: '首页 Hero + Bento Grid、4 个 Harness 详情页上线' },
  { date: '2026-09', event: '接入 Resend，Newsletter + Harness 兴趣通知全跑通' },
  { date: '—', event: '下一步：Stripe Checkout + 自定义域名' },
]

const CREDITS = [
  { name: 'timlrx/tailwind-nextjs-starter-blog', desc: '起点模板，节省了从0搭博客的时间', href: 'https://github.com/timlrx/tailwind-nextjs-starter-blog' },
  { name: '废才俱乐部（feicaiclub.cn）', desc: '设计灵感来源：mission-hero、Bento Grid、付费墙', href: 'https://feicaiclub.cn' },
  { name: 'Next.js / Vercel', desc: '让 Next.js 部署变得无痛', href: 'https://nextjs.org' },
  { name: 'Resend', desc: '开发者友好的邮件 API', href: 'https://resend.com' },
  { name: 'Tailwind CSS', desc: '原子化样式让 design system 可维护', href: 'https://tailwindcss.com' },
  { name: 'Noto Sans SC + JetBrains Mono', desc: '免费开源字体，工程师审美', href: 'https://fonts.google.com/noto/specimen/Noto+Sans+SC' },
]

export default function ColophonPage() {
  return (
    <>
      <section className="border-b border-hair pb-10 pt-12">
        <div className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">
          /colophon
        </div>
        <h1 className="text-brand-gradient mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          关于本站
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
          这个网站本身是怎么搭起来的——技术栈、设计灵感、内容原则、历史与致谢。
        </p>
      </section>

      {/* 技术栈 */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight text-ink">技术栈</h2>
        <p className="mt-2 text-sm text-ink-3">所有版本来自 package.json，自动同步。</p>
        <div className="mt-6 overflow-hidden rounded-lg border border-hair">
          <table className="w-full text-sm">
            <thead className="bg-bg-alt">
              <tr className="border-b border-hair text-left">
                <th className="px-4 py-3 font-num text-[10px] uppercase tracking-[0.18em] text-ink-3">项目</th>
                <th className="px-4 py-3 font-num text-[10px] uppercase tracking-[0.18em] text-ink-3">版本</th>
                <th className="px-4 py-3 font-num text-[10px] uppercase tracking-[0.18em] text-ink-3">作用</th>
              </tr>
            </thead>
            <tbody>
              {STACK.map((row) => (
                <tr key={row.name} className="border-b border-hair last:border-b-0">
                  <td className="px-4 py-3 font-medium text-ink">{row.name}</td>
                  <td className="px-4 py-3 font-num text-xs text-accent">{row.version}</td>
                  <td className="px-4 py-3 text-ink-2">{row.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 设计 */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight text-ink">设计笔记</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {DESIGN_NOTES.map((d) => (
            <div key={d.title} className="rounded-lg border border-hair bg-bg-card p-5">
              <div className="font-num text-[10px] uppercase tracking-[0.22em] text-accent">
                {d.title}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 内容原则 */}
      <section className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <div className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">
            /write
          </div>
          <h3 className="mt-2 text-xl font-bold text-ink">会写什么</h3>
          <ul className="mt-4 space-y-2">
            {CONTENT_PRINCIPLES.write.map((w) => (
              <li key={w} className="flex gap-2 text-sm text-ink-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-success" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-num text-[11px] uppercase tracking-[0.22em] text-danger">
            /no-write
          </div>
          <h3 className="mt-2 text-xl font-bold text-ink">不会写什么</h3>
          <ul className="mt-4 space-y-2">
            {CONTENT_PRINCIPLES.noWrite.map((w) => (
              <li key={w} className="flex gap-2 text-sm text-ink-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-danger" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 历史 */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight text-ink">历史</h2>
        <ol className="relative mt-6 space-y-4 border-l border-hair pl-6">
          {HISTORY.map((h) => (
            <li key={h.date + h.event} className="relative">
              <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-bg bg-accent" />
              <div className="font-num text-xs text-ink-3">{h.date}</div>
              <div className="mt-1 text-sm text-ink-2">{h.event}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* 致谢 */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight text-ink">致谢</h2>
        <p className="mt-2 text-sm text-ink-3">站在开源的肩膀上。</p>
        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
          {CREDITS.map((c) => (
            <a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-hair bg-bg-card p-4 transition hover:border-accent/40"
            >
              <div className="text-sm font-semibold text-ink group-hover:text-accent">
                {c.name} ↗
              </div>
              <div className="mt-1 text-xs text-ink-3">{c.desc}</div>
            </a>
          ))}
        </div>
      </section>

      {/* 反馈 */}
      <section className="mt-12 rounded-lg border border-hair bg-bg-card p-6">
        <div className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">/ps</div>
        <p className="mt-3 text-sm text-ink-2">
          发现本站 bug、设计问题、想交流？
          <a href="mailto:hello@tonghanglab.com" className="ml-1 text-accent hover:underline">
            发邮件
          </a>
          给我，或者去{' '}
          <Link href="/colophon#feedback" className="text-accent hover:underline">
            GitHub 提 issue
          </Link>
          。
        </p>
      </section>
    </>
  )
}