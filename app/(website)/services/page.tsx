import {CustomPortableText} from '@/components/CustomPortableText'
import {ButtonLink} from '@/components/site/ButtonLink'
import {PageHero} from '@/components/site/PageHero'
import {SectionIntro} from '@/components/site/SectionIntro'
import {ServiceImage} from '@/components/site/ServiceImage'
import {getDynamicFetchOptions, sanityFetch, sanityFetchMetadata} from '@/sanity/lib/live'
import {fallbackServices, fallbackServicesLanding} from '@/sanity/lib/siteFallbacks'
import {servicesLandingQuery, servicesQuery} from '@/sanity/lib/siteQueries'
import type {Metadata} from 'next'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const {data} = await sanityFetchMetadata({query: servicesLandingQuery, perspective: 'published'})
  const seo = (data as any)?.seo || fallbackServicesLanding.seo
  return {
    title: seo.title || fallbackServicesLanding.seo.title,
    description: seo.description || fallbackServicesLanding.seo.description,
  }
}

export default async function ServicesPage() {
  const fetchOptions = await getDynamicFetchOptions()
  const [{data: servicesData}, {data: landingData}] = await Promise.all([
    sanityFetch({query: servicesQuery, ...fetchOptions}),
    sanityFetch({query: servicesLandingQuery, ...fetchOptions}),
  ])
  const services: any[] =
    Array.isArray(servicesData) && servicesData.length ? servicesData : fallbackServices
  const landing = {...fallbackServicesLanding, ...(landingData as any)}

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
          description={landing.sectionDescription}
        />
        <div className="mt-10 grid gap-8">
          {services.map((service: any) => (
            <article
              key={service.slug || service.title}
              className="grid gap-8 border border-[color:var(--border)] bg-white p-6 md:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]"
            >
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--fg)]">
                  <Link href={`/services/${service.slug}`}>{service.title}</Link>
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                  {service.summary}
                </p>
                {Array.isArray(service.whatWeProvide) ? (
                  <div className="mt-6 max-w-3xl">
                    <CustomPortableText
                      id={null}
                      type={null}
                      path={[]}
                      value={service.whatWeProvide}
                    />
                  </div>
                ) : null}
              </div>
              <div className="grid gap-6 border-t border-[color:var(--border)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <ServiceImage slug={service.slug} image={service.image} alt={service.image?.alt} />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
                    {landing.deliverablesLabel}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(service.deliverables || []).map((item: string) => (
                      <div
                        key={item}
                        className="border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-2 text-sm text-[color:var(--fg)]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
                    {landing.outcomesLabel}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(service.outcomes || []).map((item: string) => (
                      <div
                        key={item}
                        className="border border-[color:var(--border)] bg-white px-3 py-2 text-sm text-[color:var(--muted)]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <ButtonLink
                  href={`/services/${service.slug}`}
                  label={landing.detailCtaLabel}
                  style="secondary"
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
