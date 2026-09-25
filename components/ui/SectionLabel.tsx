import { cn } from '@/lib/utils'

interface SectionLabelProps {
  n: string
  children: React.ReactNode
  tone?: 'light' | 'dark'
  className?: string
}

/** Etiqueta editorial: número rojo — línea — texto. */
export default function SectionLabel({ n, children, tone = 'light', className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.15em]',
        tone === 'dark' ? 'text-text-on-dark/40' : 'text-text-tertiary',
        className
      )}
    >
      <span className="text-rl-red">{n}</span>
      <span aria-hidden="true" className="inline-block h-px w-[18px] bg-current opacity-60" />
      {children}
    </p>
  )
}
