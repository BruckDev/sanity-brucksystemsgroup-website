import '@/styles/index.css'
import {CustomPortableText} from '@/components/CustomPortableText'
import {Navbar} from '@/components/Navbar'
import {
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  SanityLive,
  type DynamicFetchOptions,
} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {urlForOpenGraphImage} from '@/sanity/lib/utils'
import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata, Viewport} from 'next'
import {defineQuery} from 'next-sanity'
import {VisualEditing} from 'next-sanity/visual-editing'
import {draftMode} from 'next/headers'
import {Suspense} from 'react'
import {Toaster} from 'sonner'
import {handleError} from './client-functions'
import {DraftModeToast} from './DraftModeToast'

export async function generateMetadata(): Promise<Metadata> {
  const {perspective} = await getDynamicFetchOptions()
  const layoutMetadataQuery = defineQuery(`{
    "settings": *[_type == "settings"][0]{ogImage},
    "home": *[_type == "home"][0]{
      title,
      "overview": pt::text(overview),
    }
  }`)
  const {
    data: {settings, home},
  } = await sanityFetchMetadata({query: layoutMetadataQuery, perspective})

  const ogImage = urlForOpenGraphImage(settings?.ogImage)
  return {
    title: home?.title
      ? {template: `%s | ${home.title}`, default: home.title || 'Personal website'}
      : undefined,
    description: home?.overview,
    openGraph: {images: ogImage ? [ogImage] : []},
  }
}

export const viewport: Viewport = {themeColor: '#000'}

export default async function PersonalLayout({children}: LayoutProps<'/'>) {
  const {isEnabled: isDraftMode} = await draftMode()
  return (
    <>
      <div className="flex min-h-screen flex-col bg-transparent text-[color:var(--fg)]">
        {isDraftMode ? (
          <Suspense fallback={<NavbarFallback />}>
            <DynamicNavbar />
          </Suspense>
        ) : (
          <CachedNavbar perspective="published" stega={false} />
        )}
        <div className="flex-grow px-4 py-10 md:px-8 md:py-14 lg:px-12 lg:py-16">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </div>
        {isDraftMode ? (
          <Suspense>
            <DynamicFooter />
          </Suspense>
        ) : (
          <CachedFooter perspective="published" stega={false} />
        )}
      </div>
      <Toaster />
      <SanityLive onError={handleError} includeDrafts={isDraftMode} />
      {isDraftMode && (
        <>
          <DraftModeToast
            action={async () => {
              'use server'

              await Promise.allSettled([
                (await draftMode()).disable(),
                // Simulate a delay to show the loading state
                new Promise((resolve) => setTimeout(resolve, 1000)),
              ])
            }}
          />
          <VisualEditing />
        </>
      )}
      <SpeedInsights />
    </>
  )
}

/**
 * Shared cache leaf — both the navbar and footer derive from the same `settingsQuery`, so
 * neither has to wait independently for the same data.
 */
async function fetchSettings({perspective, stega}: DynamicFetchOptions) {
  'use cache'
  const {data} = await sanityFetch({query: settingsQuery, perspective, stega})
  return data
}

async function DynamicNavbar() {
  const {perspective, stega} = await getDynamicFetchOptions()
  return <CachedNavbar perspective={perspective} stega={stega} />
}

async function CachedNavbar({perspective, stega}: DynamicFetchOptions) {
  'use cache'
  const data = await fetchSettings({perspective, stega})
  return <Navbar data={data} />
}

/**
 * Mirrors the real `<Navbar>` shell so the static fallback occupies the same vertical space.
 * Width of the placeholder link is arbitrary — height is what matters to avoid layout shift.
 */
function NavbarFallback() {
  return (
    <header
      aria-busy
      className="sticky top-0 z-20 border-b border-[var(--border)] bg-[color:var(--bg-elevated)] px-4 py-4 shadow-sm backdrop-blur-xl md:px-8 lg:px-12"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <div className="h-3 w-28 animate-pulse rounded-full bg-[color:var(--border)]" />
          <div className="h-8 w-72 animate-pulse rounded bg-[color:var(--border)]" />
        </div>
      </div>
    </header>
  )
}

async function DynamicFooter() {
  const {perspective, stega} = await getDynamicFetchOptions()
  return <CachedFooter perspective={perspective} stega={stega} />
}

async function CachedFooter({perspective, stega}: DynamicFetchOptions) {
  'use cache'
  const data = await fetchSettings({perspective, stega})
  if (!Array.isArray(data?.footer)) {
    return null
  }
  return (
    <footer className="mt-16 border-t border-[var(--border)] py-10 md:mt-24 md:py-16">
      <CustomPortableText
        id={data._id}
        type={data._type}
        path={['footer']}
        paragraphClasses="max-w-4xl font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--muted)] md:text-sm"
        value={data.footer}
      />
    </footer>
  )
}
