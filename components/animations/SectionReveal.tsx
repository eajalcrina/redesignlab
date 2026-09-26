'use client'

import { useEffect, useRef, useState } from 'react'
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
  // 'static': se deja visible tal cual llegó del servidor; 'animate': entra al hacer scroll.
  const [mode, setMode] = useState<'pending' | 'static' | 'animate'>('pending')
  const box = useRef<HTMLDivElement>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    // Lo que ya está en pantalla al cargar no se oculta para animarlo: eso
    // producía un parpadeo y retrasaba el pintado del contenido principal (LCP).
    const r = box.current?.getBoundingClientRect()
    setMode(r && r.top < window.innerHeight ? 'static' : 'animate')
  }, [])

  // Antes de hidratar, o si ya era visible, se renderiza sin animación
  if (mode !== 'animate') {
    return <div ref={box} className={cn(className)}>{children}</div>
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
