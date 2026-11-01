import type {MetadataRoute} from 'next'

const baseUrl = 'https://www.brucksystems.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/services', '/industries', '/government', '/insights', '/about', '/contact', '/privacy', '/accessibility']

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }))
}
