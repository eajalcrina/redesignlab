'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import CalendarButton from '@/components/ui/CalendarButton'

export default function CtaSection() {
  return (
    <section className="section-dark" data-no-announce>
      <div className="container-rl py-24 md:py-32">
        <SectionReveal>
          <div className="grid grid-cols-1 items-end gap-8 border-t border-border-dark pt-10 md:pt-12 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-8">
              <h2 className="font-sans text-[32px] font-normal leading-[1.04] tracking-[-0.035em] text-text-on-dark md:text-[46px]">
                ¿Quieres que diseñemos algo específico para tu industria?
              </h2>
              <p className="mt-5 max-w-[560px] text-[17px] leading-[1.65] text-text-muted">
                Creamos recursos a medida para organizaciones que están liderando la transformación en bioeconomía.
              </p>
            </div>
            <div className="lg:col-span-3 lg:col-start-10 lg:justify-self-end">
              <CalendarButton location="conocimiento_cta">Conversar</CalendarButton>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
