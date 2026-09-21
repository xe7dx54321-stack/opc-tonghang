import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Stage 2 之后会放开
        disallow: ['/api/', '/thanks', '/thanks/'],
      },
      // 暂屏蔽 Harness 详情页（等 Stripe 接入后再开放）
      {
        userAgent: '*',
        disallow: ['/harness', '/harness/'],
      },
    ],
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    host: siteMetadata.siteUrl,
  }
}
