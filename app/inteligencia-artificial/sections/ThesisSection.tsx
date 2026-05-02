'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import Divider from '@/components/ui/Divider'

export default function ThesisSection() {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <SectionReveal>
            <div>
              <Tag color="red" className="mb-4">La tesis</Tag>
              <h2 className="font-display text-display-md md:text-display-lg text-text-primary mb-6">
                La IA sin conocimiento de dominio es ruido.
              </h2>
              <Divider variant="red" className="w-16 mb-6" animated />
              <p className="text-body-lg text-text-secondary">
                El 90% de los proyectos de IA en industrias tradicionales fracasan porque tratan la IA como un fin, no como un medio. En bioeconomía, el valor no está en el modelo. Está en los datos de campo que lo alimentan.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="space-y-6">
              <p className="text-body-md text-text-secondary">
                Redesign Lab combina dos cosas que el mercado no ofrece juntas: conocimiento profundo de las industrias de bioeconomía y capacidad real de implementación de IA.
              </p>
              <p className="text-body-md text-text-secondary">
                No vendemos IA. La usamos como infraestructura para amplificar el impacto de cada consultoría, cada venture, cada decisión de inversión.
              </p>
              <p className="text-body-md text-text-primary font-medium">
                La IA es el multiplicador. El conocimiento de campo es el multiplicando.
              </p>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
