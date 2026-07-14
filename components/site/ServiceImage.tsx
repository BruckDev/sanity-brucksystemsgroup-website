import ImageBox from '@/components/ImageBox'
import type {SanityImageSource} from '@sanity/image-url'
import Image from 'next/image'

const serviceImageFallbacks = {
  'custom-software-solutions': {
    alt: 'A hand using a secure mobile login screen on a smartphone.',
    src: '/images/services/custom-software-solutions.png',
  },
  'data-analytics-and-automation': {
    alt: 'Analytics charts and reporting visuals displayed above a laptop.',
    src: '/images/services/data-analytics-and-automation.png',
  },
  'digital-transformation': {
    alt: 'A calculator and pen over business reporting documents.',
    src: '/images/services/digital-transformation.png',
  },
} as const

export function ServiceImage({
  slug,
  image,
  alt,
  className = 'relative aspect-[4/3]',
  sizes = '(min-width: 1024px) 40vw, 100vw',
}: {
  slug?: string | null
  image?: (SanityImageSource & {alt?: string}) | null
  alt?: string | null
  className?: string
  sizes?: string
}) {
  if (image) {
    return <ImageBox image={image} alt={alt || image.alt || 'Service image'} classesWrapper={className} size={sizes} />
  }

  const fallback = slug ? serviceImageFallbacks[slug as keyof typeof serviceImageFallbacks] : null

  if (!fallback) {
    return null
  }

  return (
    <div className={`w-full overflow-hidden rounded-lg border border-[var(--border)] bg-[color:var(--bg-strong)] shadow-sm ${className}`}>
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
