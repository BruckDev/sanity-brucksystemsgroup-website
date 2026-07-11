import {SiteHeader} from '@/components/site/SiteHeader'
import {fallbackSettings} from '@/sanity/lib/siteFallbacks'

export function Navbar({data}: {data?: any}) {
  return (
    <SiteHeader
      brandEyebrow={data?.brandEyebrow || fallbackSettings.brandEyebrow}
      siteTitle={data?.siteTitle || fallbackSettings.seo.title}
      navigation={data?.headerNavigation || fallbackSettings.headerNavigation}
    />
  )
}
