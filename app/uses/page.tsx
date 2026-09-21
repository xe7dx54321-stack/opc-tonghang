import { genPageMetadata } from 'app/seo'
import type { Metadata } from 'next'
import Link from '@/components/Link'

export const metadata: Metadata = genPageMetadata({
  title: '工具栈',
  description: '同行实验室日常用的软件、服务、订阅与阅读源。',
})

interface Tool {
  name: string
  category: string
  usage: string
  rating: 1 | 2 | 3 | 4 | 5
  href?: string
  note?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

// ⚠️ 占位清单：你拿到页面后，把这些替换成你自己真实在用的工具。
// rating: 1-5 星，5 是"没了活不了"，1 是"可有可无"。
const TOOLS: Tool[] = [
  // ===== 软件（开发） =====
  {
    name: 'VS Code',
    category: '软件 · 开发',
    usage: '主力编辑器',
    rating: 5,
    href: 'https://code.visualstudio.com',
  },
  {
    name: 'iTerm2 + zsh + oh-my-zsh',
    category: '软件 · 开发',
    usage: '终端',
    rating: 5,
  },
  {
    name: 'Raycast',
    category: '软件 · 开发',
    usage: '启动器 / 剪贴板 / 脚本',
    rating: 5,
    href: 'https://www.raycast.com',
  },
  {
    name: 'TablePlus',
    category: '软件 · 开发',
    usage: '看 Postgres / SQLite',
    rating: 4,
    href: 'https://tableplus.com',
  },
  {
    name: 'GitHub',
    category: '软件 · 开发',
    usage: '代码托管 / Issue / Actions',
    rating: 5,
  },

  // ===== 软件（投研） =====
  {
    name: 'Notion',
    category: '软件 · 投研',
    usage: 'BP 库 / 行业笔记 / 公司档案',
    rating: 5,
    href: 'https://www.notion.so',
  },
  {
    name: 'Obsidian',
    category: '软件 · 投研',
    usage: '本地 Markdown 笔记 / 双向链接',
    rating: 4,
    href: 'https://obsidian.md',
  },
  {
    name: 'PitchBook',
    category: '软件 · 投研',
    usage: '可比公司 / 估值数据',
    rating: 4,
    note: '贵，但行业标准',
  },
  {
    name: 'IT 桔子',
    category: '软件 · 投研',
    usage: '国内一级市场数据',
    rating: 4,
  },
  {
    name: 'Wind',
    category: '软件 · 投研',
    usage: '二级市场 / 财报 / 公告',
    rating: 3,
    note: '功能太多，能用就行',
  },

  // ===== 软件（写作 / 内容） =====
  {
    name: 'Obsidian + Claude',
    category: '软件 · 写作',
    usage: '写文章 + AI 润色',
    rating: 5,
  },

  // ===== AI =====
  {
    name: 'Claude（API + Web）',
    category: 'AI',
    usage: '主力模型，写代码 / 写文章 / 分析',
    rating: 5,
    href: 'https://claude.ai',
  },
  {
    name: 'DeepSeek',
    category: 'AI',
    usage: '国内业务备选 / 成本优化',
    rating: 4,
  },
  {
    name: 'Codex',
    category: 'AI',
    usage: '本地代码助手 / 终端',
    rating: 4,
  },

  // ===== 服务 / 订阅 =====
  {
    name: 'Resend',
    category: '服务',
    usage: '本站邮件发送',
    rating: 5,
    href: 'https://resend.com',
  },
  {
    name: 'Vercel',
    category: '服务',
    usage: '本站托管',
    rating: 5,
    href: 'https://vercel.com',
  },
  {
    name: 'Cloudflare',
    category: '服务',
    usage: 'DNS / 域名',
    rating: 4,
  },
  {
    name: 'Plausible Analytics',
    category: '服务',
    usage: '本站分析（待接入）',
    rating: 4,
    href: 'https://plausible.io',
  },

  // ===== 阅读 / 信息源 =====
  {
    name: 'The Information',
    category: '阅读',
    usage: '硅谷深度报道',
    rating: 4,
  },
  {
    name: '晚点 LatePost',
    category: '阅读',
    usage: '国内科技深度',
    rating: 5,
  },
]

const CATEGORIES = ['软件 · 开发', '软件 · 投研', '软件 · 写作', 'AI', '服务', '阅读']

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="font-num text-ink-3" aria-label={`推荐度 ${rating} 星 / 5 星`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? 'text-accent' : 'text-hair'}>
          ★
        </span>
      ))}
    </span>
  )
}

export default function UsesPage() {
  // 按 category 分组并保持原始顺序
  const grouped = CATEGORIES.map((cat) => ({
    category: cat,
    tools: TOOLS.filter((t) => t.category === cat),
  })).filter((g) => g.tools.length > 0)

  return (
    <>
      <section className="border-b border-hair pb-10 pt-12">
        <div className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">
          /uses
        </div>
        <h1 className="text-brand-gradient mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          工具栈
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
          我日常用的硬件、软件、服务、订阅。
          <span className="text-ink-3">
            {' '}
            这是 <Link href="https://uses.tech" className="text-accent hover:underline">
              uses.tech
            </Link>{' '}
            风格的清单，每月更新一次。
          </span>
        </p>
        <p className="mt-3 text-sm text-ink-3">
          ★ 越多 = 越离不开。5 = "没了活不了"，3 = "可以替代"，1 = "可有可无"。
        </p>
      </section>

      <section className="mt-10 space-y-12">
        {grouped.map((g) => (
          <div key={g.category}>
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-lg font-semibold text-ink">{g.category}</h2>
              <div className="h-px flex-1 bg-hair" />
              <span className="font-num text-xs text-ink-3">{g.tools.length} 项</span>
            </div>
            <div className="space-y-2">
              {g.tools.map((tool) => (
                <div
                  key={tool.name}
                  className="grid grid-cols-1 gap-3 rounded-lg border border-hair bg-bg-card p-4 transition hover:border-hair-2 md:grid-cols-12 md:items-center"
                >
                  <div className="md:col-span-3">
                    <div className="text-sm font-semibold text-ink">
                      {tool.href ? (
                        <a
                          href={tool.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent"
                        >
                          {tool.name} ↗
                        </a>
                      ) : (
                        tool.name
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-ink-2 md:col-span-6">{tool.usage}</div>
                  <div className="flex items-center justify-between gap-3 md:col-span-3 md:justify-end">
                    <StarRow rating={tool.rating} />
                  </div>
                  {tool.note && (
                    <div className="text-xs text-ink-3 md:col-span-12 md:border-t md:border-hair md:pt-2">
                      <span className="font-num text-ink-3">NOTE · </span>
                      {tool.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-16 rounded-lg border border-hair bg-bg-card p-6">
        <div className="font-num text-[11px] uppercase tracking-[0.22em] text-accent">/ps</div>
        <p className="mt-3 text-sm text-ink-2">
          如果你也是 PE/VC 一人公司 / 独立研究者，欢迎邮件交流你的工具栈：
          <a href="mailto:hello@tonghanglab.com" className="ml-1 text-accent hover:underline">
            hello@tonghanglab.com
          </a>
        </p>
        <p className="mt-2 text-sm text-ink-2">
          也欢迎推荐 🔧推荐你希望我尝试的新工具。
        </p>
      </section>
    </>
  )
}