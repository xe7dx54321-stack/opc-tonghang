import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // 屏蔽后台 / 内部路由
        disallow: [
          '/api/',
          '/thanks',
          '/thanks/',
          '/harness/oneliner-comp/',
          '/harness/research-digest/',
          '/harness/signal-radar/',
        ],
      },
    ],
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    host: siteMetadata.siteUrl,
  }
}
