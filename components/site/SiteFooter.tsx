import {CustomPortableText} from '@/components/CustomPortableText'
import {BrandLogo} from '@/components/site/BrandLogo'
import {ButtonLink} from '@/components/site/ButtonLink'
import Link from 'next/link'

type SiteFooterProps = {
  siteTitle?: string | null
  contactMethods?: {label?: string | null; value?: string | null; href?: string | null}[] | null
  footerColumns?:
    | {title?: string | null; links?: {label?: string | null; href?: string | null}[] | null; body?: any[] | null}[]
    | null
  footerNote?: any[] | null
  linkedin?: string | null
}

export function SiteFooter({
  siteTitle = 'Bruck Systems Group',
  contactMethods = [],
  footerColumns = [],
  footerNote = [],
  linkedin,
}: SiteFooterProps) {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:px-12">
        <div>
          <BrandLogo className="h-auto w-[15rem] md:w-[18rem]" size="footer" />
          <div className="sr-only">{siteTitle}</div>
          <div className="mt-5 space-y-3 text-sm leading-7 text-white/70">
            {(contactMethods || []).map((item) => (
              <div key={`${item.label}-${item.value}`}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">
                  {item.label}
                </div>
                {item.href ? (
                  <Link href={item.href} className="mt-1 inline-block hover:text-white">
                    {item.value}
                  </Link>
                ) : (
                  <div className="mt-1">{item.value}</div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6">
            {linkedin ? (
              <ButtonLink href={linkedin} label="LinkedIn" style="secondary" />
            ) : (
              <div className="text-sm text-white/70">LinkedIn profile placeholder</div>
            )}
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {(footerColumns || []).map((column) => (
            <div key={column.title}>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
                {column.title}
              </div>
              {column.links?.length ? (
                <div className="mt-5 grid gap-3 text-sm text-white/70">
                  {column.links.map((link) => (
                    <Link key={`${link.label}-${link.href}`} href={link.href || '/'} className="hover:text-white">
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : null}
              {Array.isArray(column.body) ? (
                <div className="mt-5 space-y-3">
                  <CustomPortableText id={null} type={null} path={[]} paragraphClasses="text-sm leading-7 text-white/70" value={column.body} />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-sm text-white/70 md:flex-row md:items-center md:justify-between md:px-8 lg:px-12">
          <div className="max-w-3xl">
            <CustomPortableText id={null} type={null} path={[]} paragraphClasses="text-sm leading-7 text-white/70" value={footerNote || []} />
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/accessibility" className="hover:text-white">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
