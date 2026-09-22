#!/usr/bin/env node
// sync-news.mjs · 把 news-harness/content 拷到 web/content/news/
//
// 站点构建时同步；手动跑也可以。
// 用法：node web/scripts/sync-news.mjs [--dry-run]
//
// 源：
//   ../news-harness/content/digests/YYYY-MM-DD.md        → web/content/news/daily/YYYY-MM-DD.md
//   ../news-harness/content/research/weekly/YYYY-MM-DD.md → web/content/news/research/YYYY-MM-DD.md
//   ../news-harness/content/items/YYYY-MM-DD/*.json     → web/content/news/items/YYYY-MM-DD/*.json
//
// 目标：web/content/news/
//   daily/   每日读者版（站点直接 import 消费）
//   research/ 每周 arxiv 研究简报
//   items/   原始条目（可选，站点暂未消费）
//   _index.json  元数据索引（最新日期 / 数量 / topic 分布）
//
// 加到 web/package.json 的 prebuild / dev hook

import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync, existsSync, copyFileSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const WEB_DIR = join(__dirname, '..')      // /Users/.../web
const ROOT_DIR = join(WEB_DIR, '..')      // /Users/.../一人公司OPC
const SRC = join(ROOT_DIR, 'news-harness', 'content')
const DST = join(WEB_DIR, 'content', 'news')

const DRY_RUN = process.argv.includes('--dry-run')

function log(...args) { console.log('[sync-news]', ...args) }

function ensureDir(d) {
  if (!existsSync(d)) mkdirSync(d, { recursive: true })
}

function readJsonSafe(p) {
  try {
    return JSON.parse(readFileSync(p, 'utf8'))
  } catch {
    return null
  }
}

function extractFrontmatter(text) {
  // 极简 YAML frontmatter 解析（只取 date / type / topics / itemCount / totalPapers 等关键字段）
  const m = /^---\n([\s\S]*?)\n---/.exec(text)
  if (!m) return { data: {}, body: text }
  const data = {}
  for (const line of m[1].split('\n')) {
    const mm = /^(\w+):\s*(.*)$/.exec(line.trim())
    if (mm) {
      let v = mm[2]
      // 简单去引号 + 数组解析
      v = v.replace(/^["']|["']$/g, '')
      if (v.startsWith('{')) {
        try { v = JSON.parse(v) } catch {}
      }
      data[mm[1]] = v
    }
  }
  return { data, body: text.slice(m[0].length) }
}

const summary = { copied: [], skipped: [], totals: { daily: 0, research: 0, items: 0 } }

// ===== daily =====
const srcDaily = join(SRC, 'digests')
const dstDaily = join(DST, 'daily')
ensureDir(dstDaily)
if (existsSync(srcDaily)) {
  const files = readdirSync(srcDaily).filter(f => f.endsWith('.md'))
  for (const f of files) {
    const src = join(srcDaily, f)
    const dst = join(dstDaily, f)
    if (DRY_RUN) { summary.skipped.push(f); continue }
    copyFileSync(src, dst)
    summary.copied.push(`daily/${f}`)
    summary.totals.daily++
  }
}

// ===== research =====
const srcResearch = join(SRC, 'research', 'weekly')
const dstResearch = join(DST, 'research')
ensureDir(dstResearch)
if (existsSync(srcResearch)) {
  const files = readdirSync(srcResearch).filter(f => f.endsWith('.md'))
  for (const f of files) {
    const src = join(srcResearch, f)
    const dst = join(dstResearch, f)
    if (DRY_RUN) { summary.skipped.push(f); continue }
    copyFileSync(src, dst)
    summary.copied.push(`research/${f}`)
    summary.totals.research++
  }
}

// ===== items (raw, optional) =====
const srcItems = join(SRC, 'items')
const dstItems = join(DST, 'items')
ensureDir(dstItems)
if (existsSync(srcItems)) {
  const days = readdirSync(srcItems).filter(d => {
    try { return statSync(join(srcItems, d)).isDirectory() } catch { return false }
  })
  for (const day of days) {
    const dayDir = join(dstItems, day)
    ensureDir(dayDir)
    const files = readdirSync(join(srcItems, day)).filter(f => f.endsWith('.json'))
    for (const f of files) {
      const src = join(srcItems, day, f)
      const dst = join(dayDir, f)
      if (DRY_RUN) { summary.skipped.push(`${day}/${f}`); continue }
      copyFileSync(src, dst)
      summary.copied.push(`items/${day}/${f}`)
      summary.totals.items++
    }
  }
}

// ===== _index.json (元数据索引) =====
const dailyFiles = existsSync(dstDaily) ? readdirSync(dstDaily).filter(f => f.endsWith('.md')).sort().reverse() : []
const researchFiles = existsSync(dstResearch) ? readdirSync(dstResearch).filter(f => f.endsWith('.md')).sort().reverse() : []

const indexData = {
  generatedAt: new Date().toISOString(),
  daily: dailyFiles.map(f => ({
    file: f,
    date: f.replace(/\.md$/, ''),
    frontmatter: extractFrontmatter(readFileSync(join(dstDaily, f), 'utf8')).data,
  })),
  research: researchFiles.map(f => ({
    file: f,
    date: f.replace(/\.md$/, ''),
    frontmatter: extractFrontmatter(readFileSync(join(dstResearch, f), 'utf8')).data,
  })),
  totals: summary.totals,
}

if (!DRY_RUN) {
  writeFileSync(join(DST, '_index.json'), JSON.stringify(indexData, null, 2))
  log(`wrote _index.json (${indexData.daily.length} daily + ${indexData.research.length} research)`)
}

log('done.')
log(`copied: ${summary.copied.length} files`)
if (DRY_RUN) log('(dry-run mode, no files written)')