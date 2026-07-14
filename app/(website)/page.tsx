import {CustomPortableText} from '@/components/CustomPortableText'
import {AbstractPanel} from '@/components/site/AbstractPanel'
import {ButtonLink} from '@/components/site/ButtonLink'
import {PageHero} from '@/components/site/PageHero'
import {SectionIntro} from '@/components/site/SectionIntro'
import {ServiceImage} from '@/components/site/ServiceImage'
import {sanityFetch} from '@/sanity/lib/live'
import {
  fallbackCaseStudies,
  fallbackHome,
  fallbackIndustries,
  fallbackInsights,
  fallbackServices,
} from '@/sanity/lib/siteFallbacks'
import {homeQuery} from '@/sanity/lib/siteQueries'
import Link from 'next/link'

export default async function HomePage() {
  const {data} = await sanityFetch({query: homeQuery, perspective: 'published', stega: false})
  const home: any = data || fallbackHome
  const services = data?.featuredServices?.length
    ? data.featuredServices
    : fallbackServices.slice(0, 3)
  const insights = data?.featuredInsights?.length ? data.featuredInsights : fallbackInsights
  const caseStudies = data?.featuredCaseStudies?.length
    ? data.featuredCaseStudies
    : fallbackCaseStudies
  const industries = data?.featuredIndustries?.length ? data.featuredIndustries : fallbackIndustries

  return (
    <div className="space-y-20 pb-8 md:space-y-28">
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <PageHero
          eyebrow="Bruck Systems Group"
          title={home.title}
          description={home.overview}
          backgroundImageAlt="Abstract digital network background with glowing blue lines and hexagonal interface shapes."
          backgroundImageSrc="/images/home/hero-background.png"
          primaryCta={home.heroPrimaryCta}
          secondaryCta={home.heroSecondaryCta}
          stats={home.heroHighlights}
        />
      </div>

      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
        <div>
          <SectionIntro
            eyebrow="Services overview"
            title={home.servicesTitle}
            description={
              <CustomPortableText
                id={null}
                type={null}
                path={[]}
                value={home.servicesIntro || []}
              />
            }
          />
          <div className="mt-10 grid gap-px border border-[color:var(--border)] bg-[color:var(--border)]">
            {services.map((service: any, index: number) => (
              <Link
                key={service.slug || service.title}
                href={`/services/${service.slug}`}
                className="group grid gap-5 bg-white p-6 transition hover:bg-[color:var(--bg)] md:grid-cols-[4rem_minmax(0,1fr)_15rem] md:items-center xl:grid-cols-[4rem_minmax(0,1fr)_18rem]"
              >
                <div className="text-sm font-semibold text-[color:var(--accent)]">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-[color:var(--fg)]">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-[color:var(--muted)]">
                    {service.summary}
                  </p>
                </div>
                <div className="text-sm font-semibold text-[color:var(--muted)] group-hover:text-[color:var(--fg)] md:col-start-2">
                  View service
                </div>
                <ServiceImage
                  slug={service.slug}
                  image={service.image}
                  alt={service.image?.alt}
                  className="relative aspect-[16/10] min-h-[12rem] md:col-start-3 md:row-start-1 md:row-span-2 md:min-h-0"
                  sizes="(min-width: 1280px) 18rem, (min-width: 768px) 15rem, 100vw"
                />
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/services" label="Explore All Services" style="secondary" />
          </div>
        </div>
        <AbstractPanel
          title="Operational clarity meets technical delivery."
          subtitle="Original abstract system graphic"
        />
      </section>

      <section className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <SectionIntro
            eyebrow="Insights"
            title={home.insightsTitle}
            description={
              <CustomPortableText
                id={null}
                type={null}
                path={[]}
                value={home.insightsIntro || []}
              />
            }
          />
          <div className="mt-8 grid gap-6">
            {insights.map((insight: any) => (
              <article
                key={insight.slug || insight.title}
                className="border border-[color:var(--border)] bg-white p-6 transition hover:-translate-y-1"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">
                  <span>{insight.articleType}</span>
                  <span className="text-[color:var(--muted)]">{insight.estimatedReadTime}</span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-[color:var(--fg)]">
                  <Link href={`/insights/${insight.slug}`}>{insight.title}</Link>
                </h3>
                <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
                  {insight.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div>
          <SectionIntro
            eyebrow="Case studies"
            title="Editorial-ready client story structure"
            description="The site is prepared for future approved case studies without inventing past performance."
          />
          <div className="mt-8 grid gap-6">
            {caseStudies.map((study: any) => (
              <article
                key={study.slug || study.title}
                className="border border-[color:var(--border)] bg-white p-6"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">
                  Placeholder structure
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[color:var(--fg)]">
                  <Link href={`/insights/case-studies/${study.slug}`}>{study.title}</Link>
                </h3>
                <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
                  {study.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionIntro
          eyebrow="Industries"
          title={home.industriesTitle}
          description={
            <CustomPortableText
              id={null}
              type={null}
              path={[]}
              value={home.industriesIntro || []}
            />
          }
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry: any) => (
            <article
              key={industry.slug || industry.title}
              className="border border-[color:var(--border)] bg-white p-6"
            >
              <h3 className="text-2xl font-semibold tracking-tight text-[color:var(--fg)]">
                <Link href={`/industries/${industry.slug}`}>{industry.title}</Link>
              </h3>
              <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
                {industry.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-12 border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.9fr)]">
        <div>
          <SectionIntro
            eyebrow="Government"
            title={home.governmentTitle}
            description={
              <CustomPortableText
                id={null}
                type={null}
                path={[]}
                value={home.governmentIntro || []}
              />
            }
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {(home.governmentCapabilities || []).map((capability: string) => (
              <div
                key={capability}
                className="border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-2 text-sm font-medium text-[color:var(--fg)]"
              >
                {capability}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/government" label="View Government Capabilities" style="primary" />
          </div>
        </div>
        <AbstractPanel
          title="Mission-focused support for procurement and modernization."
          subtitle="Government support"
        />
      </section>

      <section>
        <SectionIntro eyebrow="Why us" title={home.whyUsTitle} />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {(home.whyUsCards || []).map((card: any) => (
            <article key={card.title} className="border border-[color:var(--border)] bg-white p-6">
              <h3 className="text-xl font-semibold tracking-tight text-[color:var(--fg)]">
                {card.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-panel border border-[color:var(--border)] bg-[color:var(--charcoal)] px-6 py-12 text-white md:px-10 md:py-16">
        <div className="relative z-10 max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
            Contact
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            {home.finalCtaTitle}
          </h2>
          <div className="mt-6 text-lg leading-8 text-white/76">
            <CustomPortableText id={null} type={null} path={[]} value={home.finalCtaText || []} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink {...home.finalPrimaryCta} />
            <ButtonLink {...home.finalSecondaryCta} />
          </div>
        </div>
      </section>
    </div>
  )
}
