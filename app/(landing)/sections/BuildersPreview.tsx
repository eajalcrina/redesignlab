'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'

export default function BuildersPreview() {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <div className="max-w-3xl">
          <SectionReveal>
            <Tag color="red" className="mb-4">Red de Builders</Tag>
            <h2 className="font-display text-display-md md:text-display-lg text-text-primary mb-6">
              Expertos que necesitan que su expertise sirva para algo más grande.
            </h2>
            <p className="text-body-lg text-text-secondary mb-8">
              La Red de Builders de Redesign Lab conecta a expertos de alto perfil — Business Designers, ingenieros de trazabilidad, científicos de datos, especialistas en finanzas de impacto, agrónomos regenerativos, expertos en go-to-market internacional — con proyectos donde su conocimiento produce impacto real. Los Builders colaboran en proyectos, participan en Re. Share — el programa de valor compartido de la red — y acceden, cuando hay alineación, a oportunidades de inversión y co-fundación en el portafolio.
            </p>
            <Button variant="text" href="/builders" className="text-text-primary">
              Conocer la Red de Builders &rarr;
            </Button>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
