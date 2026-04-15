'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { DURATION, EASE } from '@/lib/animations'
import { SITE_CONFIG } from '@/lib/constants'
import Button from './Button'

interface ServiceCardProps {
  name: string
  duration: string
  price: string
  description: string
  includes?: string[]
  isSignature?: boolean
}

export default function ServiceCard({
  name,
  duration,
  price,
  description,
  includes,
  isSignature = false,
}: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn(
        'group cursor-pointer border-b border-border-light py-8 transition-colors',
        isSignature && 'bg-rl-dark text-text-on-dark p-8 border-border-dark rounded'
      )}
    >
      <motion.div layout="position">
        {/* Name */}
        <h3
          className={cn(
            'font-display mb-3',
            isSignature ? 'text-display-md text-text-on-dark' : 'text-display-sm text-text-primary'
          )}
        >
          {name}
        </h3>

        {/* Duration + Price */}
        <p className="font-mono text-mono-md text-rl-red mb-3">
          {price ? `${duration} · ${price}` : duration}
        </p>

        {/* Description */}
        <p
          className={cn(
            'text-body-sm max-w-xl whitespace-pre-line',
            isSignature ? 'text-text-muted' : 'text-text-secondary'
          )}
        >
          {description}
        </p>
      </motion.div>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && includes && includes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: DURATION.fast, ease: EASE.out }}
            className="overflow-hidden"
          >
            <div className="pt-6">
              <p
                className={cn(
                  'text-label-sm uppercase mb-4',
                  isSignature ? 'text-text-muted' : 'text-text-tertiary'
                )}
              >
                Incluye
              </p>
              <ul className="space-y-2 mb-6">
                {includes.map((item) => (
                  <li
                    key={item}
                    className={cn(
                      'flex items-start gap-3 text-body-sm',
                      isSignature ? 'text-text-muted' : 'text-text-secondary'
                    )}
                  >
                    <span className="w-1 h-1 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                variant={isSignature ? 'primary' : 'text'}
                size="sm"
                href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(name)}`}
              >
                Solicitar
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand indicator */}
      {includes && includes.length > 0 && (
        <motion.div layout="position" className="mt-4 flex items-center gap-2">
          <motion.span
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'text-body-sm',
              isSignature ? 'text-text-muted' : 'text-text-tertiary'
            )}
          >
            +
          </motion.span>
          <span
            className={cn(
              'text-body-xs',
              isSignature ? 'text-text-muted' : 'text-text-tertiary'
            )}
          >
            {isExpanded ? 'Cerrar' : 'Ver entregables'}
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}
