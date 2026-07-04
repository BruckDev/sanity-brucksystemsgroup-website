import {CustomPortableText} from '@/components/CustomPortableText'
import {Header} from '@/components/Header'
import ImageBox from '@/components/ImageBox'
import {studioUrl} from '@/sanity/lib/api'
import {
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  type DynamicFetchOptions,
} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import type {SettingsQueryResult} from '@/sanity.types'
import {urlForOpenGraphImage} from '@/sanity/lib/utils'
import type {Metadata, ResolvingMetadata} from 'next'
import {createDataAttribute, defineQuery} from 'next-sanity'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {Suspense} from 'react'

type ProjectSlugPageData = {
  _id: string
  _type: 'project'
  client: string | null
  coverImage: React.ComponentProps<typeof ImageBox>['image']
  description: NonNullable<React.ComponentProps<typeof CustomPortableText>['value']>
  duration: {start?: string | null; end?: string | null} | null
  overview: React.ComponentProps<typeof Header>['description']
  site: string | null
  tags: string[] | null
  title: string | null
}

export async function generateMetadata(
  {params}: PageProps<'/projects/[slug]'>,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const [{slug}, {perspective}] = await Promise.all([params, getDynamicFetchOptions()])
  const projectSlugPageMetadataQuery = defineQuery(`
    *[_type == "project" && slug.current == $slug][0] {
      coverImage,
      title,
      "overview": pt::text(overview),
    }
  `)
  const {data} = await sanityFetchMetadata({
    query: projectSlugPageMetadataQuery,
    params: {slug},
    perspective,
  })

  const ogImage = urlForOpenGraphImage(data?.coverImage)
  return {
    title: data?.title,
    description: data?.overview || (await parent).description,
    openGraph: ogImage ? {images: [ogImage, ...((await parent).openGraph?.images || [])]} : {},
  }
}

export default function ProjectSlugPage({params}: PageProps<'/projects/[slug]'>) {
  return (
    <Suspense>
      <DynamicProjectSlugPage params={params} />
    </Suspense>
  )
}

async function DynamicProjectSlugPage({params}: Pick<PageProps<'/projects/[slug]'>, 'params'>) {
  const [{slug}, {perspective, stega}] = await Promise.all([params, getDynamicFetchOptions()])
  return <CachedProjectSlugPage slug={slug} perspective={perspective} stega={stega} />
}

async function CachedProjectSlugPage({
  slug,
  perspective,
  stega,
}: Awaited<PageProps<'/projects/[slug]'>['params']> & DynamicFetchOptions) {
  'use cache'
  const projectSlugPageQuery = defineQuery(`
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      _type,
      client,
      coverImage,
      description,
      duration,
      overview,
      site,
      "slug": slug.current,
      tags,
      title,
    }
  `)
  const projectResult = await sanityFetch({
    query: projectSlugPageQuery,
    params: {slug},
    perspective,
    stega,
  })
  const settingsResult = await sanityFetch({query: settingsQuery, perspective, stega})
  const data = projectResult.data as ProjectSlugPageData | null
  const settingsData = settingsResult.data as SettingsQueryResult

  if (!data?._id) notFound()

  const dataAttribute =
    data?._id && data._type
      ? createDataAttribute({
          baseUrl: studioUrl,
          id: data._id,
          type: data._type,
        })
      : null
  const {client, coverImage, description, duration, overview, site, tags, title} = data
  const uiDataAttribute =
    settingsData?._id && settingsData?._type
      ? createDataAttribute({
          baseUrl: studioUrl,
          id: settingsData._id,
          type: settingsData._type,
        })
      : null

  const startYear = duration?.start ? new Date(duration.start).getFullYear() : undefined
  const endYear = duration?.end ? new Date(duration?.end).getFullYear() : 'Now'

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

      <div className="border border-[var(--border-strong)] bg-[color:var(--bg-elevated)]">
        {/* Image  */}
        <ImageBox
          data-sanity={dataAttribute?.('coverImage')}
          image={coverImage}
          // @TODO add alt field in schema
          alt=""
          classesWrapper="relative aspect-[16/9]"
        />

        <div className="grid grid-cols-1 divide-y divide-[var(--border)] lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {/* Duration */}
          {!!(startYear && endYear) && (
            <div className="p-4 lg:p-5">
              <div
                className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-[color:var(--accent)]"
                data-sanity={uiDataAttribute?.(['uiText', 'projectDurationLabel'])}
              >
                {settingsData?.uiText?.projectDurationLabel || 'Duration'}
              </div>
              <div className="mt-3 text-lg md:text-xl">
                <span data-sanity={dataAttribute?.('duration.start')}>{startYear}</span>
                {' - '}
                <span data-sanity={dataAttribute?.('duration.end')}>{endYear}</span>
              </div>
            </div>
          )}

          {/* Client */}
          {client && (
            <div className="p-4 lg:p-5">
              <div
                className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-[color:var(--accent)]"
                data-sanity={uiDataAttribute?.(['uiText', 'projectClientLabel'])}
              >
                {settingsData?.uiText?.projectClientLabel || 'Client'}
              </div>
              <div className="mt-3 text-lg md:text-xl">{client}</div>
            </div>
          )}

          {/* Site */}
          {site && (
            <div className="p-4 lg:p-5">
              <div
                className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-[color:var(--accent)]"
                data-sanity={uiDataAttribute?.(['uiText', 'projectSiteLabel'])}
              >
                {settingsData?.uiText?.projectSiteLabel || 'Site'}
              </div>
              {site && (
                <Link
                  target="_blank"
                  className="mt-3 inline-block break-words text-lg underline decoration-[color:var(--accent)] underline-offset-4 hover:text-[color:var(--accent)] md:text-xl"
                  href={site}
                >
                  {site}
                </Link>
              )}
            </div>
          )}

          {/* Tags */}
          <div className="p-4 lg:p-5">
            <div
              className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-[color:var(--accent)]"
              data-sanity={uiDataAttribute?.(['uiText', 'projectTagsLabel'])}
            >
              {settingsData?.uiText?.projectTagsLabel || 'Tags'}
            </div>
            <div className="mt-3 flex flex-row flex-wrap gap-2">
              {tags?.map((tag, key) => (
                <div
                  key={key}
                  className="border border-[var(--border)] px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[color:var(--muted)]"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {Array.isArray(description) && (
        <CustomPortableText
          id={data?._id || null}
          type={data?._type || null}
          path={['description']}
          paragraphClasses="font-serif max-w-3xl text-xl leading-relaxed text-[color:var(--muted)]"
          value={description}
        />
      )}
    </>
  )
}
