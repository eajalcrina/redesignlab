'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

const originalText = 'La inteligencia artificial no reemplaza al experto.'
const deleteTarget = 'no reemplaza al experto.'
const correctionTarget = 'amplifica al experto.'
const keepPart = originalText.slice(0, originalText.length - deleteTarget.length)

export default function HeroSection() {
  const [phase, setPhase] = useState<'typing' | 'pause' | 'deleting' | 'retyping' | 'done' | 'waiting'>('typing')
  const [displayed, setDisplayed] = useState('')
  const [corrected, setCorrected] = useState('')

  const reset = useCallback(() => {
    setDisplayed('')
    setCorrected('')
    setPhase('typing')
  }, [])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    switch (phase) {
      case 'typing':
        if (displayed.length < originalText.length) {
          timeout = setTimeout(() => {
            setDisplayed(originalText.slice(0, displayed.length + 1))
          }, 35)
        } else {
          timeout = setTimeout(() => setPhase('pause'), 800)
        }
        break

      case 'pause':
        timeout = setTimeout(() => setPhase('deleting'), 400)
        break

      case 'deleting':
        if (displayed.length > keepPart.length) {
          timeout = setTimeout(() => {
            setDisplayed(displayed.slice(0, -1))
          }, 25)
        } else {
          timeout = setTimeout(() => setPhase('retyping'), 200)
        }
        break

      case 'retyping':
        if (corrected.length < correctionTarget.length) {
          timeout = setTimeout(() => {
            setCorrected(correctionTarget.slice(0, corrected.length + 1))
          }, 40)
        } else {
          setPhase('done')
        }
        break

      case 'done':
        // Wait 4 seconds then restart
        timeout = setTimeout(() => setPhase('waiting'), 4000)
        break

      case 'waiting':
        timeout = setTimeout(() => reset(), 500)
        break
    }

    return () => clearTimeout(timeout)
  }, [phase, displayed, corrected, reset])

  return (
    <section className="section-dark min-h-[80vh] flex items-center">
      <div className="container-rl py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.normal, ease: EASE.out }}
        >
          <Tag color="neutral" className="mb-8">Inteligencia artificial</Tag>
        </motion.div>

        <h1 className="font-display text-display-lg md:text-display-xl lg:text-[80px] lg:leading-[0.97] lg:font-normal text-text-on-dark max-w-5xl">
          {/* SEO/a11y fallback — texto final completo para crawlers y lectores de pantalla */}
          <span className="sr-only">
            La inteligencia artificial amplifica al experto.
          </span>
          {/* Versión animada visible */}
          <span aria-hidden="true">
            {displayed}
            {(phase === 'retyping' || phase === 'done' || phase === 'waiting') && corrected.length > 0 && (
              <span className="text-rl-red">{corrected}</span>
            )}
            {phase !== 'done' && phase !== 'waiting' && (
              <motion.span
                className="inline-block w-[3px] h-[0.75em] bg-rl-red ml-1 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
              />
            )}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'done' || phase === 'waiting' ? 1 : 0 }}
          transition={{ duration: DURATION.slow, delay: 0.3 }}
          className="mt-8 text-body-xl text-text-muted max-w-2xl"
        >
          Nuestra tesis: la IA es infraestructura, no producto. Es la capa que permite escalar el conocimiento de campo hacia decisiones que antes tomaban meses.
        </motion.p>
      </div>
    </section>
  )
}
