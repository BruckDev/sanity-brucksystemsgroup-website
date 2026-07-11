import {PageHero} from '@/components/site/PageHero'
import {toBlocks} from '@/sanity/lib/siteFallbacks'
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Placeholder privacy information for the Bruck Systems Group website.',
}

export default function PrivacyPage() {
  return (
    <div className="space-y-12">
      <PageHero
        eyebrow="Privacy"
        title="Privacy information placeholder"
        description={toBlocks([
          'Replace this page with organization-specific privacy language once legal and operational requirements are confirmed.',
        ])}
      />
      <section className="max-w-4xl border border-dashed border-[color:var(--border-strong)] bg-white p-6 text-base leading-8 text-[color:var(--muted)] md:p-8">
        This placeholder page exists so the site includes a clear privacy destination in the footer. Before launch, add approved privacy language covering data collection, contact forms, analytics, and any third-party services used on the website.
      </section>
    </div>
  )
}
