import {CustomPortableText} from '@/components/CustomPortableText'
import {ButtonLink} from '@/components/site/ButtonLink'
import {PageHero} from '@/components/site/PageHero'
import {ServiceImage} from '@/components/site/ServiceImage'
import {getDynamicFetchOptions, sanityFetch, sanityFetchMetadata} from '@/sanity/lib/live'
import {fallbackServices, toBlocks} from '@/sanity/lib/siteFallbacks'
import {serviceBySlugQuery} from '@/sanity/lib/siteQueries'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

export function generateStaticParams() {
  return fallbackServices.map((service) => ({slug: service.slug}))
}

export async function generateMetadata({params}: PageProps<'/services/[slug]'>): Promise<Metadata> {
  const {slug} = await params
  const {data} = await sanityFetchMetadata({
    query: serviceBySlugQuery,
    params: {slug},
    perspective: 'published',
  })
  const fallback = fallbackServices.find((item) => item.slug === slug)
  const service: any = data || fallback

  return {
    title: service?.seo?.title || service?.title,
    description: service?.seo?.description || service?.summary,
  }
}

export default async function ServiceDetailPage({params}: PageProps<'/services/[slug]'>) {
  const {slug} = await params
  const fetchOptions = await getDynamicFetchOptions()
  const {data} = await sanityFetch({
    query: serviceBySlugQuery,
    params: {slug},
    ...fetchOptions,
  })
  const service: any = data || fallbackServices.find((item) => item.slug === slug)

  if (!service) {
    notFound()
  }

  return (
    <div className="space-y-16 md:space-y-20">
      <PageHero
        eyebrow={service.display?.heroEyebrow || 'Service'}
        title={service.title || ''}
        description={service.summary ? toBlocks([service.summary]) : []}
        primaryCta={service.cta}
        secondaryCta={
          service.display?.backCta || {
            label: 'Explore All Services',
            href: '/services',
            style: 'secondary',
          }
        }
        stats={service.featuredStats}
      />

      <ServiceImage
        slug={service.slug}
        image={service.image}
        alt={service.image?.alt}
        className="relative aspect-[16/7]"
        sizes="100vw"
      />

      <section className="grid gap-8 lg:grid-cols-2">
        <article className="border border-[color:var(--border)] bg-white p-6 md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
            {service.display?.clientProblemLabel || 'The client problem'}
          </div>
          <div className="mt-6">
            <CustomPortableText
              id={null}
              type={null}
              path={[]}
              value={service.clientProblem || []}
            />
          </div>
        </article>
        <article className="border border-[color:var(--border)] bg-white p-6 md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
            {service.display?.whatWeProvideLabel || 'What Bruck Systems Group provides'}
          </div>
          <div className="mt-6">
            <CustomPortableText
              id={null}
              type={null}
              path={[]}
              value={service.whatWeProvide || []}
            />
          </div>
        </article>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <article className="border border-[color:var(--border)] bg-white p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--fg)]">
            {service.display?.deliverablesTitle || 'Example deliverables'}
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {(service.deliverables || []).map((item: string) => (
              <div
                key={item}
                className="border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-2 text-sm text-[color:var(--fg)]"
              >
                {item}
              </div>
            ))}
          </div>
        </article>
        <article className="border border-[color:var(--border)] bg-white p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--fg)]">
            {service.display?.outcomesTitle || 'Expected business outcomes'}
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {(service.outcomes || []).map((item: string) => (
              <div
                key={item}
                className="border border-[color:var(--border)] bg-white px-4 py-2 text-sm text-[color:var(--muted)]"
              >
                {item}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-10">
        <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--fg)]">
          {service.display?.closingTitle || 'Ready to discuss this service area?'}
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
          {service.display?.closingText ||
            'We can help shape priorities, define a realistic starting point, and align the work to business or mission outcomes.'}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink {...service.cta} />
          <ButtonLink
            {...(service.display?.closingCta || {
              href: '/contact',
              label: 'Talk to Our Team',
              style: 'secondary',
            })}
          />
        </div>
      </section>
    </div>
  )
}
