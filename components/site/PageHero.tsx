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
  statsHeading?: string | null
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
  statsHeading = 'Key focus areas',
  backgroundImageAlt = '',
  backgroundImageSrc,
}: PageHeroProps) {
  const hasBackgroundImage = Boolean(backgroundImageSrc)
  const heroBackgroundSrc = backgroundImageSrc || ''

  return (
    <section
      className={`relative overflow-hidden border pb-14 pt-6 shadow-[0_28px_70px_rgba(7,26,43,0.16)] md:pb-20 md:pt-10 ${
        hasBackgroundImage
          ? 'grid min-h-[34rem] gap-10 rounded-[1.5rem] border-white/10 px-6 py-10 md:min-h-[40rem] md:gap-12 md:px-10 md:py-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] lg:px-14 lg:py-20'
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
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,18,38,0.94)_0%,rgba(1,18,38,0.78)_43%,rgba(1,18,38,0.42)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,18,38,0.05)_0%,rgba(1,18,38,0.54)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(8,123,75,0.32),transparent_28%)]" />
        </div>
      ) : null}

      <div className="animate-rise relative z-10">
        {eyebrow ? (
          <div
            className={`mb-5 text-xs font-bold uppercase tracking-[0.18em] ${
              hasBackgroundImage ? 'text-[#8de1b1]' : 'text-[color:var(--accent)]'
            }`}
          >
            {eyebrow}
          </div>
        ) : null}
        <h1
          className={`max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.055em] md:text-7xl xl:text-8xl ${
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
              paragraphClasses={
                hasBackgroundImage ? 'text-lg leading-8 text-white/80 md:text-xl' : undefined
              }
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
          className={`animate-fade surface-card relative z-10 self-end rounded-2xl p-6 backdrop-blur-md md:p-8 ${
            hasBackgroundImage
              ? 'border border-white/15 bg-[rgba(4,25,48,0.72)] text-white shadow-[0_20px_60px_rgba(0,0,0,0.24)]'
              : 'border border-[color:var(--border)] bg-[color:var(--surface)]/96'
          }`}
        >
          <div
            className={`text-xs font-bold uppercase tracking-[0.18em] ${
              hasBackgroundImage ? 'text-[#bcd2df]' : 'text-[color:var(--muted)]'
            }`}
          >
            {statsHeading}
          </div>
          <div className="mt-6 grid gap-6">
            {stats.map((stat) => (
              <div
                key={`${stat.value}-${stat.label}`}
                className={`pt-5 first:border-t-0 first:pt-0 ${
                  hasBackgroundImage
                    ? 'border-t border-white/15'
                    : 'border-t border-[color:var(--border)]'
                }`}
              >
                <div
                  className={`text-2xl font-semibold tracking-[-0.03em] md:text-3xl ${hasBackgroundImage ? 'text-white' : 'text-[color:var(--fg)]'}`}
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
