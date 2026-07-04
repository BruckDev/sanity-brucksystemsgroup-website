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
  const dataAttribute =
    data?._id && data?._type
      ? createDataAttribute({
          baseUrl: studioUrl,
          id: data._id,
          type: data._type,
        })
      : null
  return (
    <header
      className="sticky top-0 z-20 border-b border-[var(--border)] bg-[color:var(--bg-elevated)] px-4 py-4 backdrop-blur-xl md:px-10 lg:px-14"
      data-sanity={dataAttribute?.('menuItems')}
    >
      <div className="mx-auto flex w-full max-w-[112rem] flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-2">
          <div className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[color:var(--muted)]">
            Content Architecture
          </div>
          {homeItem && resolveHref(homeItem?._type, homeItem?.slug) ? (
            <Link
              className="max-w-xl text-2xl font-semibold leading-none text-[color:var(--fg)] md:text-[2rem]"
              data-sanity={dataAttribute?.([
                'menuItems',
                {_key: homeItem._key as unknown as string},
              ])}
              href={resolveHref(homeItem?._type, homeItem?.slug) || '/'}
            >
              {stegaClean(homeItem.title)}
            </Link>
          ) : (
            <Link className="max-w-xl text-2xl font-semibold leading-none text-[color:var(--fg)] md:text-[2rem]" href="/">
              Bruck Systems Group
            </Link>
          )}
        </div>

        <OptimisticSortOrder id={data?._id} path="menuItems">
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 lg:justify-end">
            {navItems.map((menuItem, index) => {
              const href = resolveHref(menuItem?._type, menuItem?.slug)
              if (!href) {
                return null
              }
              return (
                <Link
                  key={menuItem._key}
                  className="inline-flex items-center gap-2 border border-[var(--border)] bg-[color:var(--bg-strong)] px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[color:var(--muted)] hover:border-[var(--border-strong)] hover:text-[color:var(--fg)]"
                  data-sanity={dataAttribute?.([
                    'menuItems',
                    {_key: menuItem._key as unknown as string},
                  ])}
                  href={href}
                >
                  <span className="text-[0.62rem] text-[color:var(--accent)]">
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
