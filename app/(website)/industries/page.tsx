import {CustomPortableText} from '@/components/CustomPortableText'
import {ButtonLink} from '@/components/site/ButtonLink'
import {PageHero} from '@/components/site/PageHero'
import {SectionIntro} from '@/components/site/SectionIntro'
import {getDynamicFetchOptions, sanityFetch, sanityFetchMetadata} from '@/sanity/lib/live'
import {fallbackIndustries, fallbackIndustriesLanding} from '@/sanity/lib/siteFallbacks'
import {industriesLandingQuery, industriesQuery} from '@/sanity/lib/siteQueries'
import type {Metadata} from 'next'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const {data} = await sanityFetchMetadata({
    query: industriesLandingQuery,
    perspective: 'published',
  })
  const seo = (data as any)?.seo || fallbackIndustriesLanding.seo
  return {
    title: seo.title || fallbackIndustriesLanding.seo.title,
    description: seo.description || fallbackIndustriesLanding.seo.description,
  }
}

export default async function IndustriesPage() {
  const fetchOptions = await getDynamicFetchOptions()
  const [{data: industriesData}, {data: landingData}] = await Promise.all([
    sanityFetch({query: industriesQuery, ...fetchOptions}),
    sanityFetch({query: industriesLandingQuery, ...fetchOptions}),
  ])
  const industries = industriesData?.length ? industriesData : fallbackIndustries
  const landing = {...fallbackIndustriesLanding, ...(landingData as any)}

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
        <SectionIntro
          eyebrow={landing.sectionEyebrow}
          title={landing.sectionTitle}
          description={
            <CustomPortableText
              id={null}
              type={null}
              path={[]}
              value={landing.sectionDescription || []}
            />
          }
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry: any) => (
            <article
              key={industry.slug || industry.title}
              className="border border-[color:var(--border)] bg-white p-6"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--fg)]">
                <Link href={`/industries/${industry.slug}`}>{industry.title}</Link>
              </h2>
              <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
                {industry.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {(industry.priorities || []).slice(0, 3).map((item: string) => (
                  <div
                    key={item}
                    className="border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-2 text-sm text-[color:var(--fg)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink {...landing.governmentCta} />
        </div>
      </section>
    </div>
  )
}
