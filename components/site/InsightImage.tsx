import ImageBox from '@/components/ImageBox'
import type {SanityImageSource} from '@sanity/image-url'
import Image from 'next/image'

const insightImageFallbacks = {
  'designing-modernization-roadmaps': {
    alt: 'Digital modernization dashboard with connected cloud, analytics, and global technology icons.',
    src: '/images/insights/digital-modernization-roadmap.png',
  },
  'workflow-automation-value-first': {
    alt: 'Workflow automation diagram with connected process steps and performance dashboards.',
    src: '/images/insights/workflow-automation-value-first.png',
  },
} as const

export function InsightImage({
  slug,
  image,
  alt,
  className = 'relative aspect-[16/9]',
  sizes = '(min-width: 1024px) 45vw, 100vw',
}: {
  slug?: string | null
  image?: (SanityImageSource & {alt?: string}) | null
  alt?: string | null
  className?: string
  sizes?: string
}) {
  if (image) {
    return (
      <ImageBox
        image={image}
        alt={alt || image.alt || 'Insight image'}
        classesWrapper={className}
        size={sizes}
      />
    )
  }

  const fallback = slug ? insightImageFallbacks[slug as keyof typeof insightImageFallbacks] : null

  if (!fallback) {
    return null
  }

  return (
    <div
      className={`w-full overflow-hidden rounded-lg border border-[var(--border)] bg-[color:var(--bg-strong)] shadow-sm ${className}`}
    >
      <Image
        alt={fallback.alt}
        className="absolute h-full w-full object-cover"
        fill
        sizes={sizes}
        src={fallback.src}
      />
    </div>
  )
}
