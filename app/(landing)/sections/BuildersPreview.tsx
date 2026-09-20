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
            <Tag color="red" className="mb-4">Bio/Builders</Tag>
            <h2 className="font-display text-display-md md:text-display-lg text-text-primary mb-6">
              La bioeconomía de América Latina tiene todo, menos quien la escale.
            </h2>
            <p className="text-body-lg text-text-secondary mb-8">
              Bio/Builders es la red que conecta a expertos en escalar empresas con bionegocios que necesitan activar su potencial para competir en el mercado. Quienes se suman lideran como co-founders el crecimiento comercial, financiero y operativo de bionegocios en territorio.
            </p>
            <Button variant="text" href="/biobuilders" className="text-text-primary">
              Conocer Bio/Builders &rarr;
            </Button>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
