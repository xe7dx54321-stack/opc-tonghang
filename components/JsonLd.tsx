// JSON-LD 结构化数据组件
// 用于在页面 head / body 嵌入 schema.org 结构化数据，提升 SEO

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ===== 常用 schema 工厂函数 =====

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tonghanglab.com'

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '同行实验室 · Tonghang Lab',
    alternateName: '同行实验室',
    url: SITE_URL,
    description:
      'PE/VC 投资人独立运营的研究与工具实验室。聚焦 AI、半导体、新能源、机器人等硬科技方向。',
    inLanguage: 'zh-CN',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        url: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '同行实验室',
    alternateName: 'Tonghang Lab',
    url: SITE_URL,
    logo: `${SITE_URL}/static/favicons/android-chrome-96x96.png`,
    description:
      'PE/VC 投资人独立运营的研究与工具实验室，聚焦 AI、半导体、新能源、机器人等硬科技方向。',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@tonghanglab.com',
      contactType: 'customer support',
      availableLanguage: ['zh-CN', 'en'],
    },
  }
}

export function personSchema({
  name,
  description,
}: {
  name: string
  description: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url: `${SITE_URL}/about/`,
    description,
    worksFor: {
      '@type': 'Organization',
      name: '同行实验室',
      url: SITE_URL,
    },
    knowsAbout: [
      'Private Equity',
      'Venture Capital',
      'Hard Tech',
      'Artificial Intelligence',
      'Semiconductor',
      'New Energy',
      'Robotics',
      'Investment Due Diligence',
    ],
  }
}

interface ProductSchemaOptions {
  name: string
  description: string
  slug: string
  status: 'live' | 'beta' | 'soon'
  pricing: {
    name: string
    price: string
    period?: string
    desc: string
    features: string[]
    cta: string
    highlight?: boolean
  }[]
}

export function productSchema({
  name,
  description,
  slug,
  status,
  pricing,
}: ProductSchemaOptions) {
  const offers = pricing
    .filter((t) => /¥\d+/.test(t.price))
    .map((t) => {
      const priceMatch = t.price.match(/¥(\d+)/)
      const price = priceMatch ? Number(priceMatch[1]) : 0
      return {
        '@type': 'Offer',
        name: t.name,
        price: String(price),
        priceCurrency: 'CNY',
        availability:
          status === 'soon'
            ? 'https://schema.org/PreOrder'
            : 'https://schema.org/InStock',
        url: `${SITE_URL}/harness/${slug}/`,
        description: t.desc,
        seller: {
          '@type': 'Organization',
          name: '同行实验室',
          url: SITE_URL,
        },
      }
    })

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url: `${SITE_URL}/harness/${slug}/`,
    brand: {
      '@type': 'Brand',
      name: '同行实验室',
    },
    offers,
    category: 'Software',
  }
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: `${SITE_URL}${it.url}`,
    })),
  }
}