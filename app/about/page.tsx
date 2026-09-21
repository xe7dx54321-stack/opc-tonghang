import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import JsonLd, { personSchema, breadcrumbSchema } from '@/components/JsonLd'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <JsonLd
        data={[
          personSchema({
            name: author.name,
            description: author.occupation || '',
          }),
          breadcrumbSchema([
            { name: '首页', url: '/' },
            { name: '关于', url: '/about/' },
          ]),
        ]}
      />
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  )
}
