/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: '同行实验室 · Tonghang Lab',
  author: '同行实验室',
  headerTitle: '同行实验室',
  description:
    'PE/VC 投资人独立运营的研究与工具实验室。聚焦 AI、半导体、新能源等硬科技方向，分享投资方法论、AI 工作流与可执行的 Harness 工具。',
  language: 'zh-cn',
  theme: 'dark', // dark | light | system
  siteUrl: 'https://tonghanglab.com',
  siteRepo: 'https://github.com/tonghang-lab/tonghang-lab',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.svg`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/og.svg`,
  email: 'hello@tonghanglab.com',
  github: 'https://github.com',
  x: 'https://x.com',
  linkedin: 'https://www.linkedin.com',
  wechat: 'tonghanglab',
  // 关闭未启用的社交
  facebook: '',
  youtube: '',
  threads: '',
  instagram: '',
  medium: '',
  bluesky: '',
  locale: 'zh-CN',
  stickyNav: true,
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
  },
  newsletter: {
    // 自建 Resend 表单（见 /app/api/newsletter/route.ts）
    provider: 'custom',
  },
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'transparent_dark',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'zh-CN',
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata