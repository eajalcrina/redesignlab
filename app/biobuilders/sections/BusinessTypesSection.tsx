'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'
import { BIOBUILDERS_BOOKING_URL } from '@/lib/constants'

const types = [
  'Alimentos y superalimentos',
  'Principios activos y extractos naturales',
  'Fibras naturales y biomateriales',
  'Nutracéuticos',
  'Cosmética natural',
  'Turismo regenerativo',
  'Agroindustria y bioprocesos',
  'Pesca y acuicultura sostenible',
  'Economía circular aplicada',
  'Tecnología y fintech para cadenas de valor bio',
]

export default function BusinessTypesSection() {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <div className="max-w-3xl">
          <SectionReveal>
            <h2 className="font-display text-display-md md:text-display-lg text-text-primary mb-6">
              ¿Cómo son los negocios con los que trabajamos?
            </h2>
            <p className="text-body-lg text-text-secondary mb-8">
              Trabajamos con bionegocios que sabemos que pueden transformarse radicalmente con ciencia y tecnología: procesos de extracción, formulación, biotecnología aplicada. Entender esa ciencia y tecnología, desde una mirada de negocio y no como quien la desarrolla, también es parte del rol del Bio/Builder.
            </p>
            <ul className="flex flex-wrap gap-3 mb-8">
              {types.map((t) => (
                <li
                  key={t}
                  className="px-4 py-2 rounded-full border border-border-light bg-white text-body-md text-text-primary"
                >
                  {t}
                </li>
              ))}
            </ul>
            <p className="text-body-lg text-text-secondary mb-10">
              Nuestro foco principal son los bionegocios. Pero si tienes un negocio de impacto que no encaja exactamente en esta lista y crees que puede beneficiarse de este modelo, igual queremos conocerlo.
            </p>
          </SectionReveal>

          <SectionReveal>
            <div className="bg-white border border-border-light border-l-4 border-l-rl-red rounded p-6 md:p-8">
              <p className="font-display text-display-sm text-text-primary mb-4">
                ¿Tu negocio no encaja exactamente en esta lista?
              </p>
              <Button variant="text" href={BIOBUILDERS_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-rl-red font-medium">
                Cuéntanos sobre tu negocio
              </Button>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
