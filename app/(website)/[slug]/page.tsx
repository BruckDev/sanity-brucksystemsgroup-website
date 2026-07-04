import {CustomPortableText} from '@/components/CustomPortableText'
import {Header} from '@/components/Header'
import {
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  type DynamicFetchOptions,
} from '@/sanity/lib/live'
import type {Metadata, ResolvingMetadata} from 'next'
import {defineQuery} from 'next-sanity'
import {notFound} from 'next/navigation'
import {Suspense} from 'react'

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
      "ui": *[_type == "settings"][0]{
        uiText{
          sectionEyebrow,
          untitledFallback,
        }
      }.uiText,
      title,
      "slug": slug.current,
    }
  `)
  const {data} = await sanityFetch({query: slugPageQuery, params: {slug}, perspective, stega})

  if (!data?._id) notFound()

  const {body, overview, title, ui} = data ?? {}

  return (
    <>
      {/* Header */}
      <Header
        id={data?._id || null}
        type={data?._type || null}
        path={['overview']}
        eyebrow={ui?.sectionEyebrow}
        title={title || ui?.untitledFallback || 'Untitled'}
        description={overview}
      />

      {/* Body */}
      {Array.isArray(body) && (
        <CustomPortableText
          id={data?._id || null}
          type={data?._type || null}
          path={['body']}
          paragraphClasses="font-serif max-w-3xl text-xl leading-relaxed text-[color:var(--muted)]"
          value={body}
        />
      )}
    </>
  )
}
