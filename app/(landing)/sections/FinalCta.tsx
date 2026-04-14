'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'
import Tag from '@/components/ui/Tag'
import { SITE_CONFIG } from '@/lib/constants'

export default function FinalCta() {
  return (
    <section className="bg-[#080808] min-h-[80vh] flex items-center">
      <div className="container-rl text-center">
        <SectionReveal>
          <Tag color="red" className="mb-8">EMPIEZA LA CONVERSACIÓN</Tag>
          <h2 className="font-display text-display-lg md:text-display-xl lg:text-[96px] lg:leading-[0.95] lg:font-normal text-text-on-dark max-w-4xl mx-auto">
            Si algo de lo que
          </h2>
          <h2 className="font-display text-display-lg md:text-display-xl lg:text-[96px] lg:leading-[0.95] lg:font-normal text-text-on-dark max-w-4xl mx-auto mb-2">
            vio aquí resuena.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <h2 className="font-display text-display-lg md:text-display-xl lg:text-[96px] lg:leading-[0.95] lg:font-normal text-rl-red max-w-4xl mx-auto mb-8">
            Hablemos.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.5}>
          <Divider variant="red" className="w-16 mx-auto mb-8" animated />
          <p className="text-body-xl text-text-muted max-w-xl mx-auto mb-12">
            Trabajamos con quienes tienen un dolor real en su negocio, el activo y el momento correcto para que el trabajo produzca algo que valga la pena haber hecho.
          </p>
          <Button variant="primary" size="lg" href={`mailto:${SITE_CONFIG.email}`}>
            Escribir al equipo &rarr;
          </Button>
          <p className="text-body-sm text-text-muted mt-4">
            {SITE_CONFIG.email}
          </p>
        </SectionReveal>
      </div>
    </section>
  )
}
