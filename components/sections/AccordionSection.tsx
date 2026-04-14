'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionSectionProps {
  tag?: string
  title: string
  items: AccordionItem[]
  defaultOpen?: number
}

export default function AccordionSection({
  tag = 'Para quién es',
  title,
  items,
  defaultOpen = 0,
}: AccordionSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen)

  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">
            {tag}
          </Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            {title}
          </h2>
        </SectionReveal>

        <div className="max-w-3xl">
          {items.map((item, i) => (
            <SectionReveal key={i} delay={i * 0.05}>
              <div className="border-b border-border-light">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full py-6 flex items-start justify-between gap-4 text-left"
                >
                  <span className="font-display text-display-sm text-text-primary">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-rl-red text-xl flex-shrink-0 mt-1"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: DURATION.fast, ease: EASE.out }}
                      className="overflow-hidden"
                    >
                      <p className="text-body-md text-text-secondary pb-6 max-w-xl">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
