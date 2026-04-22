'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Divider from '@/components/ui/Divider'

export default function WhyFifteenSection() {
  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <div className="max-w-3xl mx-auto text-center">
          <SectionReveal>
            <h2 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-text-on-dark mb-8">
              ¿Por qué 15 y no más?
            </h2>
            <Divider variant="red" className="w-16 mx-auto mb-8" animated />
            <p className="text-body-xl text-text-on-dark mb-6">
              La respuesta corta: porque con 16 miembros, Re. Intelligence deja de ser lo que es.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="space-y-6 text-body-lg text-text-muted text-left">
              <p>
                El valor de Re. Intelligence no está en el contenido — está en el criterio aplicado al contexto específico de cada empresa. Eso requiere que Eddie Ajalcriña y Lorenzo Ortiz tengan espacio mental real para pensar en cada miembro — para recordar en qué escenario está cada empresa, qué decisión está tomando esta semana y qué información del ecosistema cambia esa ecuación.
              </p>
              <p>
                Con 15 empresas, eso es posible. Con 20, empieza a degradarse. Con 50, se convierte en otro producto — uno que ya existe y que no es Re. Intelligence.
              </p>
              <p>
                El límite de 15 protege al miembro tanto como a Redesign Lab. Garantiza que cuando el fundador o gerente general llega a su sesión mensual, la persona al otro lado ha estado pensando en su negocio específico — no preparando una reunión genérica.
              </p>
              <p className="text-text-on-dark font-medium">
                Cuando los 15 cupos están completos, hay lista de espera. No hay excepciones.
              </p>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
