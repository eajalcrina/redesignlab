'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

const dimensions = [
  {
    number: '01',
    title: 'Inteligencia interna',
    doWe: 'Procesamos la información del negocio hacia adentro. Revisamos las métricas de operación, identificamos tendencias que el equipo no ha nombrado todavía, detectamos ineficiencias con potencial de mejora y mapeamos las oportunidades de optimización que la operación diaria no deja tiempo para ver.',
    deliver: 'Un análisis de estado interno con recomendaciones priorizadas y un plan de acción para que el equipo implemente.',
    team: 'Ejecuta las mejoras identificadas con la claridad que el análisis externo produce.',
  },
  {
    number: '02',
    title: 'Inteligencia externa',
    doWe: 'Monitoreamos el ecosistema con IA — tendencias de mercado, movimientos de competidores, cambios regulatorios, oportunidades emergentes, señales tempranas de lo que está cambiando en los mercados que le importan a la empresa. Identificamos las oportunidades que vale la pena perseguir y las amenazas que vale la pena anticipar.',
    deliver: 'Un mapa de oportunidades externas con recomendación de cuáles activar, cuándo y cómo — listo para que el equipo comercial o de desarrollo de negocio lo accione.',
    team: 'Ejecuta las oportunidades identificadas con la estrategia de activación diseñada por Redesign Lab.',
  },
  {
    number: '03',
    title: 'Mapeo de financiamiento',
    doWe: 'Monitoreamos el ecosistema de capital — fondos activos, instrumentos disponibles, convocatorias abiertas, requisitos de elegibilidad — y evaluamos qué opciones de financiamiento son relevantes para el momento específico de la empresa.',
    deliver: 'Un mapa actualizado de opciones de financiamiento con evaluación de elegibilidad y recomendación priorizada sobre qué instrumento perseguir y cuándo.',
    team: 'Decide cuándo postular y gestiona el proceso internamente. Si la empresa no tiene capacidad para formular y estructurar la postulación, Redesign Lab puede acompañar el proceso como servicio complementario independiente — Fundraising estratégico.',
  },
  {
    number: '04',
    title: 'Resolución de problemas',
    doWe: 'Identificamos los problemas concretos que están frenando el negocio en ese mes — operativos, comerciales, financieros, de equipo — y los procesamos con criterio externo y con IA para producir un plan de resolución. No el que el equipo ya intentó. El que todavía no se ha intentado porque nadie ha tenido el tiempo o la perspectiva para verlo.',
    deliver: 'Un diagnóstico del problema con sus causas raíz identificadas y un plan de resolución accionable — con pasos concretos, responsables sugeridos y métricas de seguimiento.',
    team: 'Implementa el plan de resolución. Si el problema requiere expertise que no existe internamente — en finanzas, en tecnología, en operaciones, en mercados — Redesign Lab puede conectar al Builder especializado de su red para acompañar la implementación.',
  },
]

export default function RealMonthSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">El mes típico — a partir del mes 4</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-6">
            Cuatro dimensiones simultáneas. Cada mes.
          </h2>
          <p className="text-body-lg text-text-muted max-w-3xl mb-16">
            Una vez completado el período de onboarding, Re. Intelligence opera en un ciclo mensual de cuatro dimensiones. Cada mes no es igual al anterior — el peso relativo de cada dimensión varía según el momento del negocio. Pero las cuatro están siempre presentes.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dimensions.map((d, i) => (
            <SectionReveal key={d.number} delay={i * 0.08}>
              <div
                className="border border-border-dark p-8 rounded cursor-pointer hover:border-rl-red/40 transition-colors h-full"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="font-mono text-mono-sm text-rl-red block mb-2">
                      Dimensión {d.number}
                    </span>
                    <h3 className="font-display text-display-sm text-text-on-dark">{d.title}</h3>
                  </div>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-rl-red text-xl flex-shrink-0 mt-1"
                  >
                    +
                  </motion.span>
                </div>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: DURATION.fast, ease: EASE.out }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-border-dark space-y-5">
                        <div>
                          <p className="text-label-sm uppercase text-rl-red mb-2">Qué hacemos</p>
                          <p className="text-body-sm text-text-muted">{d.doWe}</p>
                        </div>
                        <div>
                          <p className="text-label-sm uppercase text-rl-red mb-2">Qué entregamos</p>
                          <p className="text-body-sm text-text-muted">{d.deliver}</p>
                        </div>
                        <div>
                          <p className="text-label-sm uppercase text-text-on-dark mb-2">Qué hace tu equipo</p>
                          <p className="text-body-sm text-text-muted">{d.team}</p>
                        </div>
                      </div>
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
