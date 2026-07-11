import {ButtonLink} from '@/components/site/ButtonLink'
import {PageHero} from '@/components/site/PageHero'
import {SectionIntro} from '@/components/site/SectionIntro'
import {sanityFetch} from '@/sanity/lib/live'
import {fallbackIndustries, toBlocks} from '@/sanity/lib/siteFallbacks'
import {industriesQuery} from '@/sanity/lib/siteQueries'
import Link from 'next/link'
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Industries',
  description:
    'See how Bruck Systems Group supports government, regulated, mission-driven, and growth-oriented organizations.',
}

export default async function IndustriesPage() {
  const {data} = await sanityFetch({query: industriesQuery, perspective: 'published', stega: false})
  const industries = data?.length ? data : fallbackIndustries

  return (
    <div className="space-y-16 md:space-y-20">
      <PageHero
        eyebrow="Industries"
        title="Sector-aware support for organizations with real constraints and real stakes."
        description={toBlocks([
          'Bruck Systems Group serves public agencies, private businesses, and nonprofit organizations with a practical approach to modernization, software, operations, and delivery support.',
        ])}
        primaryCta={{label: 'Explore Services', href: '/services', style: 'primary'}}
        secondaryCta={{label: 'Contact Us', href: '/contact', style: 'secondary'}}
      />

      <section>
        <SectionIntro
          eyebrow="Sectors served"
          title="Built for public, regulated, and mission-driven environments"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry: any) => (
            <article key={industry.slug || industry.title} className="border border-[color:var(--border)] bg-white p-6">
              <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--fg)]">
                <Link href={`/industries/${industry.slug}`}>{industry.title}</Link>
              </h2>
              <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">{industry.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {(industry.priorities || []).slice(0, 3).map((item: string) => (
                  <div key={item} className="border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-2 text-sm text-[color:var(--fg)]">
                    {item}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href="/government" label="View Government Capabilities" style="secondary" />
        </div>
      </section>
    </div>
  )
}
