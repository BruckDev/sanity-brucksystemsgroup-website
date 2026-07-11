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
      'border border-[color:var(--charcoal)] bg-[color:var(--charcoal)] text-white hover:-translate-y-0.5 hover:bg-black focus-visible:outline-[color:var(--accent)]',
    secondary:
      'border border-[color:var(--border-strong)] bg-white text-[color:var(--fg)] hover:-translate-y-0.5 hover:border-[color:var(--accent)] hover:text-[color:var(--fg)] focus-visible:outline-[color:var(--accent)]',
    text: 'border-none bg-transparent px-0 text-[color:var(--fg)] underline decoration-[color:var(--accent)] underline-offset-4 hover:text-[color:var(--accent)]',
  } as const

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-none px-5 py-3 text-sm font-semibold tracking-[0.02em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${styles[style as keyof typeof styles] || styles.primary} ${className}`}
    >
      {label}
    </Link>
  )
}
