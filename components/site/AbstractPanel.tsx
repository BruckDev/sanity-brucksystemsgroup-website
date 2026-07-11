type AbstractPanelProps = {
  title?: string
  subtitle?: string
  className?: string
}

export function AbstractPanel({title, subtitle, className = ''}: AbstractPanelProps) {
  return (
    <div
      className={`editorial-panel relative min-h-[320px] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 md:min-h-[420px] md:p-12 ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-y-0 right-[16%] w-px bg-[color:var(--border)]" />
      <div className="absolute left-[10%] top-[12%] h-28 w-28 border border-[color:var(--border-strong)]" />
      <div className="absolute bottom-[16%] left-[18%] h-32 w-32 rounded-full border border-[color:var(--accent)]/45" />
      <div className="absolute right-[10%] top-[14%] h-40 w-40 bg-[linear-gradient(135deg,rgba(17,17,17,0.9),rgba(17,17,17,0.15))]" />
      <div className="absolute bottom-[14%] right-[22%] h-px w-36 bg-[color:var(--accent)]" />
      <div className="absolute left-[12%] top-[20%] max-w-[14rem]">
        {subtitle ? (
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">
            {subtitle}
          </div>
        ) : null}
        {title ? (
          <div className="mt-4 text-2xl font-semibold leading-tight text-[color:var(--fg)] md:text-3xl">
            {title}
          </div>
        ) : null}
      </div>
    </div>
  )
}
