import {CustomPortableText} from '@/components/CustomPortableText'
import {ButtonLink} from '@/components/site/ButtonLink'
import Image from 'next/image'

type PageHeroProps = {
  eyebrow?: string
  title: string
  description?: any[] | null
  primaryCta?: {label?: string; href?: string; style?: string} | null
  secondaryCta?: {label?: string; href?: string; style?: string} | null
  stats?: {value?: string | null; label?: string | null}[] | null
  backgroundImageAlt?: string
  backgroundImageSrc?: string | null
}

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  stats,
  backgroundImageAlt = '',
  backgroundImageSrc,
}: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden border-b border-[color:var(--border)] pb-14 pt-6 md:pb-20 md:pt-10 ${
        backgroundImageSrc
          ? 'grid gap-10 md:gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)]'
          : 'grid gap-8 md:gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]'
      }`}
    >
      {backgroundImageSrc ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-24 overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--charcoal)]/92 shadow-[0_30px_80px_rgba(2,16,34,0.18)] md:top-28 lg:left-[36%] lg:right-0">
          <Image
            alt={backgroundImageAlt}
            className="absolute inset-0 h-full w-full object-cover object-left-center opacity-90"
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            src={backgroundImageSrc}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,12,28,0.82)_0%,rgba(3,12,28,0.48)_40%,rgba(3,12,28,0.2)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(35,228,255,0.2),transparent_28%)]" />
        </div>
      ) : null}

      <div className="animate-rise relative z-10">
        {eyebrow ? (
          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">
            {eyebrow}
          </div>
        ) : null}
        <h1 className="max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.04em] text-[color:var(--fg)] md:text-7xl">
          {title}
        </h1>
        {Array.isArray(description) ? (
          <div className="mt-7 max-w-3xl">
            <CustomPortableText id={null} type={null} path={[]} value={description} />
          </div>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink {...primaryCta} />
          <ButtonLink {...secondaryCta} />
        </div>
      </div>

      {stats?.length ? (
        <div className="animate-fade relative z-10 border border-[color:var(--border)] bg-[color:var(--surface)]/96 p-6 backdrop-blur-sm md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
            Key focus areas
          </div>
          <div className="mt-6 grid gap-6">
            {stats.map((stat) => (
              <div key={`${stat.value}-${stat.label}`} className="border-t border-[color:var(--border)] pt-5 first:border-t-0 first:pt-0">
                <div className="text-2xl font-semibold text-[color:var(--fg)] md:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}
