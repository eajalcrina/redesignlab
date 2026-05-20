'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

export interface ProgramTabsProps {
  forWhom?: { title: string; body: string }[]
  notFor?: string
  outcomes?: { lead: string; body: string }[]
  includes?: string[]
}

type TabId = 'para-quien' | 'lograras' | 'incluye'

interface Tab {
  id: TabId
  label: string
}

export default function ProgramTabs({
  forWhom,
  notFor,
  outcomes,
  includes,
}: ProgramTabsProps) {
  const tabs: Tab[] = []
  if (forWhom?.length) tabs.push({ id: 'para-quien', label: 'Para quién es' })
  if (outcomes?.length) tabs.push({ id: 'lograras', label: 'Qué lograrás' })
  if (includes?.length) tabs.push({ id: 'incluye', label: 'Qué incluye' })

  const [activeTab, setActiveTab] = useState<TabId>(tabs[0]?.id ?? 'para-quien')

  if (tabs.length === 0) return null

  return (
    <section className="section-neutral py-14 md:py-20">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">
            El programa
          </Tag>
        </SectionReveal>

        {/* Tablist */}
        <SectionReveal delay={0.05}>
          <div
            role="tablist"
            aria-label="Secciones del programa"
            className="flex flex-wrap gap-x-8 gap-y-2 border-b border-border-light mb-10"
          >
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    'pb-4 font-display text-display-sm transition-colors relative',
                    isActive
                      ? 'text-text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-rl-red'
                      : 'text-text-tertiary hover:text-text-primary',
                  ].join(' ')}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </SectionReveal>

        {/* Panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: DURATION.instant, ease: EASE.out }}
          >
            {/* Para quién es */}
            {activeTab === 'para-quien' && forWhom && (
              <div>
                <div className="grid md:grid-cols-2 gap-8">
                  {forWhom.map((item, i) => (
                    <div key={i} className="border border-border-light rounded p-8">
                      <h3 className="font-display text-display-sm text-text-primary mb-2">
                        {item.title}
                      </h3>
                      <p className="text-body-md text-text-secondary">{item.body}</p>
                    </div>
                  ))}
                </div>
                {notFor && (
                  <p className="text-body-sm text-text-tertiary mt-10">
                    Este programa no es para: {notFor}
                  </p>
                )}
              </div>
            )}

            {/* Qué lograrás */}
            {activeTab === 'lograras' && outcomes && (
              <div className="max-w-4xl space-y-10">
                {outcomes.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-rl-red font-display text-display-sm flex-shrink-0 mt-1">
                      →
                    </span>
                    <div>
                      <p className="font-display text-display-sm text-text-primary mb-2">
                        {item.lead}
                      </p>
                      <p className="text-body-md text-text-secondary">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Qué incluye */}
            {activeTab === 'incluye' && includes && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                {includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-rl-red flex-shrink-0 mt-0.5">✦</span>
                    <span className="text-body-md text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
