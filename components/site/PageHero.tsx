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
  const hasBackgroundImage = Boolean(backgroundImageSrc)
  const heroBackgroundSrc = backgroundImageSrc || ''

  return (
    <section
      className={`relative overflow-hidden border-b pb-14 pt-6 md:pb-20 md:pt-10 ${
        hasBackgroundImage
          ? 'grid min-h-[32rem] gap-10 border-white/10 px-6 py-8 md:min-h-[38rem] md:gap-12 md:px-8 md:py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] lg:px-12 lg:py-16'
          : 'grid gap-8 md:gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]'
      }`}
    >
      {hasBackgroundImage ? (
        <div className="pointer-events-none absolute inset-0 bg-[color:var(--charcoal)]">
          <Image
            alt={backgroundImageAlt}
            className="absolute inset-0 h-full w-full object-cover object-center opacity-100"
            fill
            priority
            sizes="100vw"
            src={heroBackgroundSrc}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,11,28,0.88)_0%,rgba(1,11,28,0.66)_40%,rgba(1,11,28,0.52)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,11,28,0.2)_0%,rgba(1,11,28,0.3)_55%,rgba(1,11,28,0.45)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(58,227,255,0.16),transparent_24%)]" />
        </div>
      ) : null}

      <div className="animate-rise relative z-10">
        {eyebrow ? (
          <div
            className={`mb-5 text-xs font-semibold uppercase tracking-[0.22em] ${
              hasBackgroundImage ? 'text-white/70' : 'text-[color:var(--accent)]'
            }`}
          >
            {eyebrow}
          </div>
        ) : null}
        <h1
          className={`max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.04em] md:text-7xl ${
            hasBackgroundImage ? 'text-white' : 'text-[color:var(--fg)]'
          }`}
        >
          {title}
        </h1>
        {Array.isArray(description) ? (
          <div className="mt-7 max-w-3xl">
            <CustomPortableText
              id={null}
              type={null}
              path={[]}
              paragraphClasses={hasBackgroundImage ? 'text-lg leading-8 text-white/80' : undefined}
              value={description}
            />
          </div>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink {...primaryCta} />
          <ButtonLink {...secondaryCta} />
        </div>
      </div>

      {stats?.length ? (
        <div
          className={`animate-fade relative z-10 p-6 backdrop-blur-sm md:p-8 ${
            hasBackgroundImage
              ? 'self-end border border-white/12 bg-[rgba(4,20,39,0.58)] text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]'
              : 'border border-[color:var(--border)] bg-[color:var(--surface)]/96'
          }`}
        >
          <div
            className={`text-xs font-semibold uppercase tracking-[0.22em] ${
              hasBackgroundImage ? 'text-white/70' : 'text-[color:var(--muted)]'
            }`}
          >
            Key focus areas
          </div>
          <div className="mt-6 grid gap-6">
            {stats.map((stat) => (
              <div
                key={`${stat.value}-${stat.label}`}
                className={`pt-5 first:border-t-0 first:pt-0 ${
                  hasBackgroundImage
                    ? 'border-t border-white/12'
                    : 'border-t border-[color:var(--border)]'
                }`}
              >
                <div
                  className={`text-2xl font-semibold md:text-3xl ${hasBackgroundImage ? 'text-white' : 'text-[color:var(--fg)]'}`}
                >
                  {stat.value}
                </div>
                <div
                  className={`mt-2 text-sm leading-6 ${
                    hasBackgroundImage ? 'text-white/75' : 'text-[color:var(--muted)]'
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}
