'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'
import { SITE_CONFIG, whatsappUrl } from '@/lib/constants'

export default function CtaSection() {
  return (
    <section className="bg-[#080808] py-24 md:py-32">
      <div className="container-rl text-center">
        <SectionReveal>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mx-auto mb-6">
            Si ya sabes qué estás construyendo, piensa con nosotros en cómo construirlo mejor.
          </h2>
          <p className="text-body-lg text-text-muted max-w-xl mx-auto mb-12">
            30 minutos de conversación de fit. Sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 sm:gap-8">
            <Button variant="primary" size="lg" href={SITE_CONFIG.calendarUrlFit}>
              Agendar conversación de fit &rarr;
            </Button>
            <a
              href={whatsappUrl('Hola, quiero conversar sobre ACELERA.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-body-md text-text-on-dark hover:text-rl-red transition-colors group"
            >
              <span className="underline underline-offset-4 decoration-text-muted/40 group-hover:decoration-rl-red">
                Escríbenos por WhatsApp
              </span>
              <span className="text-rl-red transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
