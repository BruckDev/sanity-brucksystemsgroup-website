import {CustomPortableText} from '@/components/CustomPortableText'
import {AbstractPanel} from '@/components/site/AbstractPanel'
import {ButtonLink} from '@/components/site/ButtonLink'
import {CircuitAnimation} from '@/components/site/CircuitAnimation'
import {InsightImage} from '@/components/site/InsightImage'
import {PageHero} from '@/components/site/PageHero'
import {SectionIntro} from '@/components/site/SectionIntro'
import {ServiceImage} from '@/components/site/ServiceImage'
import {getDynamicFetchOptions, sanityFetch} from '@/sanity/lib/live'
import {
  fallbackCaseStudies,
  fallbackHome,
  fallbackInsights,
  fallbackServices,
} from '@/sanity/lib/siteFallbacks'
import {homeQuery, settingsQuery} from '@/sanity/lib/siteQueries'
import Link from 'next/link'

const defaultDisplayCopy = {
  heroEyebrow: 'Bruck Systems Group',
  heroBackgroundImageAlt:
    'Abstract digital network background with glowing blue lines and hexagonal interface shapes.',
  servicesEyebrow: 'Services overview',
  serviceCardLinkLabel: 'View service',
  allServicesLinkLabel: 'Explore All Services',
  servicesAnimationAriaLabel: 'Abstract blue technology animation',
  insightsEyebrow: 'Insights',
  caseStudiesEyebrow: 'Case studies',
  caseStudiesTitle: 'Editorial-ready client story structure',
  caseStudiesDescription:
    'The site is prepared for future approved case studies without inventing past performance.',
  caseStudyPlaceholderLabel: 'Placeholder structure',
  industriesEyebrow: 'Industries',
  governmentEyebrow: 'Government',
  governmentCtaLabel: 'View Government Capabilities',
  governmentPanelTitle: 'Mission-focused support for procurement and modernization.',
  governmentPanelSubtitle: 'Government support',
  engineeringEyebrow: 'Engineering delivery',
  whyUsEyebrow: 'Why us',
  finalCtaEyebrow: 'Contact',
}

export default async function HomePage() {
  const fetchOptions = await getDynamicFetchOptions()
  const [{data: homeData}, {data: settingsData}] = await Promise.all([
    sanityFetch({query: homeQuery, ...fetchOptions}),
    sanityFetch({query: settingsQuery, ...fetchOptions}),
  ])
  const data: any = homeData
  const home: any = data || fallbackHome
  const display = {...defaultDisplayCopy, ...(home.display || {})}
  const uiText = (settingsData as any)?.uiText || {}
  const services = data?.featuredServices?.length
    ? data.featuredServices
    : fallbackServices.slice(0, 3)
  const insights = data?.featuredInsights?.length ? data.featuredInsights : fallbackInsights
  const caseStudies = data?.featuredCaseStudies?.length
    ? data.featuredCaseStudies
    : fallbackCaseStudies
  const servicesVideoLinks = home.servicesVideoLinks?.length
    ? home.servicesVideoLinks
    : fallbackHome.servicesVideoLinks
  const engineeringCapabilities = home.engineeringCapabilities?.length
    ? home.engineeringCapabilities
    : fallbackHome.engineeringCapabilities

  return (
    <div className="space-y-24 pb-8 md:space-y-32">
      <div className="w-full">
        <PageHero
          eyebrow={display.heroEyebrow}
          title={home.title}
          description={home.overview}
          backgroundImageAlt={display.heroBackgroundImageAlt}
          backgroundImageSrc="/images/home/hero-background.png"
          primaryCta={home.heroPrimaryCta}
          secondaryCta={home.heroSecondaryCta}
          stats={home.heroHighlights?.length ? home.heroHighlights : fallbackHome.heroHighlights}
          statsHeading={uiText.heroStatsHeading}
        />
      </div>

      <section>
        <SectionIntro
          eyebrow={display.servicesEyebrow}
          title={home.servicesTitle}
          description={
            <CustomPortableText id={null} type={null} path={[]} value={home.servicesIntro || []} />
          }
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service: any) => (
            <Link
              key={service.slug || service.title}
              href={`/services/${service.slug}`}
              className="surface-card group flex min-h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white p-5 transition hover:-translate-y-1 hover:border-[color:var(--accent)]/40 md:p-6"
            >
              <ServiceImage
                slug={service.slug}
                image={service.image}
                alt={service.image?.alt}
                className="relative aspect-[16/10] overflow-hidden rounded-xl"
                sizes="(min-width: 1280px) 24rem, (min-width: 768px) 50vw, 100vw"
              />
              <div className="mt-6">
                <h3 className="text-2xl font-semibold leading-tight tracking-[-0.03em] text-[color:var(--fg)]">
                  {service.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
                  {service.summary}
                </p>
              </div>
              <div className="mt-auto pt-6 text-sm font-semibold text-[color:var(--accent)] group-hover:text-[color:var(--accent-strong)]">
                {display.serviceCardLinkLabel}
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href="/services" label={display.allServicesLinkLabel} style="secondary" />
        </div>
      </section>

      <div className="w-full">
        <section
          aria-label={display.servicesAnimationAriaLabel}
          className="relative isolate aspect-video overflow-hidden rounded-2xl bg-[#031429] shadow-[0_24px_60px_rgba(7,26,43,0.16)]"
        >
          <CircuitAnimation />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(3,16,35,0.82)_0%,rgba(3,16,35,0.58)_46%,rgba(3,16,35,0.16)_100%)]" />
          <div className="relative z-10 flex h-full items-center justify-center px-6 py-8 text-center md:px-12 md:py-12">
            <div className="max-w-4xl rounded-2xl border border-white/12 bg-[#031429]/76 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-[2px] md:p-10">
              <h2 className="text-4xl font-semibold leading-[0.98] tracking-tight text-white md:text-6xl xl:text-7xl">
                {home.servicesVideoTitle || fallbackHome.servicesVideoTitle}
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-sm leading-6 text-white md:mt-7 md:text-lg md:leading-8">
                {home.servicesVideoText || fallbackHome.servicesVideoText}
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                {servicesVideoLinks.map((link: any) => (
                  <Link
                    key={`${link.label}-${link.href}`}
                    href={link.href || '/'}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-white/30 bg-white px-6 py-3 text-sm font-semibold text-[#075d80] shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:border-white hover:bg-[#eaf9ff] sm:w-[13rem]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <SectionIntro
            eyebrow={display.insightsEyebrow}
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
                className="surface-card rounded-2xl border border-[color:var(--border)] bg-white p-6 transition hover:-translate-y-1"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--accent)]">
                  <span>{insight.articleType}</span>
                  <span className="text-[color:var(--muted)]">{insight.estimatedReadTime}</span>
                </div>
                <InsightImage
                  alt={insight.coverImage?.alt}
                  className="relative mt-5 aspect-[16/9]"
                  image={insight.coverImage}
                  slug={insight.slug}
                />
                <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[color:var(--fg)]">
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
            eyebrow={display.caseStudiesEyebrow}
            title={display.caseStudiesTitle}
            description={display.caseStudiesDescription}
          />
          <div className="mt-8 grid gap-6">
            {caseStudies.map((study: any) => (
              <article
                key={study.slug || study.title}
                className="surface-card rounded-2xl border border-[color:var(--border)] bg-white p-6"
              >
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--accent)]">
                  {display.caseStudyPlaceholderLabel}
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

      <section className="surface-card grid gap-12 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.9fr)]">
        <div>
          <SectionIntro
            eyebrow={display.governmentEyebrow}
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
                className="rounded-full border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-2 text-sm font-medium text-[color:var(--fg)]"
              >
                {capability}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/government" label={display.governmentCtaLabel} style="primary" />
          </div>
        </div>
        <AbstractPanel
          title={display.governmentPanelTitle}
          subtitle={display.governmentPanelSubtitle}
        />
      </section>

      <section>
        <SectionIntro
          eyebrow={display.engineeringEyebrow}
          title={home.engineeringCapabilitiesTitle || fallbackHome.engineeringCapabilitiesTitle}
          description={
            <CustomPortableText
              id={null}
              type={null}
              path={[]}
              value={home.engineeringCapabilitiesIntro || fallbackHome.engineeringCapabilitiesIntro}
            />
          }
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {engineeringCapabilities.map((capability: any) => (
            <article
              key={capability.title}
              className="surface-card rounded-2xl border border-[color:var(--border)] bg-white p-6"
            >
              <h3 className="text-xl font-semibold leading-tight tracking-[-0.025em] text-[color:var(--fg)]">
                {capability.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{capability.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionIntro eyebrow={display.whyUsEyebrow} title={home.whyUsTitle} />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {(home.whyUsCards || []).map((card: any) => (
            <article
              key={card.title}
              className="surface-card rounded-2xl border border-[color:var(--border)] bg-white p-6"
            >
              <h3 className="text-xl font-semibold leading-tight tracking-[-0.025em] text-[color:var(--fg)]">
                {card.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-panel overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--charcoal)] px-6 py-12 text-white shadow-[0_24px_60px_rgba(7,26,43,0.16)] md:px-10 md:py-16">
        <div className="relative z-10 max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#8de1b1]">
            {display.finalCtaEyebrow}
          </div>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] md:text-5xl">
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
