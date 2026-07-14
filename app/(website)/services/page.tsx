import {CustomPortableText} from '@/components/CustomPortableText'
import {ButtonLink} from '@/components/site/ButtonLink'
import {PageHero} from '@/components/site/PageHero'
import {ServiceImage} from '@/components/site/ServiceImage'
import {SectionIntro} from '@/components/site/SectionIntro'
import {sanityFetch} from '@/sanity/lib/live'
import {fallbackServices, toBlocks} from '@/sanity/lib/siteFallbacks'
import {servicesQuery} from '@/sanity/lib/siteQueries'
import Link from 'next/link'
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore Bruck Systems Group services across digital transformation, custom software, analytics, advisory, and government support.',
}

export default async function ServicesPage() {
  const {data} = await sanityFetch({query: servicesQuery, perspective: 'published', stega: false})
  const services: any[] = Array.isArray(data) && data.length ? data : fallbackServices

  return (
    <div className="space-y-16 md:space-y-20">
      <PageHero
        eyebrow="Services"
        title="Consulting and technology services designed for real operational progress."
        description={toBlocks([
          'Bruck Systems Group helps organizations modernize responsibly, build fit-for-purpose software, improve visibility through data, and move initiatives from planning into execution.',
        ])}
        primaryCta={{label: 'Talk to Our Team', href: '/contact', style: 'primary'}}
        secondaryCta={{label: 'View Government Support', href: '/government', style: 'secondary'}}
      />

      <section>
        <SectionIntro
          eyebrow="Capabilities"
          title="Five core service areas"
          description="Each service is structured around client challenges, practical deliverables, and measurable business outcomes."
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
                    <CustomPortableText id={null} type={null} path={[]} value={service.whatWeProvide} />
                  </div>
                ) : null}
              </div>
              <div className="grid gap-6 border-t border-[color:var(--border)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <ServiceImage slug={service.slug} image={service.image} alt={service.image?.alt} />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
                    Example deliverables
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(service.deliverables || []).map((item: string) => (
                      <div key={item} className="border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-2 text-sm text-[color:var(--fg)]">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
                    Expected outcomes
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(service.outcomes || []).map((item: string) => (
                      <div key={item} className="border border-[color:var(--border)] bg-white px-3 py-2 text-sm text-[color:var(--muted)]">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <ButtonLink href={`/services/${service.slug}`} label="Read More" style="secondary" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
