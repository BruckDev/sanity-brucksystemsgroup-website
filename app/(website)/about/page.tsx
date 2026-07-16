import {CustomPortableText} from '@/components/CustomPortableText'
import {ButtonLink} from '@/components/site/ButtonLink'
import {PageHero} from '@/components/site/PageHero'
import {SectionIntro} from '@/components/site/SectionIntro'
import {getDynamicFetchOptions, sanityFetch, sanityFetchMetadata} from '@/sanity/lib/live'
import {fallbackAbout, fallbackLeaders} from '@/sanity/lib/siteFallbacks'
import {aboutQuery, leadersQuery} from '@/sanity/lib/siteQueries'
import type {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const {data} = await sanityFetchMetadata({query: aboutQuery, perspective: 'published'})
  const page: any = data || fallbackAbout
  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description,
  }
}

export default async function AboutPage() {
  const fetchOptions = await getDynamicFetchOptions()
  const [{data: aboutData}, {data: leadersData}] = await Promise.all([
    sanityFetch({query: aboutQuery, ...fetchOptions}),
    sanityFetch({query: leadersQuery, ...fetchOptions}),
  ])
  const page: any = aboutData || fallbackAbout
  const leaders: any[] = leadersData?.length ? leadersData : fallbackLeaders

  return (
    <div className="space-y-16 md:space-y-20">
      <PageHero
        eyebrow={page.display?.heroEyebrow || 'About'}
        title={page.title || ''}
        description={page.overview}
        primaryCta={page.cta}
        secondaryCta={
          page.display?.secondaryCta || {label: 'Contact Us', href: '/contact', style: 'secondary'}
        }
      />

      <section className="grid gap-8 lg:grid-cols-2">
        <article className="border border-[color:var(--border)] bg-white p-6 md:p-8">
          <SectionIntro
            eyebrow={page.display?.missionEyebrow || 'Mission'}
            title={page.display?.missionTitle || 'What guides the firm'}
          />
          <div className="mt-6">
            <CustomPortableText id={null} type={null} path={[]} value={page.mission || []} />
          </div>
        </article>
        <article className="border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-8">
          <SectionIntro
            eyebrow={page.display?.approachEyebrow || 'Approach'}
            title={page.display?.approachTitle || 'How engagements are structured'}
          />
          <div className="mt-6 grid gap-5">
            {(page.approach || []).map((item: any, index: number) => (
              <div
                key={item.title}
                className="border-t border-[color:var(--border)] pt-5 first:border-t-0 first:pt-0"
              >
                <div className="text-sm font-semibold text-[color:var(--accent)]">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-2 text-xl font-semibold text-[color:var(--fg)]">{item.title}</h3>
                <p className="mt-2 text-base leading-7 text-[color:var(--muted)]">{item.text}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section>
        <SectionIntro
          eyebrow={page.display?.principlesEyebrow || 'Operating principles'}
          title={page.display?.principlesTitle || 'How Bruck Systems Group works'}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {(page.principles || []).map((principle: any) => (
            <article
              key={principle.title}
              className="border border-[color:var(--border)] bg-white p-6"
            >
              <h2 className="text-xl font-semibold tracking-tight text-[color:var(--fg)]">
                {principle.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">{principle.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow={page.display?.leadershipEyebrow || 'Leadership'}
          title={page.display?.leadershipTitle || 'Leadership section'}
          description={
            <CustomPortableText
              id={null}
              type={null}
              path={[]}
              value={page.leadershipIntro || []}
            />
          }
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {leaders.map((leader: any) => (
            <article key={leader.name} className="border border-[color:var(--border)] bg-white p-6">
              <div className="text-xl font-semibold tracking-tight text-[color:var(--fg)]">
                {leader.name}
              </div>
              <div className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">
                {leader.role}
              </div>
              <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
                {leader.shortBio}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
