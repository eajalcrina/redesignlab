import { cn } from '@/lib/utils'

interface TagProps {
  children: React.ReactNode
  color?: 'red' | 'dark' | 'neutral'
  className?: string
}

const colorStyles = {
  red: 'text-rl-red',
  dark: 'text-text-primary',
  neutral: 'text-text-on-dark',
}

export default function Tag({ children, color = 'red', className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-block uppercase text-label-sm font-mono font-normal tracking-[0.18em]',
        colorStyles[color],
        className
      )}
    >
      {children}
    </span>
  )
}
