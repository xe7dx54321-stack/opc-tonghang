#!/usr/bin/env node
// 将 news-harness 的已完成内容同步到站点快照。
// 开发机有相邻的 news-harness；Vercel 单独构建 web 时没有，直接保留已提交的快照。
// 用法：node scripts/sync-news.mjs [--dry-run] [--require-date=YYYY-MM-DD]
// 测试可通过 NEWS_HARNESS_CONTENT / NEWS_WEB_CONTENT 覆盖路径。

import {
  existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync,
  statSync, copyFileSync, renameSync, rmSync,
} from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const webDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = process.env.NEWS_HARNESS_CONTENT || join(webDir, '..', 'news-harness', 'content')
const target = process.env.NEWS_WEB_CONTENT || join(webDir, 'content', 'news')
const dryRun = process.argv.includes('--dry-run')
const requireDate = process.argv.find(arg => arg.startsWith('--require-date='))?.split('=')[1]
const dayPattern = /^\d{4}-\d{2}-\d{2}$/
const hasChinese = value => typeof value === 'string' && /[\u3400-\u9fff]/.test(value.trim())
const hasSingleParagraph = value => typeof value === 'string' && !/[\r\n]/.test(value) &&
  !/(?:研究判断|判断[：:]|事实[：:])/.test(value)

function fail(message) {
  console.error('[sync-news] ERROR:', message)
  process.exit(1)
}

function files(dir, pattern) {
  return existsSync(dir) ? readdirSync(dir).filter(name => pattern.test(name)).sort() : []
}

function sameFile(a, b) {
  return existsSync(b) && readFileSync(a).equals(readFileSync(b))
}

function validateDailyDigest(day, content) {
  const sections = content.trim().split(/\n\s*---\s*\n/).map(section => section.trim()).filter(Boolean)
  if (sections.length < 2 || /^\*\*[\s\S]+\*\*$/.test(sections[0])) {
    fail(`Daily digest ${day} needs a normal-weight introduction and titled stories`)
  }
  const stories = sections.slice(1).filter(section => !section.startsWith('*'))
  if (!stories.length || stories.some(section => {
    const match = /^##\s+([^\n]+)\n+([\s\S]+)$/.exec(section)
    return !match || !/[\u3400-\u9fff]/.test(match[1]) || /^\*\*[\s\S]+\*\*$/.test(match[2].trim())
  })) {
    fail(`Daily digest ${day} has a story without a Chinese heading and normal-weight body`)
  }
}

if (requireDate && !dayPattern.test(requireDate)) fail('Invalid --require-date value')
if (!existsSync(source)) {
  if (requireDate) fail(`Harness content directory does not exist: ${source}`)
  console.log('[sync-news] No local harness checkout; using committed website snapshot.')
  process.exit(0)
}

const sourceDaily = join(source, 'digests')
const sourceResearch = join(source, 'research', 'weekly')
const sourceItems = join(source, 'items')
const dailyFiles = files(sourceDaily, /^\d{4}-\d{2}-\d{2}\.md$/)
const researchFiles = files(sourceResearch, /^\d{4}-\d{2}-\d{2}\.md$/)
const itemDays = existsSync(sourceItems)
  ? readdirSync(sourceItems).filter(day => dayPattern.test(day) && statSync(join(sourceItems, day)).isDirectory()).sort()
  : []
const newDailyDays = dailyFiles.map(name => name.slice(0, 10))
  .filter(day => !existsSync(join(target, 'daily', `${day}.md`)))
const requiredDays = new Set([...newDailyDays, ...(requireDate ? [requireDate] : [])])

// 先校验，再写入，避免发布到一半才发现源文件损坏。
if (requireDate && !dailyFiles.includes(`${requireDate}.md`)) fail(`Missing daily digest for ${requireDate}`)
for (const day of requiredDays) {
  if (!itemDays.includes(day)) fail(`Missing item directory for new daily digest ${day}`)
}
for (const name of dailyFiles) {
  const content = readFileSync(join(sourceDaily, name), 'utf8')
  if (!content.trim()) fail(`Empty digest: ${name}`)
  if (requiredDays.has(name.slice(0, 10))) validateDailyDigest(name.slice(0, 10), content)
}
for (const name of researchFiles) {
  if (!readFileSync(join(sourceResearch, name), 'utf8').trim()) fail(`Empty research report: ${name}`)
}
for (const day of itemDays) {
  const dir = join(sourceItems, day)
  const names = files(dir, /\.json$/)
  let displayReady = 0
  for (const name of names) {
    try {
      const item = JSON.parse(readFileSync(join(dir, name), 'utf8'))
      if (requiredDays.has(day) && name !== '_index.json' && (!item.id || !item.title || !/^https?:\/\//i.test(item.url ?? '') || !Array.isArray(item.topic) || !item.summary)) {
        throw new Error('missing required display fields')
      }
      const publishable = name !== '_index.json' && !item.duplicateOf &&
        /^https?:\/\//i.test(item.url ?? '') && Array.isArray(item.topic) && item.topic.length &&
        typeof item.score === 'number' && item.score >= 0.4
      if (requiredDays.has(day) && publishable &&
        (!hasChinese(item.displayTitle) || !hasChinese(item.narrative) || !hasSingleParagraph(item.narrative))) {
        throw new Error('missing Chinese displayTitle or single-paragraph Chinese narrative')
      }
      if (publishable && hasChinese(item.displayTitle) && hasChinese(item.narrative) && hasSingleParagraph(item.narrative)) displayReady++
    } catch (error) {
      fail(`Invalid item ${day}/${name}: ${error.message}`)
    }
  }
  if (requiredDays.has(day) && displayReady === 0) fail(`No display-ready Chinese news items for ${day}`)
}

let changed = 0

function syncFile(src, dst) {
  if (sameFile(src, dst)) return
  changed++
  if (dryRun) return
  mkdirSync(dirname(dst), { recursive: true })
  const staging = `${dst}.sync-${process.pid}`
  try {
    copyFileSync(src, staging)
    renameSync(staging, dst)
  } finally {
    if (existsSync(staging)) rmSync(staging)
  }
}

for (const name of dailyFiles) syncFile(join(sourceDaily, name), join(target, 'daily', name))
for (const name of researchFiles) syncFile(join(sourceResearch, name), join(target, 'research', name))

for (const day of itemDays) {
  const srcDir = join(sourceItems, day)
  const dstDir = join(target, 'items', day)
  const srcNames = files(srcDir, /\.json$/)
  const dstNames = files(dstDir, /\.json$/)
  const identical = srcNames.length === dstNames.length &&
    srcNames.every((name, i) => name === dstNames[i] && sameFile(join(srcDir, name), join(dstDir, name)))
  if (identical) continue
  changed += srcNames.length + Math.max(0, dstNames.length - srcNames.length)
  if (dryRun) continue
  mkdirSync(dirname(dstDir), { recursive: true })
  const staging = `${dstDir}.sync-${process.pid}`
  const backup = `${dstDir}.backup-${process.pid}`
  try {
    mkdirSync(staging)
    for (const name of srcNames) copyFileSync(join(srcDir, name), join(staging, name))
    if (existsSync(dstDir)) renameSync(dstDir, backup)
    renameSync(staging, dstDir)
    if (existsSync(backup)) rmSync(backup, { recursive: true })
  } catch (error) {
    if (existsSync(backup) && !existsSync(dstDir)) renameSync(backup, dstDir)
    throw error
  } finally {
    if (existsSync(staging)) rmSync(staging, { recursive: true })
  }
}

if (!dryRun && (changed > 0 || !existsSync(join(target, '_index.json')))) {
  const getEntries = (subdir) => files(join(target, subdir), /^\d{4}-\d{2}-\d{2}\.md$/)
    .reverse().map(file => ({ file, date: file.slice(0, 10) }))
  const index = {
    generatedAt: new Date().toISOString(),
    daily: getEntries('daily'),
    research: getEntries('research'),
    totals: {
      daily: files(join(target, 'daily'), /^\d{4}-\d{2}-\d{2}\.md$/).length,
      research: files(join(target, 'research'), /^\d{4}-\d{2}-\d{2}\.md$/).length,
      items: itemDays.reduce((sum, day) => sum + files(join(target, 'items', day), /\.json$/).filter(name => name !== '_index.json').length, 0),
    },
  }
  mkdirSync(target, { recursive: true })
  writeFileSync(join(target, '_index.json'), JSON.stringify(index, null, 2) + '\n')
}

console.log(`[sync-news] ${dryRun ? 'would update' : 'updated'} ${changed} files; ${dailyFiles.length} daily, ${researchFiles.length} research, ${itemDays.length} item days in source.`)
