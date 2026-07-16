type SectionIntroProps = {
  eyebrow?: string
  title: string
  description?: React.ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
}: SectionIntroProps) {
  const isDark = tone === 'dark'

  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? (
        <div
          className={`mb-4 text-xs font-bold uppercase tracking-[0.18em] ${
            isDark ? 'text-[#8de1b1]' : 'text-[color:var(--accent)]'
          }`}
        >
          {eyebrow}
        </div>
      ) : null}
      <h2
        className={`text-3xl font-semibold leading-[1.04] tracking-[-0.035em] md:text-5xl ${
          isDark ? 'text-white' : 'text-[color:var(--fg)]'
        }`}
      >
        {title}
      </h2>
      {description ? (
        <div
          className={`mt-5 max-w-2xl text-base leading-8 md:text-lg ${
            isDark ? 'text-white/76' : 'text-[color:var(--muted)]'
          }`}
        >
          {description}
        </div>
      ) : null}
    </div>
  )
}
