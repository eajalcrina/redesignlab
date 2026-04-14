'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { DURATION, EASE } from '@/lib/animations'
import Divider from './Divider'

interface ProjectCardProps {
  number: string
  title: string
  industry: string
  geo: string
  tags: string[]
  keyline: string
  mode?: 'dark' | 'neutral'
  // Expanded details (for /proyectos page)
  challenge?: string
  approach?: string
  results?: string[]
  expandable?: boolean
}

export default function ProjectCard({
  number,
  title,
  industry,
  geo,
  tags,
  keyline,
  mode = 'neutral',
  challenge,
  approach,
  results,
  expandable = false,
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isDark = mode === 'dark'

  return (
    <motion.div
      layout
      onClick={expandable ? () => setIsExpanded(!isExpanded) : undefined}
      className={cn(
        'relative overflow-hidden py-8 group',
        expandable && 'cursor-pointer',
        isDark ? 'border-b border-border-dark' : 'border-b border-border-light'
      )}
    >
      {/* Giant background number */}
      <motion.span
        className={cn(
          'absolute -top-4 -right-4 font-display text-[120px] md:text-[180px] leading-none select-none pointer-events-none',
          isDark ? 'text-text-on-dark' : 'text-text-primary'
        )}
        initial={{ opacity: isDark ? 0.03 : 0.04 }}
        whileHover={{ opacity: isDark ? 0.08 : 0.1 }}
        transition={{ duration: 0.3 }}
      >
        {number}
      </motion.span>

      {/* Red left border on hover */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 bg-rl-red"
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.3 }}
        style={{ originY: 0 }}
      />

      {/* Content */}
      <div className="relative z-10 pl-4">
        <motion.div layout="position">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className={cn('text-body-sm', isDark ? 'text-text-muted' : 'text-text-secondary')}>
              {industry}
            </span>
            <span className={cn('text-body-xs', isDark ? 'text-text-muted/50' : 'text-text-tertiary')}>
              ·
            </span>
            <span className={cn('text-body-sm', isDark ? 'text-text-muted' : 'text-text-secondary')}>
              {geo}
            </span>
          </div>

          <h3 className={cn(
            'font-display text-display-sm mb-3',
            isDark ? 'text-text-on-dark' : 'text-text-primary'
          )}>
            {title}
          </h3>

          <p className={cn(
            'text-body-md font-medium mb-3',
            isDark ? 'text-rl-red' : 'text-rl-red'
          )}>
            {keyline}
          </p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  'text-label-sm uppercase',
                  isDark ? 'text-text-muted/60' : 'text-text-tertiary'
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Expanded content */}
        <AnimatePresence>
          {expandable && isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: DURATION.fast, ease: EASE.out }}
              className="overflow-hidden"
            >
              <Divider variant="red" className="w-12 my-6" />

              {challenge && (
                <div className="mb-6">
                  <h4 className={cn('text-label-sm uppercase mb-2', isDark ? 'text-text-muted' : 'text-text-tertiary')}>
                    La oportunidad
                  </h4>
                  <p className={cn('text-body-sm', isDark ? 'text-text-muted' : 'text-text-secondary')}>
                    {challenge}
                  </p>
                </div>
              )}

              {approach && (
                <div className="mb-6">
                  <h4 className={cn('text-label-sm uppercase mb-2', isDark ? 'text-text-muted' : 'text-text-tertiary')}>
                    La solución
                  </h4>
                  <p className={cn('text-body-sm', isDark ? 'text-text-muted' : 'text-text-secondary')}>
                    {approach}
                  </p>
                </div>
              )}

              {results && results.length > 0 && (
                <div>
                  <h4 className={cn('text-label-sm uppercase mb-2', isDark ? 'text-text-muted' : 'text-text-tertiary')}>
                    El impacto
                  </h4>
                  <ul className="space-y-2">
                    {results.map((r) => (
                      <li key={r} className={cn('flex items-start gap-2 text-body-sm', isDark ? 'text-text-muted' : 'text-text-secondary')}>
                        <span className="w-1 h-1 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {expandable && (
          <motion.div layout="position" className="mt-4">
            <motion.span
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className={cn('text-body-sm inline-block', isDark ? 'text-text-muted' : 'text-text-tertiary')}
            >
              +
            </motion.span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
