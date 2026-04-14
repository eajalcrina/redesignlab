'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp, fadeIn, staggerContainer } from './variants'
import { cn } from '@/lib/utils'

interface SectionRevealProps {
  children: React.ReactNode
  variant?: 'fadeUp' | 'fadeIn' | 'stagger'
  delay?: number
  className?: string
}

const variantMap = {
  fadeUp,
  fadeIn,
  stagger: staggerContainer(),
}

export default function SectionReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  className,
}: SectionRevealProps) {
  const [mounted, setMounted] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Before JS hydrates, render content visible (no animation)
  if (!mounted) {
    return <div className={cn(className)}>{children}</div>
  }

  const variants = variantMap[variant]

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
