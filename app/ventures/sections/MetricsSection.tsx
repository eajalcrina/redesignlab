'use client'

import MetricBlock from '@/components/ui/MetricBlock'
import Tag from '@/components/ui/Tag'
import SectionReveal from '@/components/animations/SectionReveal'
import { ventureMetrics } from '@/data/ventures'

export default function MetricsSection() {
  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">VI. Impacto en números</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-16">
            La medición de nuestro progreso global.
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">
          {ventureMetrics.map((metric, i) => (
            <SectionReveal key={metric.label} delay={i * 0.1}>
              <div className="min-h-[80px]">
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
      </div>
    </section>
  )
}
