import Link from 'next/link'

type ButtonLinkProps = {
  href?: string | null
  label?: string | null
  style?: 'primary' | 'secondary' | 'text' | string | null
  className?: string
}

export function ButtonLink({href, label, style = 'primary', className = ''}: ButtonLinkProps) {
  if (!href || !label) {
    return null
  }

  const styles = {
    primary:
      'border border-[color:var(--charcoal)] bg-[color:var(--charcoal)] text-white shadow-[0_10px_24px_rgba(7,26,43,0.18)] hover:-translate-y-0.5 hover:bg-[#102b43] hover:shadow-[0_14px_30px_rgba(7,26,43,0.25)] focus-visible:outline-[color:var(--accent)]',
    secondary:
      'border border-[color:var(--border-strong)] bg-white text-[color:var(--fg)] shadow-[0_8px_18px_rgba(7,26,43,0.05)] hover:-translate-y-0.5 hover:border-[color:var(--accent)] hover:text-[color:var(--fg)] focus-visible:outline-[color:var(--accent)]',
    text: 'border-none bg-transparent px-0 text-[color:var(--fg)] underline decoration-[color:var(--accent)] underline-offset-4 hover:text-[color:var(--accent)]',
  } as const

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold tracking-[0.01em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${styles[style as keyof typeof styles] || styles.primary} ${className}`}
    >
      {label}
    </Link>
  )
}
