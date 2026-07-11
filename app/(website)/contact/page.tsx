import {CustomPortableText} from '@/components/CustomPortableText'
import {ContactForm} from '@/components/site/ContactForm'
import {PageHero} from '@/components/site/PageHero'
import {sanityFetch, sanityFetchMetadata} from '@/sanity/lib/live'
import {fallbackContact, fallbackSettings} from '@/sanity/lib/siteFallbacks'
import {contactPageQuery, settingsQuery} from '@/sanity/lib/siteQueries'
import type {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const {data} = await sanityFetchMetadata({query: contactPageQuery, perspective: 'published'})
  const page: any = data || fallbackContact
  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description,
  }
}

export default async function ContactPage() {
  const [{data: contactData}, {data: settingsData}] = await Promise.all([
    sanityFetch({query: contactPageQuery, perspective: 'published', stega: false}),
    sanityFetch({query: settingsQuery, perspective: 'published', stega: false}),
  ])
  const page: any = contactData || fallbackContact
  const settings: any = settingsData || fallbackSettings

  return (
    <div className="space-y-16 md:space-y-20">
      <PageHero eyebrow="Contact" title={page.title} description={page.overview} />

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
        <ContactForm formNote={page.formNote} />
        <aside className="space-y-6">
          <article className="border border-[color:var(--border)] bg-white p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
              Contact information
            </div>
            <div className="mt-6 space-y-5">
              {(settings.contactMethods || []).map((item: any) => (
                <div key={`${item.label}-${item.value}`}>
                  <div className="text-sm font-semibold text-[color:var(--fg)]">{item.label}</div>
                  <div className="mt-1 text-sm leading-7 text-[color:var(--muted)]">{item.value}</div>
                </div>
              ))}
            </div>
          </article>
          <article className="border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
              Important note
            </div>
            <div className="mt-6">
              <CustomPortableText
                id={null}
                type={null}
                path={[]}
                value={fallbackContact.overview}
              />
            </div>
          </article>
        </aside>
      </section>
    </div>
  )
}
