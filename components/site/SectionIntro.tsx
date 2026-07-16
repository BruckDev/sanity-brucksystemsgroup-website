type SectionIntroProps = {
  eyebrow?: string
  title: string
  description?: React.ReactNode
  align?: 'left' | 'center'
}

export function SectionIntro({eyebrow, title, description, align = 'left'}: SectionIntroProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? (
        <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--accent)]">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-3xl font-semibold leading-[1.04] tracking-[-0.035em] text-[color:var(--fg)] md:text-5xl">
        {title}
      </h2>
      {description ? (
        <div className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--muted)] md:text-lg">
          {description}
        </div>
      ) : null}
    </div>
  )
}
