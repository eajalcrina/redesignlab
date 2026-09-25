'use client'

import { usePathname } from 'next/navigation'
import { SITE_CONFIG } from '@/lib/constants'
import { track } from '@/lib/analytics'
import ArrowIcon from './ArrowIcon'
import { buttonClasses, type ButtonVariantRL } from './buttonStyles'

interface CalendarButtonProps {
  children: React.ReactNode
  /** Identificador del botón para GTM, p. ej. "home_hero_escalemos" */
  location: string
  /** Contexto opcional (nombre del venture o proyecto) */
  context?: string
  variant?: ButtonVariantRL
  className?: string
}

export default function CalendarButton({ children, location, context, variant = 'primary', className }: CalendarButtonProps) {
  const pathname = usePathname()
  return (
    <a
      href={SITE_CONFIG.calendarUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('cta_calendar', { page: pathname, location, context })}
      className={buttonClasses(variant, className)}
    >
      {children}
      <ArrowIcon />
    </a>
  )
}
