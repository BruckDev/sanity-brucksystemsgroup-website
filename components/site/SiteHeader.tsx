'use client'

import {BrandLogo} from '@/components/site/BrandLogo'
import {ButtonLink} from '@/components/site/ButtonLink'
import Link from 'next/link'
import {useEffect, useState} from 'react'

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
  const [backgroundOpacity, setBackgroundOpacity] = useState(1)

  useEffect(() => {
    const updateBackgroundOpacity = () => {
      const scrollProgress = Math.min(window.scrollY / 280, 1)
      setBackgroundOpacity(1 - scrollProgress * 0.38)
    }

    updateBackgroundOpacity()
    window.addEventListener('scroll', updateBackgroundOpacity, {passive: true})

    return () => window.removeEventListener('scroll', updateBackgroundOpacity)
  }, [])

  return (
    <header
      className="sticky top-0 z-40 border-b border-white/10 text-white transition-[background-color] duration-200"
      style={{backgroundColor: `rgb(0 0 0 / ${backgroundOpacity})`}}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-8 lg:px-12">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
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
                    className="inline-flex items-center py-2 text-base font-semibold text-white hover:text-white/80"
                  >
                    {item.label}
                  </Link>
                  {item.children?.length ? (
                    <div className="pointer-events-none absolute left-0 top-full hidden min-w-[20rem] translate-y-4 border border-white/10 bg-black p-5 opacity-0 shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition group-hover:pointer-events-auto group-hover:block group-hover:translate-y-2 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:block group-focus-within:translate-y-2 group-focus-within:opacity-100 xl:min-w-[24rem]">
                      <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">
                        {item.label}
                      </div>
                      <div className="grid gap-3">
                        {item.children.map((child) => (
                          <Link
                            key={`${child.label}-${child.href}`}
                            href={child.href || '/'}
                            className="border-b border-white/12 pb-3 text-base font-medium text-white last:border-b-0 last:pb-0 hover:text-white/80"
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
          <ButtonLink href="/contact" label="Contact Us" style="primary" className="border-white bg-white px-4 py-2.5 !text-base !text-black hover:bg-white/90" />
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-white/25 bg-black text-white lg:hidden"
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
        <div className="border-t border-white/10 bg-black px-4 py-5 lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-5" aria-label="Mobile navigation">
            {(navigation || []).map((item) => (
              <div
                key={`${item.label}-${item.href}`}
                className="border-b border-white/10 pb-4 last:border-b-0"
              >
                <Link
                  href={item.href || '/'}
                  className="text-lg font-semibold text-white"
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
                        className="text-base text-white"
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
