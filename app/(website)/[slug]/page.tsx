import {CustomPortableText} from '@/components/CustomPortableText'
import {Header} from '@/components/Header'
import {studioUrl} from '@/sanity/lib/api'
import {
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  type DynamicFetchOptions,
} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import type {SettingsQueryResult} from '@/sanity.types'
import type {Metadata, ResolvingMetadata} from 'next'
import {createDataAttribute, defineQuery} from 'next-sanity'
import {notFound} from 'next/navigation'
import {Suspense} from 'react'

type SlugPageData = {
  _id: string
  _type: 'page'
  body: NonNullable<React.ComponentProps<typeof CustomPortableText>['value']>
  overview: React.ComponentProps<typeof Header>['description']
  title: string | null
}

export async function generateMetadata(
  {params}: PageProps<'/[slug]'>,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const [{slug}, {perspective}] = await Promise.all([params, getDynamicFetchOptions()])
  const slugPageMetadataQuery = defineQuery(`
    *[_type == "page" && slug.current == $slug][0] {
      title,
      "overview": pt::text(overview),
    }
  `)
  const {data} = await sanityFetchMetadata({
    query: slugPageMetadataQuery,
    params: {slug},
    perspective,
  })

  return {
    title: data?.title,
    description: data?.overview || (await parent).description,
  }
}

export default function SlugPage({params}: PageProps<'/[slug]'>) {
  return (
    <Suspense>
      <DynamicSlugPage params={params} />
    </Suspense>
  )
}

async function DynamicSlugPage({params}: Pick<PageProps<'/[slug]'>, 'params'>) {
  const [{slug}, {perspective, stega}] = await Promise.all([params, getDynamicFetchOptions()])
  return <CachedSlugPage slug={slug} perspective={perspective} stega={stega} />
}

async function CachedSlugPage({
  slug,
  perspective,
  stega,
}: Awaited<PageProps<'/[slug]'>['params']> & DynamicFetchOptions) {
  'use cache'
  const slugPageQuery = defineQuery(`
    *[_type == "page" && slug.current == $slug][0] {
      _id,
      _type,
      body,
      overview,
      title,
      "slug": slug.current,
    }
  `)
  const pageResult = await sanityFetch({query: slugPageQuery, params: {slug}, perspective, stega})
  const settingsResult = await sanityFetch({query: settingsQuery, perspective, stega})
  const data = pageResult.data as SlugPageData | null
  const settingsData = settingsResult.data as SettingsQueryResult

  if (!data?._id) notFound()

  const {body, overview, title} = data
  const uiDataAttribute =
    settingsData?._id && settingsData?._type
      ? createDataAttribute({
          baseUrl: studioUrl,
          id: settingsData._id,
          type: settingsData._type,
        })
      : null

  return (
    <>
      {/* Header */}
      <Header
        id={data?._id || null}
        type={data?._type || null}
        path={['overview']}
        eyebrow={settingsData?.uiText?.sectionEyebrow}
        eyebrowDataSanity={uiDataAttribute?.(['uiText', 'sectionEyebrow'])}
        title={title || settingsData?.uiText?.untitledFallback || 'Untitled'}
        description={overview}
      />

      {/* Body */}
      {Array.isArray(body) && (
        <CustomPortableText
          id={data?._id || null}
          type={data?._type || null}
          path={['body']}
          paragraphClasses="max-w-3xl text-lg leading-8 text-[color:var(--muted)]"
          value={body}
        />
      )}
    </>
  )
}
