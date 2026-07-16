import {CustomPortableText} from '@/components/CustomPortableText'
import {ButtonLink} from '@/components/site/ButtonLink'
import {PageHero} from '@/components/site/PageHero'
import {SectionIntro} from '@/components/site/SectionIntro'
import {getDynamicFetchOptions, sanityFetch, sanityFetchMetadata} from '@/sanity/lib/live'
import {fallbackGovernment} from '@/sanity/lib/siteFallbacks'
import {governmentQuery} from '@/sanity/lib/siteQueries'
import type {Metadata} from 'next'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const {data} = await sanityFetchMetadata({query: governmentQuery, perspective: 'published'})
  const page: any = data || fallbackGovernment
  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description,
  }
}

export default async function GovernmentPage() {
  const fetchOptions = await getDynamicFetchOptions()
  const {data} = await sanityFetch({query: governmentQuery, ...fetchOptions})
  const page: any = data || fallbackGovernment
  const capabilityUrl = page?.capabilityStatement?.asset?.url || null

  return (
    <div className="space-y-16 md:space-y-20">
      <PageHero
        eyebrow={page.display?.heroEyebrow || 'Government'}
        title={page.title}
        description={page.overview}
        primaryCta={page.cta}
        secondaryCta={
          page.display?.secondaryCta || {label: 'Contact Us', href: '/contact', style: 'secondary'}
        }
      />

      <section>
        <SectionIntro
          eyebrow={page.display?.capabilitiesEyebrow || 'Capabilities'}
          title={
            page.display?.capabilitiesTitle || 'Structured support for public-sector modernization'
          }
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {(page.capabilities || []).map((capability: any) => (
            <article
              key={capability.title}
              className="border border-[color:var(--border)] bg-white p-6"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--fg)]">
                {capability.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
                {capability.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.9fr)]">
        <article className="border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
            {page.display?.supportAreasLabel || 'Support areas'}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {(page.supportAreas || []).map((item: string) => (
              <div
                key={item}
                className="border border-[color:var(--border)] bg-white px-4 py-2 text-sm text-[color:var(--fg)]"
              >
                {item}
              </div>
            ))}
          </div>
        </article>
        <article className="border border-[color:var(--border)] bg-white p-6 md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
            {page.display?.vendorInformationLabel || 'Vendor information'}
          </div>
          <div className="mt-6">
            <CustomPortableText
              id={null}
              type={null}
              path={[]}
              value={page.vendorInformation || []}
            />
          </div>
          <div className="mt-8">
            {capabilityUrl ? (
              <ButtonLink
                href={capabilityUrl}
                label={
                  page.display?.downloadCapabilityStatementLabel || 'Download Capability Statement'
                }
                style="primary"
              />
            ) : (
              <div className="border border-dashed border-[color:var(--border-strong)] bg-[color:var(--bg)] p-4 text-sm leading-7 text-[color:var(--muted)]">
                {page.display?.capabilityStatementEmptyMessage ||
                  'Capability statement PDF placeholder. Upload the approved file in Sanity to replace this message.'}
              </div>
            )}
          </div>
        </article>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <article className="border border-[color:var(--border)] bg-white p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--fg)]">
            {page.display?.teamingTitle || 'Teaming and subcontracting'}
          </h2>
          <div className="mt-6">
            <CustomPortableText id={null} type={null} path={[]} value={page.teaming || []} />
          </div>
        </article>
        <article className="border border-[color:var(--border)] bg-[color:var(--charcoal)] p-6 text-white md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            {page.display?.relatedServicesTitle || 'Relevant service areas'}
          </h2>
          <div className="mt-6 grid gap-3 text-sm leading-7 text-white/78">
            {(page.relatedServices || []).map((service: any) => (
              <Link key={service.slug || service.title} href={`/services/${service.slug}`}>
                {service.title}
              </Link>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}
