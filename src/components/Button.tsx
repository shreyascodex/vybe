import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  children: ReactNode
}

const styles: Record<Variant, string> = {
  primary:
    'bg-ink text-paper hover:bg-volt hover:text-ink hover:-translate-y-0.5 hover:shadow-[0_10px_0_-4px_rgba(18,18,18,0.9)]',
  secondary:
    'border border-ink/25 text-ink hover:border-ink hover:bg-ink/5 hover:-translate-y-0.5',
}

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <a
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}
