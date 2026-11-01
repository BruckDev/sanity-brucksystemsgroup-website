import {CustomPortableText} from '@/components/CustomPortableText'
import {ButtonLink} from '@/components/site/ButtonLink'
import {PageHero} from '@/components/site/PageHero'
import {getDynamicFetchOptions, sanityFetch, sanityFetchMetadata} from '@/sanity/lib/live'
import {fallbackIndustries, toBlocks} from '@/sanity/lib/siteFallbacks'
import {industryBySlugQuery} from '@/sanity/lib/siteQueries'
import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'

export function generateStaticParams() {
  return fallbackIndustries.map((industry) => ({slug: industry.slug}))
}

export async function generateMetadata({
  params,
}: PageProps<'/industries/[slug]'>): Promise<Metadata> {
  const {slug} = await params
  const {data} = await sanityFetchMetadata({
    query: industryBySlugQuery,
    params: {slug},
    perspective: 'published',
  })
  const industry: any = data || fallbackIndustries.find((item) => item.slug === slug)
  return {
    title: industry?.seo?.title || industry?.title,
    description: industry?.seo?.description || industry?.summary,
  }
}

export default async function IndustryDetailPage({params}: PageProps<'/industries/[slug]'>) {
  const {slug} = await params
  const fetchOptions = await getDynamicFetchOptions()
  const {data} = await sanityFetch({
    query: industryBySlugQuery,
    params: {slug},
    ...fetchOptions,
  })
  const industry: any = data || fallbackIndustries.find((item) => item.slug === slug)

  if (!industry) {
    notFound()
  }

  return <IndustryDetail industry={industry} />
}
function IndustryDetail({industry}: {industry: any}) {
  return (
    <div className="space-y-16 md:space-y-20">
      <PageHero
        eyebrow={industry.display?.heroEyebrow || 'Industry'}
        title={industry.title || ''}
        description={industry.summary ? toBlocks([industry.summary]) : []}
        primaryCta={industry.cta}
        secondaryCta={
          industry.display?.backCta || {
            label: 'Explore Services',
            href: '/services',
            style: 'secondary',
          }
        }
      />

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <article className="border border-[color:var(--border)] bg-white p-6 md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
            {industry.display?.overviewLabel || 'Industry overview'}
          </div>
          <div className="mt-6">
            <CustomPortableText id={null} type={null} path={[]} value={industry.overview || []} />
          </div>
        </article>
        <article className="border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--fg)]">
            {industry.display?.prioritiesTitle || 'Common priorities'}
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {(industry.priorities || []).map((priority: string) => (
              <div
                key={priority}
                className="border border-[color:var(--border)] bg-white px-4 py-2 text-sm text-[color:var(--fg)]"
              >
                {priority}
              </div>
            ))}
          </div>
          {(industry.services || []).length ? (
            <div className="mt-8">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
                {industry.display?.relatedServicesLabel || 'Related services'}
              </div>
              <div className="mt-4 grid gap-2">
                {(industry.services || []).map((service: any) => (
                  <Link
                    key={service.slug || service.title}
                    href={`/services/${service.slug}`}
                    className="text-sm font-medium text-[color:var(--muted)] hover:text-[color:var(--fg)]"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </article>
      </section>

      <section className="border border-[color:var(--border)] bg-white p-6 md:p-10">
        <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--fg)]">
          {industry.display?.closingTitle || 'Need support in this sector?'}
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
          {industry.display?.closingText ||
            'We can help shape an approach that respects operational realities, stakeholder expectations, and the pace of change your organization can sustain.'}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink {...industry.cta} />
          <ButtonLink
            {...(industry.display?.closingCta || {
              href: '/contact',
              label: 'Talk to Our Team',
              style: 'secondary',
            })}
          />
        </div>
      </section>
    </div>
  )
}
