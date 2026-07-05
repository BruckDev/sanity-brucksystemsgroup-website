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
      className={`${
        centered ? 'mx-auto max-w-5xl pb-2 pt-3 text-center md:pb-4 md:pt-6' : 'max-w-4xl pt-4'
      }`}
    >
      {eyebrow && (
        <div
          className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--accent)]"
          data-sanity={eyebrowDataSanity}
        >
          {eyebrow}
        </div>
      )}
      {title && (
        <div className="mx-auto max-w-5xl text-4xl font-extrabold leading-tight text-[color:var(--fg)] md:text-6xl lg:text-7xl">
          {title}
        </div>
      )}
      {Array.isArray(description) && (
        <div className="mx-auto mt-6 max-w-3xl text-balance text-lg leading-8 text-[color:var(--muted)] md:text-xl">
          <CustomPortableText id={id} type={type} path={path} value={description} />
        </div>
      )}
    </div>
  )
}
