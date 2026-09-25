import { cn } from '@/lib/utils'

/** ↗ que sale por una esquina y entra por la otra al pasar el mouse. Requiere un ancestro con `group`. */
export default function ArrowIcon({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn('arrow-swap', className)}>
      <i>↗</i>
      <i>↗</i>
    </span>
  )
}
