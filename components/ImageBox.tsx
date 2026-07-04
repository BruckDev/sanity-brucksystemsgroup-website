import {urlForImage} from '@/sanity/lib/utils'
import type {SanityImageSource} from '@sanity/image-url'
import Image from 'next/image'

interface ImageBoxProps {
  'image'?: SanityImageSource | null | undefined
  'alt'?: string
  'width'?: number
  'height'?: number
  'size'?: string
  'classesWrapper'?: string
  'data-sanity'?: string
}

export default function ImageBox({
  image,
  alt = 'Cover image',
  width = 3500,
  height = 2000,
  size = '100vw',
  classesWrapper,
  ...props
}: ImageBoxProps) {
  const imageUrl = image && urlForImage(image)?.height(height).width(width).fit('crop').url()

  return (
    <div
      className={`w-full overflow-hidden rounded-lg border border-[var(--border)] bg-[color:var(--bg-strong)] shadow-sm ${classesWrapper}`}
      data-sanity={props['data-sanity']}
    >
      {imageUrl && (
        <Image
          className="absolute h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.015]"
          alt={alt}
          width={width}
          height={height}
          sizes={size}
          src={imageUrl}
        />
      )}
    </div>
  )
}
