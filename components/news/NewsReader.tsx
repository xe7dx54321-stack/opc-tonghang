// components/news/NewsReader.tsx
// 渲染单个 digest（daily 或 research）的正文。
//
// reader 版 markdown 形态（v0.3）：
//   - 没有 frontmatter（v0.3 移除了 "## 重大" 等结构化标签）
//   - 段落之间用 "---" 分隔
//   - 末尾 1 段"数据来源"小字（以 * 开头）
//
// 渲染策略：按 "---" 切分，每段独立 <p>。
// 数据来源段：<p class="text-xs text-ink-3">

import Link from '@/components/Link'

interface NewsReaderProps {
  body: string
  className?: string
}

export default function NewsReader({ body, className = '' }: NewsReaderProps) {
  // 切分：移除首部 H1 / footer 用单独样式
  const lines = body.split(/\n\s*---\s*\n/)
  const sections = lines.map(s => s.trim()).filter(Boolean)

  return (
    <article className={`prose-news ${className}`}>
      {sections.map((section, i) => {
        const isFooter = section.startsWith('*') && section.endsWith('*')
        if (isFooter) {
          // 数据来源 footer
          return (
            <p
              key={i}
              className="mt-12 border-t border-hair pt-6 text-xs leading-relaxed text-ink-3"
            >
              {stripItalic(section)}
            </p>
          )
        }
        // 首段含日期时当 hook（bold + larger）
        const isFirstSection = i === 0
        return (
          <Section key={i} text={section} emphasize={isFirstSection} />
        )
      })}
    </article>
  )
}

function stripItalic(s: string): React.ReactNode {
  // *foo bar* → foo bar
  const text = s.replace(/^\*|\*$/g, '').trim()
  return renderInline(text)
}

function Section({ text, emphasize }: { text: string; emphasize: boolean }) {
  // 每段可能含 markdown 链接 [text](url) + 强调 **text**
  return (
    <p
      className={
        emphasize
          ? 'mb-8 text-xl leading-relaxed text-ink'
          : 'mb-6 text-base leading-relaxed text-ink-2'
      }
    >
      {renderInline(text)}
    </p>
  )
}

function renderInline(text: string): React.ReactNode[] {
  // 简易 inline 解析：[text](url) + **bold**
  const out: React.ReactNode[] = []
  let i = 0
  let buf = ''
  let key = 0
  while (i < text.length) {
    // link [text](url)
    const lm = /^\[([^\]]+)\]\(([^)]+)\)/.exec(text.slice(i))
    if (lm) {
      if (buf) { out.push(buf); buf = '' }
      out.push(
        <Link key={`l${key++}`} href={lm[2]} className="text-accent hover:underline">
          {lm[1]}
        </Link>
      )
      i += lm[0].length
      continue
    }
    // bold **text**
    const bm = /^\*\*([^*]+)\*\*/.exec(text.slice(i))
    if (bm) {
      if (buf) { out.push(buf); buf = '' }
      out.push(<strong key={`b${key++}`} className="font-semibold text-ink">{bm[1]}</strong>)
      i += bm[0].length
      continue
    }
    buf += text[i]
    i++
  }
  if (buf) out.push(buf)
  return out
}