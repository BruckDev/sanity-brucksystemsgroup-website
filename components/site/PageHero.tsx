import {CustomPortableText} from '@/components/CustomPortableText'
import {ButtonLink} from '@/components/site/ButtonLink'

type PageHeroProps = {
  eyebrow?: string
  title: string
  description?: any[] | null
  primaryCta?: {label?: string; href?: string; style?: string} | null
  secondaryCta?: {label?: string; href?: string; style?: string} | null
  stats?: {value?: string | null; label?: string | null}[] | null
}

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  stats,
}: PageHeroProps) {
  return (
    <section className="grid gap-8 border-b border-[color:var(--border)] pb-14 pt-6 md:gap-12 md:pb-20 md:pt-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
      <div className="animate-rise">
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
        <div className="animate-fade border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-8">
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
