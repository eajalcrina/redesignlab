'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { track } from '@/lib/analytics'

interface FillPanelProps {
  href: string
  kicker: string
  title: string
  cta: string
  tone: 'light' | 'graphite' | 'ink'
  external?: boolean
  /** Si se define, el clic envía cta_calendar con esta ubicación */
  trackLocation?: string
  titleClassName?: string
  className?: string
  children: React.ReactNode
}

const tones = {
  light: 'bg-white text-text-primary shadow-[0_0_0_1px_rgba(13,13,13,.1)]',
  graphite: 'bg-rl-graphite text-text-on-dark',
  ink: 'bg-[#1E1E1E] text-text-on-dark shadow-[0_0_0_1px_rgba(250,250,248,.1)]',
}

export default function FillPanel({ href, kicker, title, cta, tone, external, trackLocation, titleClassName, className, children }: FillPanelProps) {
  const pathname = usePathname()
  const classes = cn(
    'fill-panel group relative isolate flex flex-col gap-3.5 overflow-hidden rounded-[4px] p-8 transition-colors duration-[400ms] hover:text-white md:px-9 md:pb-[30px] md:pt-[34px]',
    tones[tone],
    className
  )
  const body = (
    <>
      <span className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-rl-red transition-colors duration-[400ms] group-hover:text-white">
        {kicker}
      </span>
      <h3 className={cn('font-sans text-[40px] font-normal leading-[.95] tracking-[-0.045em] md:text-[54px]', titleClassName)}>{title}</h3>
      <p className="max-w-[420px] text-[16px] leading-[1.55] opacity-75 md:text-[17px]">{children}</p>
      <span className="mt-2.5 flex items-center justify-between text-[14px] font-medium">
        {cta}
        <span className="fill-panel__circ" aria-hidden="true">→</span>
      </span>
    </>
  )
  const onClick = trackLocation ? () => track('cta_calendar', { page: pathname, location: trackLocation }) : undefined
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={classes}>
        {body}
      </a>
    )
  }
  return (
    <Link href={href} onClick={onClick} className={classes}>
      {body}
    </Link>
  )
}
