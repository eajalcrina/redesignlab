'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import Divider from '@/components/ui/Divider'

export default function StrategySection() {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">V. Estrategia de portafolio</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-8">
            Un portafolio hiper-integrado.
          </h2>
          <Divider variant="red" className="w-16 mb-8" animated />
          <div className="max-w-2xl space-y-6">
            <p className="text-body-lg text-text-secondary">
              La bioeconomía no se construye en silos. Nuestras ventures operan en una matriz en donde los subproductos de una pueden ser el bioinsumo estrella de otra, y la infraestructura tecnológica desarrollada para trazabilidad agrícola sirve también para ingredientes marinos. Diseñamos con un nivel alto de sinergias.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
