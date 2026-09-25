import { cn } from '@/lib/utils'

export type ButtonVariantRL = 'primary' | 'outline' | 'outlineInk' | 'dark'

const base =
  'group inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-[3px] text-[14px] font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rl-red'

const variants: Record<ButtonVariantRL, string> = {
  primary: 'bg-rl-red text-white hover:bg-[#d91f5b]',
  outline: 'border border-white/20 text-text-on-dark hover:border-white/50',
  outlineInk: 'border border-rl-dark/20 text-text-primary hover:border-rl-dark/60',
  dark: 'bg-rl-dark text-white hover:bg-black',
}

export function buttonClasses(variant: ButtonVariantRL = 'primary', className?: string): string {
  return cn(base, variants[variant], className)
}
