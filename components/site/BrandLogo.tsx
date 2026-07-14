import Image from 'next/image'

export function BrandLogo({
  className = '',
  priority = false,
  size = 'header',
}: {
  className?: string
  priority?: boolean
  size?: 'header' | 'footer'
}) {
  const sizes = size === 'footer' ? '(min-width: 1024px) 22rem, 18rem' : '(min-width: 1024px) 18rem, 12rem'

  return (
    <Image
      alt="Bruck Systems Group"
      className={className}
      height={984}
      priority={priority}
      sizes={sizes}
      src="/brand/bruck-systems-group-logo.png"
      width={1598}
    />
  )
}
