import '@/styles/index.css'
import {SiteFooter} from '@/components/site/SiteFooter'
import {SiteHeader} from '@/components/site/SiteHeader'
import {sanityFetch, sanityFetchMetadata} from '@/sanity/lib/live'
import {fallbackSettings} from '@/sanity/lib/siteFallbacks'
import {settingsQuery} from '@/sanity/lib/siteQueries'
import {urlForOpenGraphImage} from '@/sanity/lib/utils'
import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata, Viewport} from 'next'
import {defineQuery} from 'next-sanity'

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
  const metadataData = (await sanityFetchMetadata({
    query: layoutMetadataQuery,
    perspective: 'published',
  })).data as any
  const settings = metadataData?.settings || {}
  const home = metadataData?.home || {}
  const ogImage = urlForOpenGraphImage(settings?.ogImage)
  const title = home?.seo?.title || settings?.seo?.title || home?.title || fallbackSettings.seo.title
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
  const data = await fetchSettings()

  return (
    <>
      <div className="site-shell flex min-h-screen flex-col bg-transparent text-[color:var(--fg)]">
        <SiteHeader
          brandEyebrow={data?.brandEyebrow || fallbackSettings.brandEyebrow}
          siteTitle={data?.siteTitle || fallbackSettings.siteTitle}
          navigation={data?.headerNavigation || fallbackSettings.headerNavigation}
        />
        <main className="flex-grow px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:py-14">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
        <SiteFooter
          siteTitle={data?.siteTitle || fallbackSettings.siteTitle}
          contactMethods={data?.contactMethods || fallbackSettings.contactMethods}
          footerColumns={data?.footerColumns || fallbackSettings.footerColumns}
          footerNote={data?.footerNote || fallbackSettings.footerNote}
          linkedin={data?.linkedin}
        />
      </div>
      <SpeedInsights />
    </>
  )
}

async function fetchSettings() {
  'use cache'
  const {data} = await sanityFetch({
    query: settingsQuery,
    perspective: 'published',
    stega: false,
  })

  return (data as any) || fallbackSettings
}
