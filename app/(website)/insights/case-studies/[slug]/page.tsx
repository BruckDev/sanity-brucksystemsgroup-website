import {CustomPortableText} from '@/components/CustomPortableText'
import {ButtonLink} from '@/components/site/ButtonLink'
import {PageHero} from '@/components/site/PageHero'
import {getDynamicFetchOptions, sanityFetch, sanityFetchMetadata} from '@/sanity/lib/live'
import {fallbackCaseStudies, toBlocks} from '@/sanity/lib/siteFallbacks'
import {caseStudyBySlugQuery} from '@/sanity/lib/siteQueries'
import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'

export function generateStaticParams() {
  return fallbackCaseStudies.map((caseStudy) => ({slug: caseStudy.slug}))
}

export async function generateMetadata({
  params,
}: PageProps<'/insights/case-studies/[slug]'>): Promise<Metadata> {
  const {slug} = await params
  const {data} = await sanityFetchMetadata({
    query: caseStudyBySlugQuery,
    params: {slug},
    perspective: 'published',
  })
  const caseStudy: any = data || fallbackCaseStudies.find((item) => item.slug === slug)
  return {
    title: caseStudy?.seo?.title || caseStudy?.title,
    description: caseStudy?.seo?.description || caseStudy?.excerpt,
  }
}

export default async function CaseStudyDetailPage({
  params,
}: PageProps<'/insights/case-studies/[slug]'>) {
  const {slug} = await params
  const fetchOptions = await getDynamicFetchOptions()
  const {data} = await sanityFetch({
    query: caseStudyBySlugQuery,
    params: {slug},
    ...fetchOptions,
  })
  const caseStudy: any = data || fallbackCaseStudies.find((item) => item.slug === slug)

  if (!caseStudy) {
    notFound()
  }

  return (
    <div className="space-y-16 md:space-y-20">
      <PageHero
        eyebrow={caseStudy.display?.heroEyebrow || 'Case study'}
        title={caseStudy.title || ''}
        description={caseStudy.excerpt ? toBlocks([caseStudy.excerpt]) : []}
        secondaryCta={
          caseStudy.display?.backCta || {
            label: 'Back to Insights',
            href: '/insights',
            style: 'secondary',
          }
        }
        stats={caseStudy.metrics}
      />

      <section className="grid gap-8 lg:grid-cols-2">
        <article className="border border-[color:var(--border)] bg-white p-6 md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
            {caseStudy.display?.challengeLabel || 'Challenge'}
          </div>
          <div className="mt-6">
            <CustomPortableText id={null} type={null} path={[]} value={caseStudy.challenge || []} />
          </div>
        </article>
        <article className="border border-[color:var(--border)] bg-white p-6 md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
            {caseStudy.display?.approachLabel || 'Approach'}
          </div>
          <div className="mt-6">
            <CustomPortableText id={null} type={null} path={[]} value={caseStudy.approach || []} />
          </div>
        </article>
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <article className="border border-[color:var(--border)] bg-white p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--fg)]">
            {caseStudy.display?.outcomesTitle || 'Outcomes'}
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {(caseStudy.outcomes || []).map((item: string) => (
              <div
                key={item}
                className="border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-2 text-sm text-[color:var(--fg)]"
              >
                {item}
              </div>
            ))}
          </div>
          {Array.isArray(caseStudy.body) ? (
            <div className="mt-8">
              <CustomPortableText id={null} type={null} path={[]} value={caseStudy.body || []} />
            </div>
          ) : null}
        </article>
        <article className="border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-8">
          {caseStudy.industry ? (
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
                {caseStudy.display?.industryLabel || 'Industry'}
              </div>
              <Link
                href={`/industries/${caseStudy.industry.slug}`}
                className="mt-3 inline-block text-base text-[color:var(--fg)]"
              >
                {caseStudy.industry.title}
              </Link>
            </div>
          ) : null}
          {caseStudy.services?.length ? (
            <div className="mt-8">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
                {caseStudy.display?.relatedServicesLabel || 'Related services'}
              </div>
              <div className="mt-4 grid gap-2">
                {caseStudy.services.map((service: any) => (
                  <Link
                    key={service.slug || service.title}
                    href={`/services/${service.slug}`}
                    className="text-sm text-[color:var(--muted)] hover:text-[color:var(--fg)]"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </article>
      </section>

      <section className="border border-dashed border-[color:var(--border-strong)] bg-[color:var(--bg)] p-6 text-sm leading-7 text-[color:var(--muted)]">
        {caseStudy.display?.placeholderNote ||
          'This page is structured to support approved future case studies. Replace placeholder examples with client-authorized content, metrics, and assets in Sanity when available.'}
      </section>

      <div>
        <ButtonLink
          {...(caseStudy.display?.closingCta || {
            href: '/contact',
            label: 'Contact Us',
            style: 'primary',
          })}
        />
      </div>
    </div>
  )
}
