'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

const risks = [
  {
    title: 'Para emprendedores con visión',
    detail: 'Sus ideas de impacto mueren en la etapa inicial. No por falta de capital únicamente — sino por falta de un socio estratégico que sepa construir, que conozca los mercados internacionales desde adentro, que haya estado en el campo y en la mesa de negociación al mismo tiempo.',
  },
  {
    title: 'Para inversores con propósito',
    detail: 'Su capital busca rentabilidad y retorno social verificable, pero las oportunidades no están listas para la inversión o son difíciles de validar con los criterios que los mercados de capital exigen. El ecosistema produce ideas. Produce muy pocas empresas.',
  },
  {
    title: 'Para corporativos y mercados',
    detail: 'La rentabilidad se disocia del propósito, perdiendo la oportunidad de construir marcas significativas y sostenibles que lideren el próximo ciclo. Los activos que podrían ser empresas independientes de alto valor permanecen atrapados en modelos que no los dejan expresar su potencial real.',
  },
]

export default function RiskSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">I. El riesgo de las oportunidades perdidas</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-4xl mb-6">
            Lo que hemos visto de primera mano durante cinco años.
          </h2>
          <p className="text-body-lg text-text-secondary max-w-3xl mb-12">
            Las mejores oportunidades del ecosistema de bioeconomía en América Latina no se pierden por falta de potencial. Se pierden por falta del socio correcto en el momento correcto — o porque el capital llega antes de que la empresa esté lista para recibirlo. Lo hemos visto en tres frentes simultáneos:
          </p>
        </SectionReveal>

        <div className="max-w-3xl">
          {risks.map((risk, i) => (
            <SectionReveal key={i} delay={i * 0.05}>
              <div className="border-b border-border-light">
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full py-6 flex items-start justify-between gap-4 text-left">
                  <span className="font-display text-display-sm text-text-primary">{risk.title}</span>
                  <motion.span animate={{ rotate: openIndex === i ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-rl-red text-xl flex-shrink-0 mt-1">+</motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: DURATION.fast, ease: EASE.out }} className="overflow-hidden">
                      <p className="text-body-md text-text-secondary pb-6 max-w-xl">{risk.detail}</p>
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
