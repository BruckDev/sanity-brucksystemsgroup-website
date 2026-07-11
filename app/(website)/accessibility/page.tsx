import {PageHero} from '@/components/site/PageHero'
import {toBlocks} from '@/sanity/lib/siteFallbacks'
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Accessibility',
  description: 'Accessibility commitment placeholder for the Bruck Systems Group website.',
}

export default function AccessibilityPage() {
  return (
    <div className="space-y-12">
      <PageHero
        eyebrow="Accessibility"
        title="Accessibility statement placeholder"
        description={toBlocks([
          'This page can be replaced with a formal accessibility statement when preferred language and support contact details are available.',
        ])}
      />
      <section className="max-w-4xl border border-dashed border-[color:var(--border-strong)] bg-white p-6 text-base leading-8 text-[color:var(--muted)] md:p-8">
        The website has been built with responsive layouts, visible focus states, readable contrast, and keyboard-friendly navigation. Before launch, add the organization’s preferred accessibility contact method and any formal policy text required for your audience.
      </section>
    </div>
  )
}
