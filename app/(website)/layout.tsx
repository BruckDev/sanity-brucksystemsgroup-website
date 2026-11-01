import '@/styles/index.css'
import {SiteFooter} from '@/components/site/SiteFooter'
import {SiteHeader} from '@/components/site/SiteHeader'
import {
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  SanityLive,
  type DynamicFetchOptions,
} from '@/sanity/lib/live'
import {fallbackSettings} from '@/sanity/lib/siteFallbacks'
import {settingsQuery} from '@/sanity/lib/siteQueries'
import {urlForOpenGraphImage} from '@/sanity/lib/utils'
import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata, Viewport} from 'next'
import {defineQuery} from 'next-sanity'
import {VisualEditing} from 'next-sanity/visual-editing'
import {draftMode} from 'next/headers'
import {Suspense} from 'react'

export async function generateMetadata(): Promise<Metadata> {
  const layoutMetadataQuery = defineQuery(`{
    "settings": *[_type == "settings"][0]{
      ogImage,
      seo,
      siteTitle
    },
    "home": *[_type == "home"][0]{
      title,
      seo,
      "overview": pt::text(overview)
    }
  }`)
  const metadataData = (
    await sanityFetchMetadata({
      query: layoutMetadataQuery,
      perspective: 'published',
    })
  ).data as any
  const settings = metadataData?.settings || {}
  const home = metadataData?.home || {}
  const ogImage = urlForOpenGraphImage(settings?.ogImage)
  const title =
    home?.seo?.title || settings?.seo?.title || home?.title || fallbackSettings.seo.title
  const description =
    home?.seo?.description ||
    settings?.seo?.description ||
    home?.overview ||
    fallbackSettings.seo.description

  return {
    title: {template: `%s | ${settings?.siteTitle || fallbackSettings.siteTitle}`, default: title},
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  }
}

export const viewport: Viewport = {themeColor: '#111111'}

export default async function WebsiteLayout({children}: LayoutProps<'/'>) {
  const {isEnabled: isDraftMode} = await draftMode()

  return (
    <>
      <div className="site-shell flex min-h-screen flex-col bg-transparent text-[color:var(--fg)]">
        {isDraftMode ? (
          <Suspense fallback={<WebsiteHeader data={fallbackSettings} />}>
            <DynamicWebsiteHeader />
          </Suspense>
        ) : (
          <CachedWebsiteHeader perspective="published" stega={false} />
        )}
        <main className="flex-grow px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:py-14">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
        {isDraftMode ? (
          <Suspense fallback={<WebsiteFooter data={fallbackSettings} />}>
            <DynamicWebsiteFooter />
          </Suspense>
        ) : (
          <CachedWebsiteFooter perspective="published" stega={false} />
        )}
      </div>
      <Suspense fallback={null}>
        <SpeedInsights />
      </Suspense>
      <SanityLive includeDrafts={isDraftMode} />
      {isDraftMode ? <VisualEditing /> : null}
    </>
  )
}

async function DynamicWebsiteHeader() {
  return <CachedWebsiteHeader {...await getDynamicFetchOptions()} />
}

async function CachedWebsiteHeader(fetchOptions: DynamicFetchOptions) {
  'use cache'
  return <WebsiteHeader data={await fetchSettings(fetchOptions)} />
}

async function DynamicWebsiteFooter() {
  return <CachedWebsiteFooter {...await getDynamicFetchOptions()} />
}

async function CachedWebsiteFooter(fetchOptions: DynamicFetchOptions) {
  'use cache'
  return <WebsiteFooter data={await fetchSettings(fetchOptions)} />
}

async function fetchSettings(fetchOptions: DynamicFetchOptions) {
  'use cache'
  const {data} = await sanityFetch({
    query: settingsQuery,
    ...fetchOptions,
  })

  return (data as any) || fallbackSettings
}

function WebsiteHeader({data}: {data: any}) {
  return (
    <SiteHeader
      brandEyebrow={data?.brandEyebrow || fallbackSettings.brandEyebrow}
      siteTitle={data?.siteTitle || fallbackSettings.siteTitle}
      navigation={data?.headerNavigation || fallbackSettings.headerNavigation}
      uiText={data?.uiText}
    />
  )
}

function WebsiteFooter({data}: {data: any}) {
  return (
    <SiteFooter
      siteTitle={data?.siteTitle || fallbackSettings.siteTitle}
      contactMethods={data?.contactMethods || fallbackSettings.contactMethods}
      footerColumns={data?.footerColumns || fallbackSettings.footerColumns}
      footerNote={data?.footerNote || fallbackSettings.footerNote}
      linkedin={data?.linkedin}
      uiText={data?.uiText}
    />
  )
}
