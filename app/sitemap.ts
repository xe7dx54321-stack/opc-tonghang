import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { listDaily, listResearch, listTopics } from '@/lib/news'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const today = new Date().toISOString().split('T')[0]

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  // 新闻日报（按日期）+ 周研究
  const newsRoutes = listDaily().map((e) => ({
    url: `${siteUrl}/news/${e.slug}`,
    lastModified: e.meta.generatedAt ?? today,
  }))
  const researchRoutes = listResearch().map((e) => ({
    url: `${siteUrl}/news/research/${e.slug}`,
    lastModified: e.meta.generatedAt ?? today,
  }))
  // 新闻 topic 聚合页
  const topicRoutes = listTopics().map((tag) => ({
    url: `${siteUrl}/news/topic/${encodeURIComponent(tag)}`,
    lastModified: today,
  }))

  const staticRoutes = ['', 'blog', 'projects', 'tags', 'news', 'news/research'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: today,
  }))

  return [
    ...staticRoutes,
    ...newsRoutes,
    ...researchRoutes,
    ...topicRoutes,
    ...blogRoutes,
  ]
}
