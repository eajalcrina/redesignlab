'use client'

import { useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DURATION, EASE } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface CollapsibleSectionProps {
  /** Stable id for deep linking via URL hash and sessionStorage persistence */
  id: string
  /** Eyebrow/tag text shown above the heading */
  tag: string
  /** Section heading (h2) — always visible */
  heading: string
  /** One-line teaser shown when collapsed and as subtle context when open */
  preview: string
  /** Visual tone of the section background */
  tone?: 'dark' | 'neutral'
  /** Open state on first render */
  defaultOpen?: boolean
  children: ReactNode
}

export default function CollapsibleSection({
  id,
  tag,
  heading,
  preview,
  tone = 'neutral',
  defaultOpen = false,
  children,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  // Honor URL hash + sessionStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    const stored = sessionStorage.getItem(`ri-section-${id}`)
    if (stored === 'open') setOpen(true)
    else if (stored === 'closed') setOpen(false)

    const handleHash = () => {
      if (window.location.hash === `#${id}`) {
        setOpen(true)
        // Defer scroll until after expand animation begins
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 150)
      }
    }

    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [id])

  const toggle = () => {
    const next = !open
    setOpen(next)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`ri-section-${id}`, next ? 'open' : 'closed')
    }
  }

  const isDark = tone === 'dark'

  return (
    <section
      id={id}
      className={cn(
        isDark ? 'section-dark' : 'section-neutral',
        'border-t',
        isDark ? 'border-border-dark' : 'border-border-light'
      )}
    >
      <div className="container-rl">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          className="w-full text-left py-10 md:py-16 group cursor-pointer"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <p
              className={cn(
                'font-mono text-mono-sm uppercase tracking-[0.18em] transition-colors flex-1',
                open
                  ? 'text-rl-red'
                  : isDark
                  ? 'text-text-muted group-hover:text-rl-red'
                  : 'text-text-tertiary group-hover:text-rl-red'
              )}
            >
              {tag}
            </p>
            <motion.span
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.25, ease: EASE.out }}
              className={cn(
                'text-3xl leading-none flex-shrink-0 -mt-2 transition-colors',
                open ? 'text-rl-red' : 'text-rl-red/70 group-hover:text-rl-red'
              )}
              aria-hidden
            >
              +
            </motion.span>
          </div>
          <h2
            className={cn(
              'font-display text-display-md md:text-display-lg max-w-3xl mb-3',
              isDark ? 'text-text-on-dark' : 'text-text-primary'
            )}
          >
            {heading}
          </h2>
          <p
            className={cn(
              'text-body-md max-w-2xl',
              isDark ? 'text-text-muted' : 'text-text-secondary'
            )}
          >
            {preview}
          </p>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="panel"
              id={`${id}-panel`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: DURATION.normal, ease: EASE.out }}
              className="overflow-hidden"
            >
              <div className="pb-20 md:pb-24">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
