'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'
import { DURATION, EASE } from '@/lib/animations'

interface DividerProps {
  variant?: 'default' | 'red'
  mode?: 'light' | 'dark'
  className?: string
  animated?: boolean
}

export default function Divider({
  variant = 'default',
  mode = 'light',
  className,
  animated = false,
}: DividerProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })

  if (variant === 'red') {
    return (
      <motion.div
        ref={ref}
        className={cn('h-0.5 bg-rl-red', className)}
        initial={animated ? { scaleX: 0, originX: 0 } : undefined}
        animate={animated && inView ? { scaleX: 1 } : undefined}
        transition={{ duration: DURATION.slow, ease: EASE.out }}
      />
    )
  }

  return (
    <div
      className={cn(
        'h-px w-full',
        mode === 'light' ? 'bg-border-light' : 'bg-border-dark',
        className
      )}
    />
  )
}
