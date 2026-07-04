import {OptimisticSortOrder} from '@/components/OptimisticSortOrder'
import type {SettingsQueryResult} from '@/sanity.types'
import {studioUrl} from '@/sanity/lib/api'
import {resolveHref} from '@/sanity/lib/utils'
import {createDataAttribute, stegaClean} from 'next-sanity'
import Link from 'next/link'

interface NavbarProps {
  data: SettingsQueryResult
}
export function Navbar(props: NavbarProps) {
  const {data} = props
  const items = data?.menuItems ?? []
  const [homeItem, ...navItems] = items
  const brandEyebrow = data?.uiText?.brandEyebrow || 'Content Architecture'
  const fallbackSiteTitle = data?.uiText?.fallbackSiteTitle || 'Bruck Systems Group'
  const dataAttribute =
    data?._id && data?._type
      ? createDataAttribute({
          baseUrl: studioUrl,
          id: data._id,
          type: data._type,
        })
      : null
  const settingsAttribute = createDataAttribute({
    baseUrl: studioUrl,
    id: 'settings',
    type: 'settings',
  })
  return (
    <header
      className="sticky top-0 z-20 border-b border-[var(--border)] bg-[color:var(--bg-elevated)] px-4 py-4 shadow-sm backdrop-blur-xl md:px-8 lg:px-12"
      data-sanity={dataAttribute?.('menuItems')}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-1">
          <div
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]"
            data-sanity={(dataAttribute || settingsAttribute)(['uiText', 'brandEyebrow'])}
          >
            {brandEyebrow}
          </div>
          {homeItem && resolveHref(homeItem?._type, homeItem?.slug) ? (
            <Link
              className="max-w-xl text-xl font-bold leading-tight text-[color:var(--fg)] md:text-2xl"
              data-sanity={dataAttribute?.([
                'menuItems',
                {_key: homeItem._key as unknown as string},
              ])}
              href={resolveHref(homeItem?._type, homeItem?.slug) || '/'}
            >
              {stegaClean(homeItem.title)}
            </Link>
          ) : (
            <Link
              className="max-w-xl text-xl font-bold leading-tight text-[color:var(--fg)] md:text-2xl"
              data-sanity={(dataAttribute || settingsAttribute)(['uiText', 'fallbackSiteTitle'])}
              href="/"
            >
              {fallbackSiteTitle}
            </Link>
          )}
        </div>

        <OptimisticSortOrder id={data?._id} path="menuItems">
          <nav className="flex flex-wrap items-center gap-x-2 gap-y-2 lg:justify-end">
            {navItems.map((menuItem, index) => {
              const href = resolveHref(menuItem?._type, menuItem?.slug)
              if (!href) {
                return null
              }
              return (
                <Link
                  key={menuItem._key}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--muted)] shadow-sm hover:border-[var(--accent)] hover:text-[color:var(--accent)]"
                  data-sanity={dataAttribute?.([
                    'menuItems',
                    {_key: menuItem._key as unknown as string},
                  ])}
                  href={href}
                >
                  <span className="text-xs text-[color:var(--accent)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {stegaClean(menuItem.title)}
                </Link>
              )
            })}
          </nav>
        </OptimisticSortOrder>
      </div>
    </header>
  )
}
