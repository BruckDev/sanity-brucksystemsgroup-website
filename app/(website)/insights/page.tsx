import {ButtonLink} from '@/components/site/ButtonLink'
import {PageHero} from '@/components/site/PageHero'
import {SectionIntro} from '@/components/site/SectionIntro'
import {sanityFetch} from '@/sanity/lib/live'
import {fallbackCaseStudies, fallbackInsights, toBlocks} from '@/sanity/lib/siteFallbacks'
import {caseStudiesQuery, insightsQuery} from '@/sanity/lib/siteQueries'
import Link from 'next/link'
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Editorial insights, perspectives, reports, and future case studies from Bruck Systems Group.',
}

export default async function InsightsPage() {
  const [{data: insightsData}, {data: caseStudiesData}] = await Promise.all([
    sanityFetch({query: insightsQuery, perspective: 'published', stega: false}),
    sanityFetch({query: caseStudiesQuery, perspective: 'published', stega: false}),
  ])

  const insights = insightsData?.length ? insightsData : fallbackInsights
  const caseStudies = caseStudiesData?.length ? caseStudiesData : fallbackCaseStudies

  return (
    <div className="space-y-16 md:space-y-20">
      <PageHero
        eyebrow="Insights"
        title="Editorial content for leaders navigating complex operational and technology decisions."
        description={toBlocks([
          'This area is structured for articles, reports, perspectives, and case studies managed through Sanity.',
        ])}
        primaryCta={{label: 'Contact Us', href: '/contact', style: 'primary'}}
        secondaryCta={{label: 'Explore Services', href: '/services', style: 'secondary'}}
      />

      <section>
        <SectionIntro eyebrow="Articles and reports" title="Latest insights" />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {insights.map((insight: any) => (
            <article key={insight.slug || insight.title} className="border border-[color:var(--border)] bg-white p-6 md:p-8">
              <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">
                <span>{insight.articleType}</span>
                <span className="text-[color:var(--muted)]">{insight.estimatedReadTime}</span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-[color:var(--fg)]">
                <Link href={`/insights/${insight.slug}`}>{insight.title}</Link>
              </h2>
              <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">{insight.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="Case studies"
          title="Prepared for future approved examples"
          description="No past-performance claims are published here unless that information is provided and approved."
        />
        <div className="mt-10 grid gap-6">
          {caseStudies.map((study: any) => (
            <article key={study.slug || study.title} className="border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
              <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--fg)]">
                <Link href={`/insights/case-studies/${study.slug}`}>{study.title}</Link>
              </h2>
              <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">{study.excerpt}</p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href="/contact" label="Discuss an Initiative" style="secondary" />
        </div>
      </section>
    </div>
  )
}
