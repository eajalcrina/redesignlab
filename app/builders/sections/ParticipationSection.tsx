'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

const tabs = [
  {
    id: 'colaborador',
    label: 'Líder de Práctica (Colaborador)',
    description: 'Eres referente en tu industria, aportas know-how altamente especializado para resolver problemas o estructurar etapas de un venture específico, pero no buscas fundar una empresa desde cero.',
    benefits: [
      'Ingresas a proyectos en diseño, validación comercial o due diligence.',
      'Aportas como parte del talento senior que estructura una venture.',
      'Fee por proyecto estratégico',
      'Participación directa en utilidades mediante revenue share durante la ejecución.'
    ],
    commitment: 'Flexible — por proyecto',
  },
  {
    id: 'socio',
    label: 'Co-Founder (Socio)',
    description: 'Tienes experiencia operativa profunda en cadenas de bioeconomía, identificas una oportunidad con potencial de mercado y estás listo para asumir el riesgo y la recompensa de construir una empresa.',
    benefits: [
      'Diseñas, estructuras y operas una venture del portafolio junto a Redesign Lab.',
      'Redesign aporta soporte, capacidad de estructuración y acceso a capital.',
      'Remuneración vinculada a hitos levantados (milestones).',
      'Equity mayoritario en la empresa construida.'
    ],
    commitment: 'Dedicación parcial inicial, completa post-fondeo',
  },
]

export default function ParticipationSection() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">II. Las dos modalidades de participación</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            El perfil que asumes define la compensación.
          </h2>
        </SectionReveal>

        {/* Tab selector */}
        <div className="flex gap-4 mb-12 flex-wrap">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(i)}
              className={`px-6 py-3 text-body-md font-medium transition-all duration-200 border-b-2 ${
                activeTab === i
                  ? 'text-text-primary border-rl-red'
                  : 'text-text-tertiary border-transparent hover:text-text-secondary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: DURATION.fast, ease: EASE.out }}
            className="max-w-2xl"
          >
            <p className="text-body-lg text-text-secondary mb-6">{tabs[activeTab].description}</p>
            <p className="font-mono text-mono-md text-rl-red mb-6">{tabs[activeTab].commitment}</p>
            <ul className="space-y-3">
              {tabs[activeTab].benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3 text-body-md text-text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
