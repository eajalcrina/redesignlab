'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import MetricBlock from '@/components/ui/MetricBlock'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'
import { ventureMetrics } from '@/data/ventures'

export default function VenturesPreview() {
  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">CO-CONSTRUIMOS EMPRESAS. TENEMOS PIEL EN EL JUEGO DESDE EL PRIMER DÍA.</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-6">
            El portafolio de ventures.
          </h2>
          <p className="text-body-lg text-text-muted max-w-3xl mb-16">
            Redesign Lab no solo asesora. Co-funda. El portafolio activo incluye empresas en agricultura regenerativa, biomateriales, biotecnología, cosmética natural, suplementos, consumo saludable e innovación climática.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6 mb-12">
          {ventureMetrics.map((metric, i) => (
            <SectionReveal key={metric.label} delay={i * 0.08}>
              <div className="min-h-[100px]">
              <MetricBlock
                prefix={metric.prefix}
                value={metric.value}
                suffix={metric.suffix}
                label={metric.label}
                size="standard"
              />
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.4}>
          <Button variant="text" href="/ventures" className="text-text-on-dark">
            Conocer el portafolio &rarr;
          </Button>
        </SectionReveal>
      </div>
    </section>
  )
}
