'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import { BIOBUILDERS_WHATSAPP_URL } from '@/lib/constants'

export default function BioBusinessWedge() {
  return (
    <section className="section-accent py-12 md:py-14">
      <div className="container-rl">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <h2 className="font-display text-display-sm md:text-display-md-dt max-w-2xl">
              ¿Crees que tu bionegocio necesita un Bio/Builder? Conversemos.
            </h2>
            <a
              href={BIOBUILDERS_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center self-start md:self-auto h-12 px-8 shrink-0 rounded bg-rl-dark text-text-on-dark font-medium text-body-lg hover:bg-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Agenda una reunión &rarr;
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
