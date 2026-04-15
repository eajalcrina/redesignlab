'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'
import { DURATION, EASE } from '@/lib/animations'

interface MetricBlockProps {
  prefix?: string
  value: number
  suffix?: string
  label: string
  size?: 'hero' | 'standard'
}

function useCountUp(target: number, isActive: boolean, duration: number = 2) {
  const [count, setCount] = useState(0)
  const frameRef = useRef<number>()

  useEffect(() => {
    if (!isActive) return

    const startTime = Date.now()
    const durationMs = duration * 1000

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / durationMs, 1)
      // ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [target, isActive, duration])

  return count
}

export default function MetricBlock({
  prefix,
  value,
  suffix,
  label,
  size = 'standard',
}: MetricBlockProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  const count = useCountUp(value, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: DURATION.verySlow, ease: EASE.out }}
    >
      <p className={cn(
        'font-display',
        size === 'hero' ? 'text-display-2xl lg:text-[120px] lg:leading-[0.95]' : 'text-display-lg'
      )}>
        {prefix && <span className="text-text-muted">{prefix}</span>}
        <span>{count.toLocaleString('es-PE')}</span>
        {suffix && <span className="text-text-muted">{suffix}</span>}
      </p>
      <p className={cn(
        'mt-2',
        size === 'hero' ? 'text-body-sm text-text-muted' : 'text-body-xs text-text-muted'
      )}>
        {label}
      </p>
    </motion.div>
  )
}
