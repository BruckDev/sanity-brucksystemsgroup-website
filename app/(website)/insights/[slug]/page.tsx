import {CustomPortableText} from '@/components/CustomPortableText'
import {ButtonLink} from '@/components/site/ButtonLink'
import {PageHero} from '@/components/site/PageHero'
import {getDynamicFetchOptions, sanityFetch, sanityFetchMetadata} from '@/sanity/lib/live'
import {fallbackInsights, toBlocks} from '@/sanity/lib/siteFallbacks'
import {insightBySlugQuery} from '@/sanity/lib/siteQueries'
import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'

export function generateStaticParams() {
  return fallbackInsights.map((insight) => ({slug: insight.slug}))
}

export async function generateMetadata({params}: PageProps<'/insights/[slug]'>): Promise<Metadata> {
  const {slug} = await params
  const {data} = await sanityFetchMetadata({
    query: insightBySlugQuery,
    params: {slug},
    perspective: 'published',
  })
  const insight: any = data || fallbackInsights.find((item) => item.slug === slug)
  return {
    title: insight?.seo?.title || insight?.title,
    description: insight?.seo?.description || insight?.excerpt,
  }
}

export default async function InsightDetailPage({params}: PageProps<'/insights/[slug]'>) {
  const {slug} = await params
  const fetchOptions = await getDynamicFetchOptions()
  const {data} = await sanityFetch({
    query: insightBySlugQuery,
    params: {slug},
    ...fetchOptions,
  })
  const insight: any = data || fallbackInsights.find((item) => item.slug === slug)

  if (!insight) {
    notFound()
  }

  return (
    <div className="space-y-16 md:space-y-20">
      <PageHero
        eyebrow={insight.articleType || 'Insight'}
        title={insight.title || ''}
        description={insight.excerpt ? toBlocks([insight.excerpt]) : []}
        secondaryCta={
          insight.display?.backCta || {
            label: 'Back to Insights',
            href: '/insights',
            style: 'secondary',
          }
        }
        stats={[
          {
            value: insight.estimatedReadTime,
            label: insight.display?.readTimeLabel || 'Estimated read time',
          },
        ]}
      />

      <article className="mx-auto max-w-4xl space-y-8 border border-[color:var(--border)] bg-white p-6 md:p-10">
        <CustomPortableText id={null} type={null} path={[]} value={insight.body || []} />
      </article>

      {(insight.relatedServices || []).length || (insight.relatedIndustries || []).length ? (
        <section className="grid gap-8 lg:grid-cols-2">
          {(insight.relatedServices || []).length ? (
            <article className="border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
              <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--fg)]">
                {insight.display?.relatedServicesTitle || 'Related services'}
              </h2>
              <div className="mt-5 grid gap-2">
                {(insight.relatedServices || []).map((service: any) => (
                  <Link
                    key={service.slug || service.title}
                    href={`/services/${service.slug}`}
                    className="text-sm text-[color:var(--muted)] hover:text-[color:var(--fg)]"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </article>
          ) : null}
          {(insight.relatedIndustries || []).length ? (
            <article className="border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
              <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--fg)]">
                {insight.display?.relatedIndustriesTitle || 'Related industries'}
              </h2>
              <div className="mt-5 grid gap-2">
                {(insight.relatedIndustries || []).map((industry: any) => (
                  <Link
                    key={industry.slug || industry.title}
                    href={`/industries/${industry.slug}`}
                    className="text-sm text-[color:var(--muted)] hover:text-[color:var(--fg)]"
                  >
                    {industry.title}
                  </Link>
                ))}
              </div>
            </article>
          ) : null}
        </section>
      ) : null}

      <section className="border border-[color:var(--border)] bg-[color:var(--charcoal)] p-6 text-white md:p-8">
        <h2 className="text-3xl font-semibold tracking-tight">
          {insight.display?.closingTitle || 'Want to discuss a related initiative?'}
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white/76">
          {insight.display?.closingText ||
            'We can help turn themes from strategy, operations, and technology into a practical next step.'}
        </p>
        <div className="mt-8">
          <ButtonLink
            {...(insight.display?.closingCta || {
              href: '/contact',
              label: 'Talk to Our Team',
              style: 'primary',
            })}
          />
        </div>
      </section>
    </div>
  )
}
