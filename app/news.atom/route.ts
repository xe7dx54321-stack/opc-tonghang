// app/news.atom/route.ts · 自家 RSS feed（输出 daily + research 综合）
// 让别的 RSS reader（Feedly / Inoreader）也能订阅。

import { listDaily, listResearch } from '@/lib/news'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function rfc822(d: Date): string {
  return d.toUTCString()
}

export async function GET() {
  const baseUrl = siteMetadata.siteUrl
  const daily = listDaily().slice(0, 30)
  const research = listResearch().slice(0, 12)

  const items: string[] = []

  for (const e of daily) {
    const date = e.meta.generatedAt
      ? new Date(e.meta.generatedAt)
      : new Date(e.slug + 'T20:00:00Z')
    items.push(`
    <entry>
      <title>${escapeXml(e.slug + ' · 同行实验室日报')}</title>
      <link href="${baseUrl}/news/${e.slug}"/>
      <id>${baseUrl}/news/${e.slug}</id>
      <updated>${rfc822(date)}</updated>
      <summary>${escapeXml(summarizeBody(e.body))}</summary>
    </entry>`)
  }

  for (const e of research) {
    const date = e.meta.generatedAt
      ? new Date(e.meta.generatedAt)
      : new Date(e.slug + 'T20:00:00Z')
    items.push(`
    <entry>
      <title>${escapeXml(e.slug + ' · arXiv 周研究简报')}</title>
      <link href="${baseUrl}/news/research/${e.slug}"/>
      <id>${baseUrl}/news/research/${e.slug}</id>
      <updated>${rfc822(date)}</updated>
      <summary>${escapeXml(summarizeBody(e.body))}</summary>
    </entry>`)
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>同行实验室 · 新闻动态 + arXiv 周研究</title>
  <link href="${baseUrl}/news.atom"/>
  <link href="${baseUrl}/news" rel="alternate"/>
  <id>${baseUrl}/news.atom</id>
  <updated>${rfc822(new Date())}</updated>
  ${items.join('\n')}
</feed>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=3600',
    },
  })
}

function summarizeBody(body: string): string {
  // 取第一段，去掉 markdown 标记
  const first = body.split(/\n\s*---\s*\n/)[0] ?? body
  const plain = first
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // link → text
    .replace(/\*\*([^*]+)\*\*/g, '$1')        // bold → text
    .replace(/[`*_]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  return plain.slice(0, 280)
}