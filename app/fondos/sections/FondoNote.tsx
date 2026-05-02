'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Divider from '@/components/ui/Divider'

export default function FondoNote() {
  return (
    <section className="section-neutral py-12 md:py-16">
      <div className="container-rl">
        <Divider className="mb-8" />
        <SectionReveal>
          <div className="max-w-2xl">
            <p className="text-body-sm text-text-tertiary mb-2">Nota</p>
            <p className="text-body-md text-text-secondary mb-4">
              Redesign Lab no solo apoya a fondos externos. Opera su propio fondo privado de inversión de impacto desde 2022. Ese fondo invierte directamente en las empresas del portafolio de Redesign Lab con el mismo criterio de diagnóstico técnico que aplicamos para nuestros clientes. Esa experiencia como gestores de capital de impacto (no solo como asesores) es lo que hace que el trabajo de Redesign Lab con fondos externos sea distinto. Sabemos lo que es tomar la decisión de inversión, no solo informarla.
            </p>
            <a
              href="https://fondodeimpacto.pe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body-md text-rl-red hover:underline"
            >
              fondodeimpacto.pe &rarr;
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
