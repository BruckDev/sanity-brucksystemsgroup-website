'use client'

import {BrandLogo} from '@/components/site/BrandLogo'
import {ButtonLink} from '@/components/site/ButtonLink'
import Link from 'next/link'
import {useState} from 'react'

type LinkItem = {
  label?: string | null
  href?: string | null
  description?: string | null
  children?: {label?: string | null; href?: string | null}[] | null
}

type SiteHeaderProps = {
  brandEyebrow?: string | null
  siteTitle?: string | null
  navigation?: LinkItem[] | null
}

export function SiteHeader({
  brandEyebrow = 'Consulting and technology',
  siteTitle = 'Bruck Systems Group',
  navigation = [],
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--bg-elevated)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-8 lg:px-12">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
            {brandEyebrow}
          </div>
          <div className="mt-2">
            <BrandLogo className="h-auto w-36 md:w-40" priority />
            <span className="sr-only">{siteTitle}</span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <nav className="flex items-center gap-6" aria-label="Main navigation">
            {(navigation || []).map((item) => {
              return (
                <div key={`${item.label}-${item.href}`} className="group relative">
                  <Link
                    href={item.href || '/'}
                    className="inline-flex items-center py-2 text-sm font-semibold text-[color:var(--muted)] hover:text-[color:var(--fg)]"
                  >
                    {item.label}
                  </Link>
                  {item.children?.length ? (
                    <div className="pointer-events-none absolute left-0 top-full hidden min-w-[20rem] translate-y-4 border border-[color:var(--border)] bg-white p-5 opacity-0 shadow-[0_18px_50px_rgba(0,0,0,0.08)] transition group-hover:pointer-events-auto group-hover:block group-hover:translate-y-2 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:block group-focus-within:translate-y-2 group-focus-within:opacity-100 xl:min-w-[24rem]">
                      <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">
                        {item.label}
                      </div>
                      <div className="grid gap-3">
                        {item.children.map((child) => (
                          <Link
                            key={`${child.label}-${child.href}`}
                            href={child.href || '/'}
                            className="border-b border-[color:var(--border)] pb-3 text-sm font-medium text-[color:var(--muted)] last:border-b-0 last:pb-0 hover:text-[color:var(--fg)]"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </nav>
          <ButtonLink href="/contact" label="Contact Us" style="primary" className="px-4 py-2.5" />
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-[color:var(--border)] bg-white text-[color:var(--fg)] lg:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
        >
          <div className="space-y-1.5">
            <div
              className={`h-px w-5 bg-current transition ${open ? 'translate-y-[7px] rotate-45' : ''}`}
            />
            <div
              className={`h-px w-5 bg-current transition ${open ? 'opacity-0' : 'opacity-100'}`}
            />
            <div
              className={`h-px w-5 bg-current transition ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
            />
          </div>
        </button>
      </div>

      {open ? (
        <div className="border-t border-[color:var(--border)] bg-white px-4 py-5 lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-5" aria-label="Mobile navigation">
            {(navigation || []).map((item) => (
              <div
                key={`${item.label}-${item.href}`}
                className="border-b border-[color:var(--border)] pb-4 last:border-b-0"
              >
                <Link
                  href={item.href || '/'}
                  className="text-base font-semibold text-[color:var(--fg)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children?.length ? (
                  <div className="mt-3 grid gap-2">
                    {item.children.map((child) => (
                      <Link
                        key={`${child.label}-${child.href}`}
                        href={child.href || '/'}
                        className="text-sm text-[color:var(--muted)]"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <ButtonLink href="/contact" label="Contact Us" style="primary" className="w-full" />
          </nav>
        </div>
      ) : null}
    </header>
  )
}
