import {CustomPortableText} from '@/components/CustomPortableText'
import {PageHero} from '@/components/site/PageHero'
import {getDynamicFetchOptions, sanityFetch, sanityFetchMetadata} from '@/sanity/lib/live'
import {fallbackAccessibilityPage} from '@/sanity/lib/siteFallbacks'
import {accessibilityPageQuery} from '@/sanity/lib/siteQueries'
import type {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const {data} = await sanityFetchMetadata({
    query: accessibilityPageQuery,
    perspective: 'published',
  })
  const seo = (data as any)?.seo || fallbackAccessibilityPage.seo
  return {
    title: seo.title || fallbackAccessibilityPage.seo.title,
    description: seo.description || fallbackAccessibilityPage.seo.description,
  }
}

export default async function AccessibilityPage() {
  const fetchOptions = await getDynamicFetchOptions()
  const {data} = await sanityFetch({query: accessibilityPageQuery, ...fetchOptions})
  const page = {...fallbackAccessibilityPage, ...(data as any)}

  return (
    <div className="space-y-12">
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.overview} />
      <section className="max-w-4xl border border-dashed border-[color:var(--border-strong)] bg-white p-6 text-base leading-8 text-[color:var(--muted)] md:p-8">
        <CustomPortableText id={null} type={null} path={[]} value={page.body} />
      </section>
    </div>
  )
}
