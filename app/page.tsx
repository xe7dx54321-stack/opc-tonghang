import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import JsonLd, { websiteSchema, organizationSchema } from '@/components/JsonLd'
import { getLatestDaily } from '@/lib/news'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const latestNews = getLatestDaily()
  return (
    <>
      <JsonLd data={[websiteSchema(), organizationSchema()]} />
      <Main posts={posts} latestNews={latestNews} />
    </>
  )
}
