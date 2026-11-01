import {CustomPortableText} from '@/components/CustomPortableText'
import {PageHero} from '@/components/site/PageHero'
import {getDynamicFetchOptions, sanityFetch, sanityFetchMetadata} from '@/sanity/lib/live'
import {fallbackPrivacyPage} from '@/sanity/lib/siteFallbacks'
import {privacyPageQuery} from '@/sanity/lib/siteQueries'
import type {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const {data} = await sanityFetchMetadata({query: privacyPageQuery, perspective: 'published'})
  const seo = (data as any)?.seo || fallbackPrivacyPage.seo
  return {
    title: seo.title || fallbackPrivacyPage.seo.title,
    description: seo.description || fallbackPrivacyPage.seo.description,
  }
}

export default async function PrivacyPage() {
  const fetchOptions = await getDynamicFetchOptions()
  const {data} = await sanityFetch({query: privacyPageQuery, ...fetchOptions})
  const page = {...fallbackPrivacyPage, ...(data as any)}

  return (
    <div className="space-y-12">
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.overview} />
      <section className="max-w-4xl border border-dashed border-[color:var(--border-strong)] bg-white p-6 text-base leading-8 text-[color:var(--muted)] md:p-8">
        <CustomPortableText id={null} type={null} path={[]} value={page.body} />
      </section>
    </div>
  )
}
