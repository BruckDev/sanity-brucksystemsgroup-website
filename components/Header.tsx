import {CustomPortableText} from '@/components/CustomPortableText'
import type {PathSegment} from 'sanity'

interface HeaderProps {
  id: string | null
  type: string | null
  path: PathSegment[]
  eyebrow?: string | null
  eyebrowDataSanity?: string
  centered?: boolean
  description?: null | React.ComponentProps<typeof CustomPortableText>['value']
  title?: string | null
}
export function Header(props: HeaderProps) {
  const {id, type, path, title, description, centered = false, eyebrow, eyebrowDataSanity} = props
  if (!description && !title) {
    return null
  }
  return (
    <div
      className={`border-t border-[var(--border-strong)] pt-6 ${
        centered ? 'mx-auto max-w-5xl text-center' : 'max-w-4xl'
      }`}
    >
      {eyebrow && (
        <div
          className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-[color:var(--accent)]"
          data-sanity={eyebrowDataSanity}
        >
          {eyebrow}
        </div>
      )}
      {title && (
        <div className="max-w-5xl text-4xl font-semibold leading-[0.94] md:text-6xl lg:text-[4.75rem]">
          {title}
        </div>
      )}
      {Array.isArray(description) && (
        <div className="mt-6 text-balance font-serif text-xl leading-relaxed text-[color:var(--muted)] md:text-[1.65rem]">
          <CustomPortableText id={id} type={type} path={path} value={description} />
        </div>
      )}
    </div>
  )
}
