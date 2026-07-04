import ImageBox from '@/components/ImageBox'
import {TimelineSection} from '@/components/TimelineSection'
import type {PathSegment} from '@sanity/client/csm'
import {
  PortableText,
  type InferStrictComponents,
  type InferValue,
  type SanityQueries,
} from 'next-sanity'
import Link from 'next/link'

export function CustomPortableText({
  id,
  type,
  path,
  paragraphClasses,
  value,
}: {
  id: string | null
  type: string | null
  path: PathSegment[]
  paragraphClasses?: string
  value: InferValue<SanityQueries[keyof SanityQueries]>
}) {
  const components = {
    block: {
      normal: ({children}) => {
        return <p className={paragraphClasses}>{children}</p>
      },
    },
    marks: {
      link: ({children, value}) => {
        if (!value?.href) return children

        return (
          <Link
            className="underline decoration-[color:var(--accent)] underline-offset-4 transition hover:text-[color:var(--accent)]"
            href={value.href}
            rel="noreferrer noopener"
          >
            {children}
          </Link>
        )
      },
    },
    types: {
      image: ({value}) => {
        return (
          <div className="my-6 space-y-2">
            <ImageBox image={value} alt={value.alt} classesWrapper="relative aspect-[16/9]" />
            {value?.caption && (
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                {value.caption}
              </div>
            )}
          </div>
        )
      },
      timeline: ({value}) => {
        const {items, _key} = value
        return (
          <TimelineSection
            key={_key}
            id={id}
            type={type}
            path={[...path, {_key}, 'items']}
            timelines={items}
          />
        )
      },
    },
  } satisfies InferStrictComponents<typeof value>

  return <PortableText components={components} value={value} />
}
