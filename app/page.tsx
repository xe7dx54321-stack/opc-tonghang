import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import JsonLd, { websiteSchema, organizationSchema } from '@/components/JsonLd'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return (
    <>
      <JsonLd data={[websiteSchema(), organizationSchema()]} />
      <Main posts={posts} />
    </>
  )
}
