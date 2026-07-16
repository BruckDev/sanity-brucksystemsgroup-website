import {ButtonLink} from '@/components/site/ButtonLink'
import {PageHero} from '@/components/site/PageHero'
import {SectionIntro} from '@/components/site/SectionIntro'
import {getDynamicFetchOptions, sanityFetch, sanityFetchMetadata} from '@/sanity/lib/live'
import {
  fallbackCaseStudies,
  fallbackInsights,
  fallbackInsightsLanding,
} from '@/sanity/lib/siteFallbacks'
import {caseStudiesQuery, insightsLandingQuery, insightsQuery} from '@/sanity/lib/siteQueries'
import type {Metadata} from 'next'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const {data} = await sanityFetchMetadata({query: insightsLandingQuery, perspective: 'published'})
  const seo = (data as any)?.seo || fallbackInsightsLanding.seo
  return {
    title: seo.title || fallbackInsightsLanding.seo.title,
    description: seo.description || fallbackInsightsLanding.seo.description,
  }
}

export default async function InsightsPage() {
  const fetchOptions = await getDynamicFetchOptions()
  const [{data: insightsData}, {data: caseStudiesData}, {data: landingData}] = await Promise.all([
    sanityFetch({query: insightsQuery, ...fetchOptions}),
    sanityFetch({query: caseStudiesQuery, ...fetchOptions}),
    sanityFetch({query: insightsLandingQuery, ...fetchOptions}),
  ])

  const insights = (insightsData as any[])?.length ? (insightsData as any[]) : fallbackInsights
  const caseStudies = caseStudiesData?.length ? caseStudiesData : fallbackCaseStudies
  const landing = {...fallbackInsightsLanding, ...(landingData as any)}

  return (
    <div className="space-y-16 md:space-y-20">
      <PageHero
        eyebrow={landing.eyebrow}
        title={landing.title}
        description={landing.overview}
        primaryCta={landing.heroPrimaryCta}
        secondaryCta={landing.heroSecondaryCta}
      />

      <section>
        <SectionIntro eyebrow={landing.insightsEyebrow} title={landing.insightsTitle} />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {insights.map((insight: any) => (
            <article
              key={insight.slug || insight.title}
              className="border border-[color:var(--border)] bg-white p-6 md:p-8"
            >
              <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">
                <span>{insight.articleType}</span>
                <span className="text-[color:var(--muted)]">{insight.estimatedReadTime}</span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-[color:var(--fg)]">
                <Link href={`/insights/${insight.slug}`}>{insight.title}</Link>
              </h2>
              <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
                {insight.excerpt}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow={landing.caseStudiesEyebrow}
          title={landing.caseStudiesTitle}
          description={landing.caseStudiesDescription}
        />
        <div className="mt-10 grid gap-6">
          {caseStudies.map((study: any) => (
            <article
              key={study.slug || study.title}
              className="border border-[color:var(--border)] bg-[color:var(--surface)] p-6"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--fg)]">
                <Link href={`/insights/case-studies/${study.slug}`}>{study.title}</Link>
              </h2>
              <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">{study.excerpt}</p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink {...landing.caseStudiesCta} />
        </div>
      </section>
    </div>
  )
}
