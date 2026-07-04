import {CustomPortableText} from '@/components/CustomPortableText'
import {Header} from '@/components/Header'
import ImageBox from '@/components/ImageBox'
import {OptimisticSortOrder} from '@/components/OptimisticSortOrder'
import {studioUrl} from '@/sanity/lib/api'
import {getDynamicFetchOptions, sanityFetch, type DynamicFetchOptions} from '@/sanity/lib/live'
import {resolveHref} from '@/sanity/lib/utils'
import {createDataAttribute, defineQuery} from 'next-sanity'
import {draftMode} from 'next/headers'
import Link from 'next/link'
import {Suspense} from 'react'

export default async function IndexPage() {
  const {isEnabled: isDraftMode} = await draftMode()
  if (!isDraftMode) {
    return <CachedHome perspective="published" stega={false} />
  }
  return (
    <Suspense>
      <DynamicHome />
    </Suspense>
  )
}

async function DynamicHome() {
  const {perspective, stega} = await getDynamicFetchOptions()
  return <CachedHome perspective={perspective} stega={stega} />
}

async function CachedHome({perspective, stega}: DynamicFetchOptions) {
  'use cache'
  const homePageQuery = defineQuery(`
    *[_type == "home"][0]{
      _id,
      _type,
      overview,
      showcaseDescription,
      showcaseLabel,
      showcaseProjectLabel,
      showcaseProjects[]{
        _key,
        ...@->{
          _id,
          _type,
          coverImage,
          overview,
          "slug": slug.current,
          tags,
          title,
        }
      },
      title,
    }
  `)
  const {data} = await sanityFetch({query: homePageQuery, perspective, stega})

  if (!data) {
    return (
      <div className="border border-[var(--border-strong)] bg-[color:var(--bg-elevated)] p-8 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
        You don&rsquo;t have a homepage yet,{' '}
        <Link
          href={`${studioUrl}/structure/home`}
          className="text-[color:var(--accent)] underline decoration-[color:var(--accent)] underline-offset-4"
        >
          create one now
        </Link>
        !
      </div>
    )
  }

  // Default to an empty object to allow previews on non-existent documents
  const {
    overview = [],
    showcaseDescription = '',
    showcaseLabel = '',
    showcaseProjectLabel = '',
    showcaseProjects = [],
    title = '',
  } = data ?? {}

  const dataAttribute =
    data?._id && data?._type
      ? createDataAttribute({
          baseUrl: studioUrl,
          id: data._id,
          type: data._type,
        })
      : null

  return (
    <div className="space-y-10 md:space-y-14">
      {title && (
        <Header
          id={data?._id || null}
          type={data?._type || null}
          path={['overview']}
          centered
          title={title}
          description={overview}
        />
      )}
      <div className="grid gap-4 border-y border-[var(--border-strong)] py-4 md:grid-cols-[minmax(0,1fr)_16rem] md:items-end">
        <div
          className="font-mono text-[0.72rem] uppercase tracking-[0.26em] text-[color:var(--accent)]"
          data-sanity={dataAttribute?.('showcaseLabel')}
        >
          {showcaseLabel}
        </div>
        <div
          className="text-sm leading-relaxed text-[color:var(--muted)] md:text-right"
          data-sanity={dataAttribute?.('showcaseDescription')}
        >
          {showcaseDescription}
        </div>
      </div>

      <div className="border border-[var(--border-strong)] bg-[color:var(--bg-elevated)]">
        <OptimisticSortOrder id={data?._id} path={'showcaseProjects'}>
          {showcaseProjects &&
            showcaseProjects.length > 0 &&
            showcaseProjects.map((project, index) => {
              const href = resolveHref(project?._type, project?.slug)
              if (!href) {
                return null
              }
              return (
                <Link
                  className="group grid gap-4 border-b border-[var(--border)] p-3 transition hover:bg-[color:var(--bg-strong)] md:p-5 xl:grid-cols-[15rem_minmax(0,1fr)_17rem]"
                  key={project._key}
                  href={href}
                  data-sanity={dataAttribute?.(['showcaseProjects', {_key: project._key}])}
                >
                  <div className="flex flex-col justify-between gap-8 border-b border-[var(--border)] pb-4 xl:border-b-0 xl:border-r xl:pb-0 xl:pr-6">
                    <div className="space-y-3">
                      <div
                        className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[color:var(--accent)]"
                        data-sanity={dataAttribute?.('showcaseProjectLabel')}
                      >
                        {String(index + 1).padStart(2, '0')} / {showcaseProjectLabel}
                      </div>
                      <div className="text-2xl font-semibold leading-tight md:text-3xl">
                        {project.title}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags?.map((tag, key) => (
                        <div
                          className="border border-[var(--border)] px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[color:var(--muted)]"
                          key={key}
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="order-first xl:order-none">
                    <ImageBox
                      image={project.coverImage}
                      alt={`Cover image from ${project.title}`}
                      classesWrapper="relative aspect-[16/9]"
                    />
                  </div>

                  <div className="flex items-start xl:pl-2">
                    {Array.isArray(project.overview) && (
                      <div className="w-full border-t border-[var(--border)] pt-4 font-serif text-lg leading-relaxed text-[color:var(--muted)] xl:border-t-0 xl:border-l xl:pl-6 xl:pt-0">
                        <CustomPortableText
                          id={project._id}
                          type={project._type}
                          path={['overview']}
                          value={project.overview}
                        />
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
        </OptimisticSortOrder>
      </div>
    </div>
  )
}
