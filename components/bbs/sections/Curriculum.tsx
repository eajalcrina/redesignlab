'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import type { CurriculumMonth } from '@/data/bbs'
import { DURATION, EASE } from '@/lib/animations'

interface CurriculumProps {
  months: CurriculumMonth[]
}

export default function Curriculum({ months }: CurriculumProps) {
  const hasMonths = months.some((m) => m.month)

  // Default: first module open (key "0-0")
  const [openKey, setOpenKey] = useState<string | null>('0-0')

  function toggleKey(key: string) {
    setOpenKey((prev) => (prev === key ? null : key))
  }

  return (
    <section className="bg-rl-white py-14 md:py-20">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">
            {hasMonths ? 'El recorrido' : 'Temario'}
          </Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            {hasMonths ? 'El programa, semana a semana' : 'Temario'}
          </h2>
        </SectionReveal>

        <div className="space-y-10">
          {months.map((month, mi) => (
            <SectionReveal key={mi} delay={mi * 0.05}>
              <div>
                {month.month && (
                  <div className="mb-4 pb-4 border-b border-border-light">
                    <h3 className="font-display text-display-sm text-text-primary">
                      {month.month}
                    </h3>
                    {month.subtitle && (
                      <p className="text-body-md text-text-tertiary italic mt-1">
                        {month.subtitle}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  {month.modules.map((mod, moi) => {
                    const key = `${mi}-${moi}`
                    const isOpen = openKey === key
                    return (
                      <div key={moi} className="border-b border-border-light">
                        <button
                          onClick={() => toggleKey(key)}
                          aria-expanded={isOpen}
                          aria-controls={`curriculum-panel-${key}`}
                          className="w-full py-5 flex items-center justify-between gap-4 text-left"
                        >
                          <div className="flex items-center gap-4">
                            <span className="font-mono text-mono-sm text-rl-red flex-shrink-0 w-20">
                              {mod.code}
                            </span>
                            <span className="font-display text-display-sm text-text-primary">
                              {mod.title}
                            </span>
                          </div>
                          <motion.span
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-rl-red text-xl flex-shrink-0"
                          >
                            +
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              id={`curriculum-panel-${key}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: DURATION.fast, ease: EASE.out }}
                              className="overflow-hidden"
                            >
                              <p className="text-body-md text-text-secondary pb-5 max-w-2xl pl-24">
                                {mod.body}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
